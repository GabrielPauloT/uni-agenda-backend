-- DropForeignKey
ALTER TABLE "recorrencia" DROP CONSTRAINT "recorrencia_idagendamento_fkey";

-- AlterTable
ALTER TABLE "recorrencia" ALTER COLUMN "presenca" SET DEFAULT true;

-- AddForeignKey
ALTER TABLE "recorrencia" ADD CONSTRAINT "recorrencia_idagendamento_fkey" FOREIGN KEY ("idagendamento") REFERENCES "agendamento"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
