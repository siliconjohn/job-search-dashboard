/**
 * Returns a full HTML document string for rendering the job search log markdown in a new tab.
 */
export function getLogHtml(markdown: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Job Search Log</title>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 900px;   line-height: 1; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 0.5rem 0.75rem; text-align: left; }
    th { background: #f5f5f5; }
    a { color: #1677ff; }
    h1 { margin-bottom: 1rem; }
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
