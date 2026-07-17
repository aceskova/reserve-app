/*
  Warnings:

  - You are about to alter the column `title` on the `TrainingSession` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `description` on the `TrainingSession` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(254)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `passwordHash` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `priceCents` to the `TrainingSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainingSession" ADD COLUMN     "currency" CHAR(3) NOT NULL DEFAULT 'CZK',
ADD COLUMN     "priceCents" INTEGER NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "startsAtUtc" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "endsAtUtc" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(254),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "passwordHash" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ;

-- CreateIndex
CREATE INDEX "TrainingSession_startsAtUtc_idx" ON "TrainingSession"("startsAtUtc");

-- CreateIndex
CREATE INDEX "TrainingSession_trainerId_startsAtUtc_idx" ON "TrainingSession"("trainerId", "startsAtUtc");
