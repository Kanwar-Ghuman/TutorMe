/*
  Warnings:

  - You are about to drop the column `tutorEmail` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `tutorName` on the `Tutor` table. All the data in the column will be lost.
  - Added the required column `email` to the `Tutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tutor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "tutorEmail",
DROP COLUMN "tutorName",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "subjects" TEXT[];
