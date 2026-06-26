"""
Render werkplaats3b oprichtingsplan naar PDF.
- Geen Gespreksverslag-header
- Spec-document als aanhangsel
- Referenties als klikbare links
"""

import os
import subprocess
import markdown
import re

BASE = os.path.dirname(os.path.abspath(__file__))
PLAN_MD  = os.path.join(BASE, "2026-06-11-werkplaats3b-bv-oprichting.md")
SPEC_MD  = os.path.join(os.path.dirname(os.path.dirname(BASE)), "2026-06-11-werkplaats3b-bv-opzet.md")
OUT_HTML = os.path.join(BASE, "2026-06-11-werkplaats3b-bv-oprichting.rendered.html")
OUT_PDF  = os.path.join(BASE, "2026-06-11-werkplaats3b-bv-oprichting.pdf")
CHROME   = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

MD_EXTENSIONS = ["tables", "fenced_code", "nl2br", "sane_lists"]

CSS = """
@page {
    size: A4;
    margin: 28mm 22mm 18mm 22mm;
}
* { box-sizing: border-box; }
html, body {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: 11pt;
    color: #000;
    line-height: 1.42;
    margin: 0;
    padding: 0;
}

/* Document title */
.doc-title {
    font-size: 20pt;
    font-weight: bold;
    color: #1a1a1a;
    margin: 0 0 4pt 0;
    line-height: 1.15;
}
.doc-meta {
    font-size: 10pt;
    color: #555;
    margin: 0 0 18pt 0;
    border-bottom: 1pt solid #ccc;
    padding-bottom: 10pt;
}

h1 {
    font-size: 15pt;
    font-weight: bold;
    color: #1a1a1a;
    margin: 18pt 0 8pt 0;
    padding: 0 0 4pt 0;
    border-bottom: 0.6pt solid #888;
    line-height: 1.2;
    page-break-after: avoid;
}
h2 {
    font-size: 12pt;
    font-weight: bold;
    color: #1a1a1a;
    margin: 12pt 0 4pt 0;
    line-height: 1.25;
    page-break-before: always;
    page-break-after: avoid;
}
h3 {
    font-size: 11pt;
    font-weight: bold;
    color: #1a1a1a;
    margin: 10pt 0 3pt 0;
    page-break-after: avoid;
}

p { margin: 0 0 6pt 0; }
strong { font-weight: bold; }
em { font-style: italic; }
a { color: #1a5fa8; text-decoration: underline; }

blockquote {
    border-left: 3pt solid #888;
    margin: 8pt 0 8pt 18pt;
    padding: 4pt 10pt;
    color: #333;
    font-style: italic;
}

ul {
    margin: 4pt 0 8pt 0;
    padding-left: 18pt;
    list-style: none;
}
ul li {
    position: relative;
    padding-left: 10pt;
    margin: 2pt 0;
}
ul li::before {
    content: "\\25A0";
    position: absolute;
    left: -2pt;
    top: 0;
    font-size: 8.5pt;
    color: #000;
    line-height: 1.7;
}
ul ul {
    margin-top: 2pt;
    margin-bottom: 4pt;
}
ul ul li::before {
    content: "\\25AA";
    font-size: 9pt;
}
ol {
    margin: 4pt 0 8pt 0;
    padding-left: 22pt;
}
ol li { margin: 2pt 0; }

table {
    width: 100%;
    border-collapse: collapse;
    margin: 8pt 0 14pt 0;
    font-size: 10.5pt;
    page-break-inside: auto;
}
thead tr { background: #e8e8e8; }
th {
    text-align: left;
    font-weight: bold;
    padding: 5pt 7pt;
    border: 0.5pt solid #888;
    color: #1a1a1a;
    background: #e8e8e8;
}
td {
    padding: 5pt 7pt;
    border: 0.5pt solid #aaa;
    vertical-align: top;
}
tr { page-break-inside: avoid; }
td:first-child { font-weight: bold; }

code, pre {
    font-family: Consolas, monospace;
    font-size: 10pt;
    background: #f5f5f5;
    padding: 1pt 3pt;
    border-radius: 2pt;
}
pre { padding: 8pt; display: block; overflow-x: auto; }

hr {
    border: none;
    border-top: 0.5pt solid #bbb;
    margin: 14pt 0;
}

.appendix-divider {
    page-break-before: always;
    border-top: 2pt solid #333;
    margin: 0 0 16pt 0;
    padding-top: 10pt;
}
.appendix-label {
    font-size: 10pt;
    font-weight: bold;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4pt;
}

/* Footer — herhaalt op elke pagina via position:fixed bij print */
.page-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 3pt 22mm 0 22mm;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 8pt;
    color: #666;
    display: flex;
    justify-content: space-between;
    border-top: 0.4pt solid #ccc;
}
"""


