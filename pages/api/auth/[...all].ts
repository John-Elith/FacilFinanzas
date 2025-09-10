import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Crear un Request compatible con Web API desde NextApiRequest
    const url = new URL(req.url!, `https://${req.headers.host}`);
    const webRequest = new Request(url, {
      method: req.method!,
      headers: new Headers(req.headers as Record<string, string>),
      body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
    });

    // Llamar directamente al handler de Better Auth
    const response = await auth.handler(webRequest);
    
    // Convertir la Response de Web API a NextApiResponse
    const body = await response.text();
    
    // Copiar headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    return res.status(response.status).send(body);
  } catch (error: unknown) {
    console.error("Auth handler error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
}
