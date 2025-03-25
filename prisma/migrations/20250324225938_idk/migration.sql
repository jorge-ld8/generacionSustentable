/*
  Warnings:

  - You are about to drop the column `localidad` on the `ActionA1` table. All the data in the column will be lost.
  - You are about to drop the column `organizacion` on the `ActionA1` table. All the data in the column will be lost.
  - You are about to drop the column `organizacion` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ActionA1" DROP COLUMN "localidad",
DROP COLUMN "organizacion";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "organizacion";
