-- This is an empty migration.

-- Remove the old columns that are now redundant
ALTER TABLE "ActionA1" DROP COLUMN "localidad";
ALTER TABLE "ActionA1" DROP COLUMN "organizacion";
ALTER TABLE "ActionA1" DROP COLUMN "tipo_localidad";
ALTER TABLE "User" DROP COLUMN "organizacion";