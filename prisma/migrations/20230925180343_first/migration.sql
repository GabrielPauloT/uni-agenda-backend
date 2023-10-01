-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sala" (
    "id" SERIAL NOT NULL,
    "idtiposala" INTEGER,
    "nomedasala" VARCHAR(255) NOT NULL,
    "capacidade" SMALLINT,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitante" (
    "id" SERIAL NOT NULL,
    "idtiposolicitante" INTEGER,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "solicitante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agendamento" (
    "id" SERIAL NOT NULL,
    "idsala" INTEGER,
    "idsolicitante" INTEGER,
    "idusuario" INTEGER,
    "datainicio" DATE,
    "datafinal" DATE,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recorrencia" (
    "id" SERIAL NOT NULL,
    "idagendamento" INTEGER,
    "diasemana" SMALLINT,
    "horainicial" TIME(6),
    "horafinal" TIME(6),
    "data" DATE,
    "presenca" BOOLEAN,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recorrencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiposala" (
    "id" SERIAL NOT NULL,
    "nomedotipo" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tiposala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiposolicitante" (
    "id" SERIAL NOT NULL,
    "nomedotipo" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tiposolicitante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sala" ADD CONSTRAINT "sala_idtiposala_fkey" FOREIGN KEY ("idtiposala") REFERENCES "tiposala"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitante" ADD CONSTRAINT "solicitante_idtiposolicitante_fkey" FOREIGN KEY ("idtiposolicitante") REFERENCES "tiposolicitante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_idsala_fkey" FOREIGN KEY ("idsala") REFERENCES "sala"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_idsolicitante_fkey" FOREIGN KEY ("idsolicitante") REFERENCES "solicitante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recorrencia" ADD CONSTRAINT "recorrencia_idagendamento_fkey" FOREIGN KEY ("idagendamento") REFERENCES "agendamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
