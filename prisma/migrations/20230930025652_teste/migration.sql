/*
  Warnings:

  - Made the column `idagendamento` on table `recorrencia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `diasemana` on table `recorrencia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `horainicial` on table `recorrencia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `horafinal` on table `recorrencia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data` on table `recorrencia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `presenca` on table `recorrencia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdat` on table `recorrencia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedat` on table `recorrencia` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "recorrencia" ALTER COLUMN "idagendamento" SET NOT NULL,
ALTER COLUMN "diasemana" SET NOT NULL,
ALTER COLUMN "horainicial" SET NOT NULL,
ALTER COLUMN "horafinal" SET NOT NULL,
ALTER COLUMN "data" SET NOT NULL,
ALTER COLUMN "presenca" SET NOT NULL,
ALTER COLUMN "createdat" SET NOT NULL,
ALTER COLUMN "updatedat" SET NOT NULL;
