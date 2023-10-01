/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `solicitante` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `solicitante` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nomedotipo]` on the table `tiposala` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "solicitante_nome_key" ON "solicitante"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "solicitante_email_key" ON "solicitante"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tiposala_nomedotipo_key" ON "tiposala"("nomedotipo");
