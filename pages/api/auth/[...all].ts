import type { NextApiRequest, NextApiResponse } from "next";
import { toNextApiHandler } from "better-auth/next-js";
import { auth } from "../../../lib/auth";

// Catch-all para Better Auth en Pages Router
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return toNextApiHandler(auth)(req, res);
}
