/*
  Warnings:

  - You are about to drop the column `status` on the `OutputImages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."OutputImages" DROP COLUMN "status",
ADD COLUMN     "TrainingStatus" "public"."OutputImageStatusEnum" NOT NULL DEFAULT 'Pending';

-- CreateIndex
CREATE INDEX "Model_falAiRequestId_idx" ON "public"."Model"("falAiRequestId");

-- CreateIndex
CREATE INDEX "OutputImages_falAiRequestId_idx" ON "public"."OutputImages"("falAiRequestId");
