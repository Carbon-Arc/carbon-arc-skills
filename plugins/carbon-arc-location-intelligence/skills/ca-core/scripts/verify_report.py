#!/usr/bin/env python3
"""Language gate for a Carbon Arc client deliverable.

Checks the RENDERED text, not the markup, so it cannot be fooled by entities
(&mdash;) or by a word sitting inside an attribute.

Usage: verify_report.py <report.html> [--quiet]
       verify_report.py <report.html> --budgets [--allow N]   paragraphs over the writing budget
       verify_report.py --authoring <skills_dir>     lint this package's OWN markdown
Exit 1 if anything is found.
"""
import sys, re, pathlib, html as htmllib

# 1. punctuation the reader has to parse rather than read
DASHES = {"—": "em dash", "&mdash;": "em dash entity", "–": "en dash", "&ndash;": "en dash entity"}

# 2. US business English, never British
BRITISH = {
    "normalise": "normalize", "normalised": "normalized", "normalising": "normalizing",
    "analyse": "analyze", "analysed": "analyzed", "analysing": "analyzing",
    "behaviour": "behavior", "labour": "labor", "favour": "favor", "colour": "color",
    "centre": "center", "programme": "program", "catalogue": "catalog",
    "organisation": "organization", "organised": "organized", "optimise": "optimize",
    "optimised": "optimized", "recognise": "recognize", "utilise": "use",
    "dearer": "more expensive", "whilst": "while", "amongst": "among",
    "towards": "toward", "learnt": "learned", "spelt": "spelled",
}

# 3. words the reader should not have to look up
JARGON = {
    "catchment": "trade area", "nPMI": "shared-customer strength", "PMI": "shared-customer strength",
    "thickness": "sample size", "noise proxy": "how much it swings week to week",
    "insight id": "(internal)", "carc_id": "(internal)", "framework": "(internal)",
    "own-merchant": "(internal)", "retailer-mediated": "(internal)", "archetype": "(internal)", "demand route": "(internal)",
    "tearsheet": "(internal)", "location_resolution": "(internal)", "date_resolution": "(internal)",
    "event register": "what could have explained it", "predicted observable": "if true, we would see",
    "pull manifest": "(internal)", "observability bridge": "what the panel can and cannot see",
    "break ladder": "checks on the data", "walk-forward": "each quarter estimated from the quarters before it",
    "same-basis": "on the same basis", "non-negotiable": "(internal)", "first-class result": "(internal)",
}
# matched as a pattern
JARGON_RE = {r"\bTier [123]\b": "say what the evidence shows, not the tier label"}
# matched case-SENSITIVELY, because the lower-case word is ordinary English
JARGON_CS = {"DiD": "compared against a control group", "PMI": "shared-customer strength"}

def authoring_scan(root):
    """British spellings in the package's own markdown.

    Only the BRITISH list applies here. Em dashes and internal vocabulary are correct in a
    skill file and wrong only in a deliverable, so the other two checks stay off.

    Why this exists: instruction prose primes the writing. Every "catalogue" sitting in a
    skill file is a "catalogue" waiting to appear in a client report, where the real gate
    catches it late - after the build, when it reads as a typo rather than as inheritance.
    A word wrapped in asterisks is exempt, because that is how the ban list itself names them.
    """
    hits = []
    for path in sorted(pathlib.Path(root).glob("*/**/*.md")):
        for n, line in enumerate(path.read_text(encoding="utf-8").split("\n"), 1):
            for bad, good in BRITISH.items():
                for m in re.finditer(r"\b" + bad + r"\b", line, re.I):
                    s, e = m.start(), m.end()
                    if line[s-1:s] == "*" and line[e:e+1] == "*":
                        continue                      # *normalised* in the ban list
                    hits.append(f'{path}:{n}  "{m.group(0)}" -> "{good}"')
    for h in hits:
        print("BRITISH      " + h)
    print(f"\n{len(hits)} British spelling(s) in the package's own markdown")
    return 1 if hits else 0


def rendered_text(doc):
    doc = re.sub(r"(?is)<(script|style)\b.*?</\1>", " ", doc)
    doc = re.sub(r"(?s)<!--.*?-->", " ", doc)
    doc = re.sub(r"(?s)<[^>]+>", " ", doc)
    return re.sub(r"\s+", " ", htmllib.unescape(doc))

