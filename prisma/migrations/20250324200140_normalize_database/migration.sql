-- CreateTable
CREATE TABLE "Localidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT,

    CONSTRAINT "Localidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Organizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionA1" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_final" DATE NOT NULL,
    "localidad" TEXT,
    "organizacion" TEXT,
    "tipo_localidad" TEXT,
    "localidadId" INTEGER NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "nro_participantes" INTEGER NOT NULL,
    "nro_mujeres" INTEGER NOT NULL,
    "nro_noid" INTEGER NOT NULL,
    "nro_pob_ind" INTEGER,
    "nro_pob_lgbtiq" INTEGER NOT NULL,
    "nro_pob_rural" INTEGER,
    "nro_pob_16_29" INTEGER,
    "nro_lid_pob_16_29" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nombre_real" TEXT NOT NULL,
    "imgUrl" TEXT,

    CONSTRAINT "ActionA1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "organizacion" TEXT NOT NULL,
    "organizacionId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Localidad_nombre_key" ON "Localidad"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Organizacion_nombre_key" ON "Organizacion"("nombre");


-- Start a transaction
BEGIN;

-- Check if tables exist before creating them
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'Localidad') THEN
        -- CreateTable
        CREATE TABLE "Localidad" (
            "id" SERIAL NOT NULL,
            "nombre" TEXT NOT NULL,
            "tipo" TEXT,
            CONSTRAINT "Localidad_pkey" PRIMARY KEY ("id")
        );
        
        -- CreateIndex
        CREATE UNIQUE INDEX "Localidad_nombre_key" ON "Localidad"("nombre");
    END IF;

    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'Organizacion') THEN
        -- CreateTable
        CREATE TABLE "Organizacion" (
            "id" SERIAL NOT NULL,
            "nombre" TEXT NOT NULL,
            CONSTRAINT "Organizacion_pkey" PRIMARY KEY ("id")
        );
        
        -- CreateIndex
        CREATE UNIQUE INDEX "Organizacion_nombre_key" ON "Organizacion"("nombre");
    END IF;
END $$;

-- Populate tables with existing data (only if they're empty)
DO $$ 
BEGIN
    IF (SELECT COUNT(*) FROM "Localidad") = 0 THEN
        INSERT INTO "Localidad" ("nombre", "tipo")
        SELECT DISTINCT "localidad", "tipo_localidad" FROM "ActionA1"
        WHERE "localidad" IS NOT NULL;
    END IF;
    
    IF (SELECT COUNT(*) FROM "Organizacion") = 0 THEN
        INSERT INTO "Organizacion" ("nombre")
        SELECT DISTINCT "organizacion" FROM "ActionA1"
        WHERE "organizacion" IS NOT NULL;
    END IF;
END $$;

-- Check if columns exist before adding them
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                  WHERE table_name = 'ActionA1' AND column_name = 'localidadId') THEN
        ALTER TABLE "ActionA1" ADD COLUMN "localidadId" INTEGER;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                  WHERE table_name = 'ActionA1' AND column_name = 'organizacionId') THEN
        ALTER TABLE "ActionA1" ADD COLUMN "organizacionId" INTEGER;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                  WHERE table_name = 'User' AND column_name = 'organizacionId') THEN
        ALTER TABLE "User" ADD COLUMN "organizacionId" INTEGER;
    END IF;
END $$;

-- Update foreign keys (if not already set)
UPDATE "ActionA1" a
SET "localidadId" = l.id
FROM "Localidad" l
WHERE a."localidad" = l."nombre" AND a."localidadId" IS NULL;

UPDATE "ActionA1" a
SET "organizacionId" = o.id
FROM "Organizacion" o
WHERE a."organizacion" = o."nombre" AND a."organizacionId" IS NULL;

UPDATE "User" u
SET "organizacionId" = o.id
FROM "Organizacion" o
WHERE u."organizacion" = o."nombre" AND u."organizacionId" IS NULL;

-- Add constraints if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ActionA1_localidadId_fkey') THEN
        ALTER TABLE "ActionA1" 
        ADD CONSTRAINT "ActionA1_localidadId_fkey" 
        FOREIGN KEY ("localidadId") REFERENCES "Localidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ActionA1_organizacionId_fkey') THEN
        ALTER TABLE "ActionA1" 
        ADD CONSTRAINT "ActionA1_organizacionId_fkey" 
        FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'User_organizacionId_fkey') THEN
        ALTER TABLE "User" 
        ADD CONSTRAINT "User_organizacionId_fkey" 
        FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

-- Make the foreign keys NOT NULL only if they have values
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM "ActionA1" WHERE "localidadId" IS NULL) THEN
        ALTER TABLE "ActionA1" ALTER COLUMN "localidadId" SET NOT NULL;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM "ActionA1" WHERE "organizacionId" IS NULL) THEN
        ALTER TABLE "ActionA1" ALTER COLUMN "organizacionId" SET NOT NULL;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM "User" WHERE "organizacionId" IS NULL) THEN
        ALTER TABLE "User" ALTER COLUMN "organizacionId" SET NOT NULL;
    END IF;
END $$;

COMMIT;
