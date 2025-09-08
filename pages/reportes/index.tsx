import Link from "next/link";

export default function ReportesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Reportes</h1>
          <Link href="/" className="text-sm text-blue-600 hover:underline">Volver</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-gray-700">Visualización de gráficos y saldo (placeholder). Próximamente: chart, saldo y descarga CSV.</p>
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <p className="text-sm text-purple-700 font-medium">Sección solo para ADMIN</p>
        </div>
      </main>
    </div>
  );
}
