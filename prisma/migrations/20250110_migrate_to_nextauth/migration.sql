-- Migración para adaptar el esquema a NextAuth.js

-- Actualizar tabla usuario (User)
ALTER TABLE "usuario" 
  ALTER COLUMN "correo_verificado" TYPE TIMESTAMP USING 
    CASE 
      WHEN "correo_verificado" = true THEN NOW()
      ELSE NULL 
    END;

-- Actualizar tabla sesion (Session) para NextAuth
DROP TABLE IF EXISTS "sesion";
CREATE TABLE "sesion" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "expira_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sesion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "sesion_token_key" ON "sesion"("token");
ALTER TABLE "sesion" ADD CONSTRAINT "sesion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Actualizar tabla cuenta (Account) para NextAuth
DROP TABLE IF EXISTS "cuenta";
CREATE TABLE "cuenta" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "proveedor" TEXT NOT NULL,
    "cuenta_id_proveedor" TEXT NOT NULL,
    "token_refresco" TEXT,
    "token_acceso" TEXT,
    "expira_en" INTEGER,
    "tipo_token" TEXT,
    "alcance" TEXT,
    "token_id" TEXT,
    "estado_sesion" TEXT,

    CONSTRAINT "cuenta_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "cuenta_proveedor_cuenta_id_proveedor_key" ON "cuenta"("proveedor", "cuenta_id_proveedor");
ALTER TABLE "cuenta" ADD CONSTRAINT "cuenta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Actualizar tabla verificacion para NextAuth
DROP TABLE IF EXISTS "verificacion";
CREATE TABLE "verificacion" (
    "identificador" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expira_en" TIMESTAMP(3) NOT NULL
);

CREATE UNIQUE INDEX "verificacion_identificador_token_key" ON "verificacion"("identificador", "token");
