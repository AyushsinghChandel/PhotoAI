-- CreateEnum
CREATE TYPE "public"."ModelTrainingStatusEnum" AS ENUM ('Pending', 'Completed', 'Failed');

-- AlterTable
ALTER TABLE "public"."Model" ADD COLUMN     "falAiRequestId" TEXT,
ADD COLUMN     "status" "public"."ModelTrainingStatusEnum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "triggerWord" TEXT;

-- AlterTable
ALTER TABLE "public"."OutputImages" ADD COLUMN     "falAiRequestId" TEXT;

-- AlterTable
ALTER TABLE "public"."TrainingImages" ALTER COLUMN "imageUrl" SET DEFAULT '';
