-- AlterTable
ALTER TABLE "AcademicRecord" ADD COLUMN     "assignmentAverage" DOUBLE PRECISION,
ADD COLUMN     "attendancePercentage" DOUBLE PRECISION,
ADD COLUMN     "courseCode" TEXT,
ADD COLUMN     "courseName" TEXT,
ADD COLUMN     "credits" INTEGER,
ADD COLUMN     "examMark" DOUBLE PRECISION,
ADD COLUMN     "missedDeadlines" INTEGER,
ADD COLUMN     "previousExamMark" DOUBLE PRECISION,
ADD COLUMN     "quizAverage" DOUBLE PRECISION,
ADD COLUMN     "studyHoursPerWeek" DOUBLE PRECISION;
