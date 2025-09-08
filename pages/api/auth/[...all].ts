import type { NextApiRequest, NextApiResponse } from "next";
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "../../../lib/auth";

// Adaptador para Pages API: reutilizamos el handler del App Router
const { GET, POST } = toNextJsHandler(auth);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // @ts-expect-error: adaptando tipos de App Router a Pages API
    return GET(req, res);
  }
  if (req.method === "POST") {
    // @ts-expect-error: adaptando tipos de App Router a Pages API
    return POST(req, res);
  }
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end("Method Not Allowed");
}
