-- This is an empty migration.
ALTER TABLE "ActionA1" ADD COLUMN     "localidad" TEXT,
ADD COLUMN     "organizacion" TEXT;
ALTER TABLE "User" ADD COLUMN  "organizacion" TEXT NOT NULL;