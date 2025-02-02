/*
  Warnings:

  - Added the required column `mentorshipId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `messages` ADD COLUMN `mentorshipId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_mentorshipId_fkey` FOREIGN KEY (`mentorshipId`) REFERENCES `mentorships`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
