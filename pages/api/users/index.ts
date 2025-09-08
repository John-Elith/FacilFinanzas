import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const items = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
        take: 100,
      });
      return res.status(200).json({ items, total: items.length });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: message || "Error interno" });
    }
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(405).end("Method Not Allowed");
}
