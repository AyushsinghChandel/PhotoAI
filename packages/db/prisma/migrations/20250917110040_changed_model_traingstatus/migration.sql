/*
  Warnings:

  - You are about to drop the column `status` on the `Model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Model" DROP COLUMN "status",
ADD COLUMN     "trainingStatus" "public"."ModelTrainingStatusEnum" NOT NULL DEFAULT 'Pending';
