/*
  Warnings:

  - You are about to drop the column `authorId` on the `TutorRequest` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `TutorRequest` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `TutorRequest` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `TutorRequest` table. All the data in the column will be lost.
  - Added the required column `student` to the `TutorRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentEmail` to the `TutorRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `TutorRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `TutorRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TutorRequest" DROP CONSTRAINT "TutorRequest_authorId_fkey";

-- AlterTable
ALTER TABLE "TutorRequest" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "genderPref" TEXT,
ADD COLUMN     "student" TEXT NOT NULL,
ADD COLUMN     "studentEmail" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "teacherId" TEXT NOT NULL,
ADD COLUMN     "tutorId" TEXT;

-- CreateTable
CREATE TABLE "Tutor" (
    "id" TEXT NOT NULL,
    "tutorName" TEXT NOT NULL,
    "tutorEmail" TEXT NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TutorRequest" ADD CONSTRAINT "TutorRequest_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorRequest" ADD CONSTRAINT "TutorRequest_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
