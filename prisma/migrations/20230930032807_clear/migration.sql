/*
  Warnings:

  - Made the column `idsala` on table `agendamento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idsolicitante` on table `agendamento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idusuario` on table `agendamento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `datainicio` on table `agendamento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `datafinal` on table `agendamento` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "agendamento" ALTER COLUMN "idsala" SET NOT NULL,
ALTER COLUMN "idsolicitante" SET NOT NULL,
ALTER COLUMN "idusuario" SET NOT NULL,
ALTER COLUMN "datainicio" SET NOT NULL,
ALTER COLUMN "datafinal" SET NOT NULL;
