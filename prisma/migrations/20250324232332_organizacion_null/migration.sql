-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_organizacionId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "organizacionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
