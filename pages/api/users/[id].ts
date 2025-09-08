import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// Editar usuario: nombre y rol
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== "string") return res.status(400).json({ error: "id inválido" });

  if (req.method === "PUT") {
    try {
      const { name, role } = req.body || {};
      const updated = await prisma.user.update({
        where: { id },
        data: {
          ...(name ? { name } : {}),
          ...(role ? { role } : {}),
        },
      });
      return res.status(200).json(updated);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: message || "Error interno" });
    }
  }

  res.setHeader("Allow", ["PUT"]);
  return res.status(405).end("Method Not Allowed");
}
