/*
  Warnings:

  - You are about to drop the `agendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recorrencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sala` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `solicitante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tiposala` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tiposolicitante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "agendamento" DROP CONSTRAINT "agendamento_idsala_fkey";

-- DropForeignKey
ALTER TABLE "agendamento" DROP CONSTRAINT "agendamento_idsolicitante_fkey";

-- DropForeignKey
ALTER TABLE "agendamento" DROP CONSTRAINT "agendamento_idusuario_fkey";

-- DropForeignKey
ALTER TABLE "recorrencia" DROP CONSTRAINT "recorrencia_idagendamento_fkey";

-- DropForeignKey
ALTER TABLE "sala" DROP CONSTRAINT "sala_idtiposala_fkey";

-- DropForeignKey
ALTER TABLE "solicitante" DROP CONSTRAINT "solicitante_idtiposolicitante_fkey";

-- DropTable
DROP TABLE "agendamento";

-- DropTable
DROP TABLE "recorrencia";

-- DropTable
DROP TABLE "sala";

-- DropTable
DROP TABLE "solicitante";

-- DropTable
DROP TABLE "tiposala";

-- DropTable
DROP TABLE "tiposolicitante";

-- DropTable
DROP TABLE "usuario";
