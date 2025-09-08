import type { NextApiRequest, NextApiResponse } from "next";

// Stub de reportes: devolverá balance y datos para chart
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const data = {
    balance: 0,
    series: [
      { date: new Date().toISOString().slice(0, 10), income: 0, expense: 0 },
    ],
  };
  return res.status(200).json(data);
}
