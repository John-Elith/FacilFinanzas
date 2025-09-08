import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "id inválido" });
  }

  if (req.method === "GET") {
    try {
      const item = await prisma.movement.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ error: "No encontrado" });
      return res.status(200).json(item);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: message || "Error interno" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { amount, concept, date } = req.body || {};
      const updated = await prisma.movement.update({
        where: { id },
        data: {
          ...(amount != null ? { amount } : {}),
          ...(concept ? { concept } : {}),
          ...(date ? { date: new Date(date) } : {}),
        },
      });
      return res.status(200).json(updated);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: message || "Error interno" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.movement.delete({ where: { id } });
      return res.status(204).end();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: message || "Error interno" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end("Method Not Allowed");
}
