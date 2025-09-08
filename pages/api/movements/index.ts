import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const items = await prisma.movement.findMany({
        orderBy: { date: "desc" },
        take: 100,
        include: { user: true },
      });
      return res.status(200).json({ items, total: items.length });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: message || "Error interno" });
    }
  }

  if (req.method === "POST") {
    try {
      const { amount, concept, date } = req.body || {};
      if (amount == null || !concept || !date) {
        return res.status(400).json({ error: "amount, concept y date son obligatorios" });
      }
      // TODO: reemplazar por el usuario autenticado (Better Auth). Por ahora, asignamos un usuario ficticio si no hay sesión.
      // Buscamos cualquier usuario existente, o creamos uno mínimo temporal para registrar el movimiento.
      let anyUser = await prisma.user.findFirst();
      if (!anyUser) {
        anyUser = await prisma.user.create({
          data: {
            id: crypto.randomUUID(),
            name: "Admin Temporal",
            email: `admin_${Date.now()}@example.com`,
            emailVerified: true,
            role: "ADMIN",
          },
        });
      }

      const created = await prisma.movement.create({
        data: {
          id: crypto.randomUUID(),
          amount: Number(amount),
          concept,
          date: new Date(date),
          userId: anyUser.id,
        },
      });
      return res.status(201).json(created);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: message || "Error interno" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end("Method Not Allowed");
}
