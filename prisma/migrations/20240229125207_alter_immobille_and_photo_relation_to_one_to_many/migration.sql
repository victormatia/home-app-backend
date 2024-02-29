/*
  Warnings:

  - You are about to drop the `immobile_photos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `immobileId` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `immobile_photos` DROP FOREIGN KEY `immobile_photos_immobileId_fkey`;

-- DropForeignKey
ALTER TABLE `immobile_photos` DROP FOREIGN KEY `immobile_photos_photoId_fkey`;

-- AlterTable
ALTER TABLE `photos` ADD COLUMN `immobileId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `immobile_photos`;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_immobileId_fkey` FOREIGN KEY (`immobileId`) REFERENCES `immobiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