def main(path, quiet=False):
    raw = open(path, encoding="utf-8").read()
    text = rendered_text(raw)
    hits = []

    for m in re.finditer(r"\u2014", text):                       # em dash: never
        hits.append(("PUNCTUATION", f'em dash  ...{text[max(0,m.start()-45):m.end()+45].strip()}...'))
    # A Carbon Arc catalog name such as "Credit Card \u2013 US Complete Panel" carries a spaced en dash, and
    # verify_build.py requires that exact name on every source chip. Exempt the dash that follows a
    # dataset prefix from datasets.txt, so the two gates stop contradicting each other (Oct 2026).
    dtext = text
    dsf = pathlib.Path(__file__).with_name("datasets.txt")
    if dsf.exists():
        for name in (l.strip() for l in dsf.read_text().splitlines()):
            if name and not name.startswith("#"):
                dtext = re.sub(re.escape(name) + r"\s\u2013\s", name + " - ", dtext, flags=re.I)
    for m in re.finditer(r"\s\u2013\s", dtext):                   # en dash: only when SPACED, i.e. used as a dash
        hits.append(("PUNCTUATION", f'en dash used as punctuation  ...{dtext[max(0,m.start()-45):m.end()+45].strip()}...'))

    for bad, good in BRITISH.items():
        for m in re.finditer(r"\b" + bad + r"\b", text, re.I):
            hits.append(("BRITISH", f'"{m.group(0)}" -> "{good}"  ...{text[max(0,m.start()-45):m.end()+45].strip()}...'))

    # Cohort charts must state their basis. The debias is mandatory (setup-brand.md, cohort gate), and the one
    # failure mode that reaches a client is publishing a raw cohort share with no basis stated.
    COHORT = r"\b(Gen-?Z|Gen-?X|Millennial|Boomer|generation)\b"
    BASIS  = r"(adjusted for|spends nationally|national panel|panel age skew|normalis|normaliz)"
    if re.search(COHORT, text, re.I) and not re.search(BASIS, text, re.I):
        hits.append(("COHORT-BASIS",
            "cohort figures appear but no adjustment basis is stated anywhere in the report. "
            "Raw cohort shares from US Complete are panel composition, not customer mix "
            "(see references/instruments/card-cohorts.md)."))

    for bad, good in JARGON.items():
        for m in re.finditer(r"\b" + re.escape(bad) + r"\b", text, re.I):
            hits.append(("JARGON", f'"{m.group(0)}" -> {good}  ...{text[max(0,m.start()-45):m.end()+45].strip()}...'))
    for bad, good in JARGON_CS.items():
        for m in re.finditer(r"\b" + re.escape(bad) + r"\b", text):
            hits.append(("JARGON", f'"{m.group(0)}" -> {good}  ...{text[max(0,m.start()-45):m.end()+45].strip()}...'))
    for pat, good in JARGON_RE.items():
        for m in re.finditer(pat, text):
            hits.append(("JARGON", f'"{m.group(0)}" -> {good}  ...{text[max(0,m.start()-45):m.end()+45].strip()}...'))

    by = {}
    for k, v in hits: by.setdefault(k, []).append(v)
    for k in ("COHORT-BASIS", "PUNCTUATION", "BRITISH", "JARGON"):
        for v in by.get(k, []):
            print(f"{k:12} {v}")
    print(f"\n{len(hits)} issue(s) in rendered text")
    return 1 if hits else 0

def budgets(path, allow=2):
    """Every <p> over the writing budget (ca-core section 5): more than 3 sentences or 50 words.

    Counts per paragraph, because a mean inside budget routinely hides paragraphs at double it. A bold
    run-in label ("<b>Label.</b> Text") counts as a sentence, on purpose. Exit 1 when more than `allow`
    paragraphs are over budget (the two permitted exceptions: a structured list and the single most
    important methodological point).
    """
    raw = open(path, encoding="utf-8").read()
    raw = re.sub(r"(?is)<(script|style)\b.*?</\1>", " ", raw)
    over, total = [], 0
    for m in re.finditer(r"(?is)<p\b[^>]*>(.*?)</p>", raw):
        text = re.sub(r"\s+", " ", htmllib.unescape(re.sub(r"(?s)<[^>]+>", " ", m.group(1)))).strip()
        if not text:
            continue
        total += 1
        words = len(text.split())
        sentences = len([x for x in re.split(r"(?<=[.!?])\s+", text) if x.strip()])
        if words > 50 or sentences > 3:
            over.append((words, sentences, text))
    for w, s, t in sorted(over, reverse=True):
        print(f"OVER BUDGET  {w:3d} words, {s} sentences  {t[:110]}...")
    print(f"\n{len(over)} of {total} paragraph(s) over budget (allowed: {allow})")
    return 1 if len(over) > allow else 0

if __name__ == "__main__":
    if "--budgets" in sys.argv:
        args = [a for a in sys.argv[1:] if not a.startswith("--")]
        allow = int(sys.argv[sys.argv.index("--allow") + 1]) if "--allow" in sys.argv else 2
        if "--allow" in sys.argv:
            args = [a for a in args if a != str(allow)]
        sys.exit(budgets(args[0], allow))
    if "--authoring" in sys.argv:
        args = [a for a in sys.argv[1:] if not a.startswith("--")]
        sys.exit(authoring_scan(args[0] if args else "skills"))
    sys.exit(main(sys.argv[1], "--quiet" in sys.argv))
