import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const r = await prisma.$queryRawUnsafe("SELECT 1 AS ok");
    return res.status(200).json({ ok: true, result: r });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ ok: false, error: message });
  }
}
