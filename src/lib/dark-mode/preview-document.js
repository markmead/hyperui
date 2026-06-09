export function buildPreviewDocument(htmlContent, isDarkMode) {
  return `
    <!doctype html>
    <html lang="en"${isDarkMode ? ' class="dark"' : ''}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style type="text/tailwindcss">@custom-variant dark (&:where(.dark, .dark *));</style>
      </head>
      <body>${htmlContent}</body>
    </html>
  `
}
