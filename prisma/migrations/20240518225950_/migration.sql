/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Tutor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tutor" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "TutorRequest" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_email_key" ON "Tutor"("email");
