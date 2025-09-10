import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Verificar variables de entorno críticas para Better Auth
    const envCheck = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
      BETTER_AUTH_SECRET: !!process.env.BETTER_AUTH_SECRET,
      GITHUB_CLIENT_ID: !!process.env.GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET: !!process.env.GITHUB_CLIENT_SECRET,
    };

    return res.status(200).json({
      ok: true,
      environment: process.env.NODE_ENV,
      envVars: envCheck,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ 
      ok: false, 
      error: message,
      timestamp: new Date().toISOString(),
    });
  }
}
