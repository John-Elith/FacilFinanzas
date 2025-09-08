import type { NextApiRequest, NextApiResponse } from "next";

// Devuelve una página HTML con Swagger UI embebido desde CDN apuntando a /api/openapi.json
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>FacilFinanzas API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
    <style>body { margin: 0; } .swagger-ui .topbar { display: none; }</style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: '/api/openapi.json',
          dom_id: '#swagger-ui',
          presets: [SwaggerUIBundle.presets.apis],
          layout: 'BaseLayout',
        });
      };
    </script>
  </body>
</html>`;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
