/*
  Warnings:

  - A unique constraint covering the columns `[subtopic,userId]` on the table `courses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `courses` MODIFY `subtopic` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `courses_subtopic_userId_key` ON `courses`(`subtopic`, `userId`);
