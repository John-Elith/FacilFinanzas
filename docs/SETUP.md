# FacilFinanzas - Pasos de configuración

## 1) Instalar dependencias base y levantar dev server

En `c:/Users/HP/Desktop/desarrollo-prueba/facilfinanzas`:

```bash
npm install
npm run dev
```

Abre http://localhost:3000 para ver la Home y navega a:
- http://localhost:3000/movimientos
- http://localhost:3000/usuarios
- http://localhost:3000/reportes
- http://localhost:3000/api/health (endpoint de salud)

## 2) Instalar dependencias de producción

```bash
npm i @prisma/client better-auth zod swagger-ui-react openapi3-ts chart.js react-chartjs-2 json2csv date-fns lucide-react
```

## 3) Instalar dependencias de desarrollo

```bash
npm i -D prisma ts-node @types/node jest ts-jest @testing-library/react @testing-library/jest-dom @types/jest
```

## 4) Variables de entorno (.env.local)
Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
DATABASE_URL=postgresql://postgres:XzUOi7PvxgC2Qbi4@db.jphysufwsoxptfqcnjjp.supabase.co:5432/postgres?sslmode=require
BETTER_AUTH_URL=http://localhost:3000
# Genera con: npx @better-auth/cli@latest secret
BETTER_AUTH_SECRET=REEMPLAZAR_CON_SECRETO
GITHUB_CLIENT_ID=Iv23liQGDZVbjnX8qq93
GITHUB_CLIENT_SECRET=da3e2171e70851e9b5f91a2a6617e529363cd0ea
```

## 5) Inicializar Prisma y modelos de Better Auth

```bash
npx prisma init
npx @better-auth/cli generate
# Acepta sobrescribir schema.prisma si lo pide
npx prisma migrate dev --name init
```

## 6) Añadir modelo Movement y roles, y migrar
(Lo automatizaré en un siguiente commit.)

```bash
# tras actualizar schema.prisma
npx prisma migrate dev --name add-movements-and-roles
```

## 7) Ejecutar pruebas (cuando se agreguen)

```bash
npm test
```
