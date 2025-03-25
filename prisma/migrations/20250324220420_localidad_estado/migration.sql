/*
  Warnings:

  - Added the required column `estado` to the `Localidad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Localidad" ADD COLUMN  "estado" TEXT NOT NULL;
