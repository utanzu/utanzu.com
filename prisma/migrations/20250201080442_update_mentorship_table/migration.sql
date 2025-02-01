/*
  Warnings:

  - You are about to drop the column `mentorshipId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `mentorships` DROP FOREIGN KEY `mentorships_mentorId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_mentorshipId_fkey`;

-- DropIndex
DROP INDEX `users_mentorshipId_fkey` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `mentorshipId`;

-- AddForeignKey
ALTER TABLE `mentorships` ADD CONSTRAINT `mentorships_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `mentors`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
