-- CreateTable
CREATE TABLE "agendamento" (
    "id" SERIAL NOT NULL,
    "idsala" INTEGER NOT NULL,
    "idsolicitante" INTEGER NOT NULL,
    "idusuario" INTEGER NOT NULL,
    "diasemana" SMALLINT[],
    "horainicial" VARCHAR(5) NOT NULL,
    "horafinal" VARCHAR(5) NOT NULL,
    "datainicio" DATE NOT NULL,
    "datafinal" DATE NOT NULL,
    "tema" VARCHAR(75) NOT NULL,

    CONSTRAINT "agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "falta" (
    "id" SERIAL NOT NULL,
    "idagendamento" INTEGER,
    "data" DATE,

    CONSTRAINT "falta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sala" (
    "id" SERIAL NOT NULL,
    "idtiposala" INTEGER,
    "nomedasala" VARCHAR(255) NOT NULL,
    "capacidade" SMALLINT,

    CONSTRAINT "sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitante" (
    "id" SERIAL NOT NULL,
    "idtiposolicitante" INTEGER,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "solicitante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiposala" (
    "id" SERIAL NOT NULL,
    "nomedotipo" VARCHAR(255) NOT NULL,

    CONSTRAINT "tiposala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiposolicitante" (
    "id" SERIAL NOT NULL,
    "nomedotipo" VARCHAR(255) NOT NULL,

    CONSTRAINT "tiposolicitante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_idsala_fkey" FOREIGN KEY ("idsala") REFERENCES "sala"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_idsolicitante_fkey" FOREIGN KEY ("idsolicitante") REFERENCES "solicitante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "falta" ADD CONSTRAINT "falta_idagendamento_fkey" FOREIGN KEY ("idagendamento") REFERENCES "agendamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sala" ADD CONSTRAINT "sala_idtiposala_fkey" FOREIGN KEY ("idtiposala") REFERENCES "tiposala"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitante" ADD CONSTRAINT "solicitante_idtiposolicitante_fkey" FOREIGN KEY ("idtiposolicitante") REFERENCES "tiposolicitante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
