/*
  Warnings:

  - You are about to drop the column `ReportId` on the `Report` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reportId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reportId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Report_ReportId_idx";

-- DropIndex
DROP INDEX "Report_ReportId_key";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "ReportId",
ADD COLUMN     "reportId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Report_reportId_key" ON "Report"("reportId");

-- CreateIndex
CREATE INDEX "Report_reportId_idx" ON "Report"("reportId");
