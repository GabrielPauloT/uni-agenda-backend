/*
  Warnings:

  - Made the column `idtiposolicitante` on table `solicitante` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "recorrencia" ALTER COLUMN "createdat" DROP NOT NULL,
ALTER COLUMN "updatedat" DROP NOT NULL;

-- AlterTable
ALTER TABLE "solicitante" ALTER COLUMN "idtiposolicitante" SET NOT NULL;
