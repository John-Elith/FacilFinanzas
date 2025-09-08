import Link from "next/link";
import { useEffect, useState } from "react";

type Movement = {
  id: string;
  amount: number;
  concept: string;
  date: string; // ISO
  userId?: string;
};

export default function MovimientosPage() {
  const [items, setItems] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ amount: "", concept: "", date: new Date().toISOString().slice(0, 10) });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar lista inicial (stub vacía)
    const run = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/movements");
        const data = await res.json();
        setItems(data.items || []);
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = {
        amount: Number(form.amount),
        concept: form.concept,
        date: form.date,
      };
      const res = await fetch("/api/movements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Error ${res.status}`);
      }
      const created: Movement = await res.json();
      setItems((prev) => [created, ...prev]);
      setForm({ amount: "", concept: "", date: new Date().toISOString().slice(0, 10) });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setError(message || "Error desconocido");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Movimientos</h1>
          <Link href="/" className="text-sm text-blue-600 hover:underline">Volver</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-lg font-semibold">Nuevo Ingreso/Egreso</h2>
            <p className="text-sm text-gray-600 mb-3">(Visible solo para ADMIN cuando activemos RBAC)</p>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Monto</label>
                <input
                  type="number"
                  step="0.01"
                  className="mt-1 w-full border rounded px-3 py-2"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Concepto</label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded px-3 py-2"
                  value={form.concept}
                  onChange={(e) => setForm((f) => ({ ...f, concept: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Fecha</label>
                <input
                  type="date"
                  className="mt-1 w-full border rounded px-3 py-2"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="inline-flex items-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                Guardar
              </button>
            </form>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Ingresos y Egresos</h2>
            {loading ? (
              <p className="text-gray-600 mt-2">Cargando...</p>
            ) : (
              <div className="mt-2 overflow-auto">
                <table className="min-w-full border text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-2 border">Concepto</th>
                      <th className="text-left p-2 border">Monto</th>
                      <th className="text-left p-2 border">Fecha</th>
                      <th className="text-left p-2 border">Usuario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-3 text-gray-600 text-center">Sin registros</td>
                      </tr>
                    ) : (
                      items.map((m) => (
                        <tr key={m.id} className="hover:bg-gray-50">
                          <td className="p-2 border">{m.concept}</td>
                          <td className="p-2 border">${'{'}m.amount.toFixed ? m.amount.toFixed(2) : m.amount{'}'}</td>
                          <td className="p-2 border">{new Date(m.date).toLocaleDateString()}</td>
                          <td className="p-2 border">{m.userId || "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