def md_to_html(text):
    return markdown.markdown(text, extensions=MD_EXTENSIONS)


def linkify_references(html):
    """Vervang bestandspad-referenties door klikbare ankers naar het aanhangsel."""
    # docs/2026-06-11-werkplaats3b-bv-opzet.md → anker naar appendix-a (zit in zelfde PDF)
    html = re.sub(
        r'<code>(docs/2026-06-11-werkplaats3b-bv-opzet\.md)</code>',
        r'<a href="#appendix-a">\1 &darr; Aanhangsel&nbsp;A</a>',
        html
    )
    # overige docs/... .md verwijzingen
    html = re.sub(
        r'<code>(docs/[^<]+\.md)</code>',
        lambda m: f'<a href="{m.group(1)}">{m.group(1)}</a>',
        html
    )
    return html


def build_html(plan_body, spec_body):
    return f"""<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<title>Werkplaats3b BV — Oprichtingsplan</title>
<style>
{CSS}
</style>
</head>
<body>

<div class="doc-title">Werkplaats3b BV — Oprichtingsplan</div>
<div class="doc-meta">
  Harm &middot; Matthijs &middot; Wesley &nbsp;|&nbsp; Oud Camp 3b, Maasland &nbsp;|&nbsp; 2026-06-11 &nbsp;|&nbsp; Versie 1.0
</div>

<div class="markdown-body">
{plan_body}
</div>

<div id="appendix-a" class="appendix-divider">
  <div class="appendix-label">Aanhangsel A — Exploitatie-opzet (achtergrond &amp; onderbouwing)</div>
</div>
<div class="markdown-body">
{spec_body}
</div>

<div class="page-footer">
  <span>Werkplaats3b BV &mdash; Oprichtingsplan</span>
  <span>Vertrouwelijk &middot; 2026-06-11</span>
</div>

</body>
</html>"""


def render_pdf(html_path, pdf_path):
    args = [
        CHROME,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--print-to-pdf-no-header",
        f"--print-to-pdf={pdf_path}",
        html_path,
    ]
    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode != 0:
        print("STDERR:", result.stderr)
        raise RuntimeError(f"Chrome headless failed (rc={result.returncode})")


def main():
    with open(PLAN_MD, encoding="utf-8") as f:
        plan_md = f.read()
    with open(SPEC_MD, encoding="utf-8") as f:
        spec_md = f.read()

    # Verwijder de eerste h1 uit het plan (zit al in doc-title)
    plan_md_body = re.sub(r'^# .+\n', '', plan_md, count=1)

    plan_html = md_to_html(plan_md_body)
    spec_html  = md_to_html(spec_md)

    plan_html = linkify_references(plan_html)

    html = build_html(plan_html, spec_html)

    with open(OUT_HTML, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"HTML geschreven: {OUT_HTML}")

    # Absoluut pad voor Chrome (file://)
    html_abs = "file:///" + OUT_HTML.replace("\\", "/")
    render_pdf(html_abs, OUT_PDF)
    print(f"PDF klaar: {OUT_PDF}")


if __name__ == "__main__":
    main()
