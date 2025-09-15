/*
  Warnings:

  - The values [Woman] on the enum `ModelTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ModelTypeEnum_new" AS ENUM ('Man', 'Women', 'Other');
ALTER TABLE "public"."Model" ALTER COLUMN "type" TYPE "public"."ModelTypeEnum_new" USING ("type"::text::"public"."ModelTypeEnum_new");
ALTER TYPE "public"."ModelTypeEnum" RENAME TO "ModelTypeEnum_old";
ALTER TYPE "public"."ModelTypeEnum_new" RENAME TO "ModelTypeEnum";
DROP TYPE "public"."ModelTypeEnum_old";
COMMIT;
