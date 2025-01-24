/*
  Warnings:

  - You are about to alter the column `id` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `courses` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropIndex
DROP INDEX `courses_id_key` ON `courses`;
