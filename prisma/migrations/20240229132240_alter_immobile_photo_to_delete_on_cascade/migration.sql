-- DropForeignKey
ALTER TABLE `photos` DROP FOREIGN KEY `photos_immobileId_fkey`;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_immobileId_fkey` FOREIGN KEY (`immobileId`) REFERENCES `immobiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
