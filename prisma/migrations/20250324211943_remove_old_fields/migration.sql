/*
  Warnings:

  - Added the required column `organizacion` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActionA1" ADD COLUMN     "localidad" TEXT,
ADD COLUMN     "organizacion" TEXT,
ADD COLUMN     "tipo_localidad" TEXT;
ALTER TABLE "User" ADD COLUMN  "organizacion" TEXT NOT NULL;


-- Start a transaction for safety
BEGIN;

-- Update ActionA1.localidad from Localidad.nombre 
UPDATE "ActionA1" a
SET "localidad" = l."nombre"
FROM "Localidad" l
WHERE a."localidadId" = l."id" AND a."localidad" IS NULL;

-- Update ActionA1.tipo_localidad from Localidad.tipo
UPDATE "ActionA1" a
SET "tipo_localidad" = l."tipo"
FROM "Localidad" l
WHERE a."localidadId" = l."id" AND a."tipo_localidad" IS NULL;

-- Update ActionA1.organizacion from Organizacion.nombre
UPDATE "ActionA1" a
SET "organizacion" = o."nombre"
FROM "Organizacion" o
WHERE a."organizacionId" = o."id" AND a."organizacion" IS NULL;

-- Update User.organizacion from Organizacion.nombre
UPDATE "User" u
SET "organizacion" = o."nombre"
FROM "Organizacion" o
WHERE u."organizacionId" = o."id" AND u."organizacion" IS NULL;

UPDATE "User" u
SET "organizacion" = o."nombre"
FROM "Organizacion" o
WHERE u."organizacionId" = o."id" AND (u."organizacion" IS NULL OR u."organizacion" = '');

COMMIT;

ALTER TABLE "User" ALTER COLUMN "organizacion" SET NOT NULL;
