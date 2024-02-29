/*
  Warnings:

  - You are about to drop the column `addressId` on the `immobiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[immobileId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `immobileId` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `favorite_immobiles` DROP FOREIGN KEY `favorite_immobiles_immobileId_fkey`;

-- DropForeignKey
ALTER TABLE `favorite_immobiles` DROP FOREIGN KEY `favorite_immobiles_userId_fkey`;

-- DropForeignKey
ALTER TABLE `immobile_photos` DROP FOREIGN KEY `immobile_photos_immobileId_fkey`;

-- DropForeignKey
ALTER TABLE `immobile_photos` DROP FOREIGN KEY `immobile_photos_photoId_fkey`;

-- DropForeignKey
ALTER TABLE `immobiles` DROP FOREIGN KEY `immobiles_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `immobiles` DROP FOREIGN KEY `immobiles_ownerId_fkey`;

-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `immobileId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `immobiles` DROP COLUMN `addressId`;

-- CreateIndex
CREATE UNIQUE INDEX `addresses_immobileId_key` ON `addresses`(`immobileId`);

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_immobileId_fkey` FOREIGN KEY (`immobileId`) REFERENCES `immobiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `immobiles` ADD CONSTRAINT `immobiles_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `immobile_photos` ADD CONSTRAINT `immobile_photos_immobileId_fkey` FOREIGN KEY (`immobileId`) REFERENCES `immobiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `immobile_photos` ADD CONSTRAINT `immobile_photos_photoId_fkey` FOREIGN KEY (`photoId`) REFERENCES `photos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite_immobiles` ADD CONSTRAINT `favorite_immobiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite_immobiles` ADD CONSTRAINT `favorite_immobiles_immobileId_fkey` FOREIGN KEY (`immobileId`) REFERENCES `immobiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
