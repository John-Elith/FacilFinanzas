import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">FacilFinanzas</h1>
          <span className="text-sm text-gray-500">Prueba técnica</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <section className="mb-8">
          <h2 className="text-xl font-semibold">Menú principal</h2>
          <p className="text-gray-600 mt-1">
            Navega a las secciones principales del sistema. (Los accesos de
            Usuarios y Reportes serán visibles solo para administradores)
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/movimientos"
            className="border rounded-lg p-6 hover:shadow transition bg-gray-50"
          >
            <h3 className="font-semibold text-lg">Sistema de Ingresos y Gastos</h3>
            <p className="text-gray-600 mt-2">Ver y registrar movimientos.</p>
          </Link>

          <Link
            href="/usuarios"
            className="border rounded-lg p-6 hover:shadow transition bg-gray-50"
          >
            <h3 className="font-semibold text-lg">Gestión de Usuarios</h3>
            <p className="text-gray-600 mt-2">Listado y edición de usuarios.</p>
            <span className="inline-block mt-3 text-xs font-medium text-purple-700">Solo ADMIN</span>
          </Link>

          <Link
            href="/reportes"
            className="border rounded-lg p-6 hover:shadow transition bg-gray-50"
          >
            <h3 className="font-semibold text-lg">Reportes</h3>
            <p className="text-gray-600 mt-2">Gráficos, saldo y CSV.</p>
            <span className="inline-block mt-3 text-xs font-medium text-purple-700">Solo ADMIN</span>
          </Link>
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold">Estado</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Proyecto Next.js (pages router) ya creado.</li>
            <li>Pendiente: instalar dependencias (Prisma, Better Auth, etc.) ya creada.</li>
            <li>Pendiente: autenticación, RBAC y API.</li>
          </ul>
        </section>
      </main>

      <footer className="border-t">
        <div className="max-w-5xl mx-auto px-6 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} FacilFinanzas — Prueba técnica - John Elith
        </div>
      </footer>
    </div>
  );
}
