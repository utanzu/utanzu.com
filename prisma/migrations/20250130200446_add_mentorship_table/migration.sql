/*
  Warnings:

  - Made the column `fullName` on table `mentors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `mentors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `mentors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkedin` on table `mentors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `mentors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expertise` on table `mentors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `mentors` MODIFY `fullName` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `linkedin` VARCHAR(191) NOT NULL,
    MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `expertise` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `mentorshipId` INTEGER NULL;

-- CreateTable
CREATE TABLE `mentorships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mentorId` VARCHAR(191) NOT NULL,
    `menteeId` VARCHAR(191) NOT NULL,
    `ipAddress` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` LONGTEXT NOT NULL,
    `status` ENUM('PENDING', 'REJECTED', 'ONGOING', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `mentorships_mentorId_menteeId_key`(`mentorId`, `menteeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_mentorshipId_fkey` FOREIGN KEY (`mentorshipId`) REFERENCES `mentorships`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mentorships` ADD CONSTRAINT `mentorships_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mentorships` ADD CONSTRAINT `mentorships_menteeId_fkey` FOREIGN KEY (`menteeId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
