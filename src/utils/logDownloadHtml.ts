/**
 * Returns a full HTML document string for rendering the Contact Log log markdown in a new tab.
 * Styled for both on-screen view and print.
 */
export function getLogHtml(markdown: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contact Log Log</title>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 1.5rem;
      line-height: 1.4;
      color: #222;
    }
    table { border-collapse: collapse; width: 100%; table-layout: fixed; }
    th, td { border: 1px solid #ddd; padding: 0.5rem 0.75rem; text-align: left; }
    th { background: #f5f5f5; font-weight: 600; }
    /* Columns: 1=Created, 2=Kind, 3=Company, 4=Position, 5=Contact, 6=Note, 7=URL */
    th:nth-child(6), td:nth-child(6) { width: 40%; }
    th:nth-child(7), td:nth-child(7) { width: 14%; }
    a { color: #1677ff; }
    a[href]::after { content: none; }
    h1 { margin-bottom: 1rem; font-size: 1.5rem; }
    tr { break-inside: avoid; }
    thead { display: table-header-group; }
    @media print {
      body { padding: 0; max-width: none; }
      h1 { margin-top: 0; }
      table { font-size: 0.85rem; }
      th, td { padding: 0.35rem 0.5rem; }
      th { background: #e8e8e8; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      a { color: #000; text-decoration: underline; }
      @page { margin: 1.5cm; }
    }
  </style>
</head>
<body>
  <div id="content"></div>
  <script>
    var md = ${JSON.stringify(markdown)};
    document.getElementById('content').innerHTML = marked.parse(md);
  </script>
</body>
</html>`;
}
