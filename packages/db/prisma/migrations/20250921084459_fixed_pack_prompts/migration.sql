/*
  Warnings:

  - You are about to drop the `PackPromts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PackPromts" DROP CONSTRAINT "PackPromts_packId_fkey";

-- DropTable
DROP TABLE "public"."PackPromts";

-- CreateTable
CREATE TABLE "public"."PackPrompts" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "packId" TEXT NOT NULL,

    CONSTRAINT "PackPrompts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PackPrompts" ADD CONSTRAINT "PackPrompts_packId_fkey" FOREIGN KEY ("packId") REFERENCES "public"."Packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
