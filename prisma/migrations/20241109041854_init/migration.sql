-- AlterTable
ALTER TABLE "TutorRequest" ADD COLUMN     "matchedTutorId" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "TutorRequest" ADD CONSTRAINT "TutorRequest_matchedTutorId_fkey" FOREIGN KEY ("matchedTutorId") REFERENCES "Tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
