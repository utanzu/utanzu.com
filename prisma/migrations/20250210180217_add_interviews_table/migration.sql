-- CreateTable
CREATE TABLE `interviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ipAddress` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `interviews` ADD CONSTRAINT `interviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
