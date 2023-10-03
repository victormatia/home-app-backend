/*
  Warnings:

  - You are about to drop the column `type` on the `immobile` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `immobile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `immobile` DROP COLUMN `type`,
    ADD COLUMN `typeId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ImmobileType` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `immobile` ADD CONSTRAINT `immobile_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `ImmobileType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
