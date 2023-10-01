/*
  Warnings:

  - A unique constraint covering the columns `[nomedasala]` on the table `sala` will be added. If there are existing duplicate values, this will fail.
  - Made the column `idtiposala` on table `sala` required. This step will fail if there are existing NULL values in that column.
  - Made the column `capacidade` on table `sala` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "sala" ALTER COLUMN "idtiposala" SET NOT NULL,
ALTER COLUMN "capacidade" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sala_nomedasala_key" ON "sala"("nomedasala");
