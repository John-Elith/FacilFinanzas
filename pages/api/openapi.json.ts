import type { NextApiRequest, NextApiResponse } from "next";

// OpenAPI 3.0 spec mínimo para demostrar documentación inicial
const spec = {
  openapi: "3.0.0",
  info: {
    title: "FacilFinanzas API",
    version: "0.1.0",
    description:
      "Documentación inicial del API. Endpoints stub hasta integrar DB y auth.",
  },
  servers: [{ url: "http://localhost:3000" }],
  paths: {
    "/api/health": {
      get: {
        summary: "Health check",
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
    },
    "/api/movements": {
      get: {
        summary: "Listar movimientos (stub)",
        responses: { "200": { description: "Lista de movimientos" } },
      },
      post: {
        summary: "Crear movimiento (stub)",
        responses: { "201": { description: "Creado" } },
      },
    },
    "/api/movements/{id}": {
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
      get: { summary: "Obtener movimiento (stub)", responses: { "200": { description: "OK" } } },
      put: { summary: "Actualizar movimiento (stub)", responses: { "200": { description: "OK" } } },
      delete: { summary: "Eliminar movimiento (stub)", responses: { "204": { description: "Sin contenido" } } },
    },
    "/api/users": {
      get: { summary: "Listar usuarios (stub)", responses: { "200": { description: "OK" } } },
    },
    "/api/users/{id}": {
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
      put: { summary: "Editar usuario (stub)", responses: { "200": { description: "OK" } } },
    },
    "/api/reports": {
      get: { summary: "Resumen de reportes (stub)", responses: { "200": { description: "OK" } } },
    },
    "/api/reports/csv": {
      get: { summary: "Descargar CSV (stub)", responses: { "200": { description: "OK" } } },
    },
  },
};

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(spec);
}
