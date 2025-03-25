/*
  Warnings:

  - You are about to drop the column `tipo` on the `Localidad` table. All the data in the column will be lost.

*/

--  In your migration file
ALTER TABLE "ActionA1" ADD COLUMN IF NOT EXISTS "tipo_localidad" TEXT;

-- Update existing records
UPDATE "ActionA1" a
SET "tipo_localidad" = l.tipo
FROM "Localidad" l
WHERE a."localidadId" = l.id AND a."tipo_localidad" IS NULL;
-- AlterTable
ALTER TABLE "Localidad" DROP COLUMN "tipo";
