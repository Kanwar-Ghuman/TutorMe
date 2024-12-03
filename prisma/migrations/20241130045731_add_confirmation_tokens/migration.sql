/*
  Warnings:

  - A unique constraint covering the columns `[studentToken]` on the table `TutorRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tutorToken]` on the table `TutorRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TutorRequest" ADD COLUMN     "studentToken" TEXT,
ADD COLUMN     "tutorToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TutorRequest_studentToken_key" ON "TutorRequest"("studentToken");

-- CreateIndex
CREATE UNIQUE INDEX "TutorRequest_tutorToken_key" ON "TutorRequest"("tutorToken");
