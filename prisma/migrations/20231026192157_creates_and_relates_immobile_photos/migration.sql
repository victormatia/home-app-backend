-- CreateTable
CREATE TABLE `immobile_photos` (
    `immobileId` VARCHAR(191) NOT NULL,
    `photoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`immobileId`, `photoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `immobile_photos` ADD CONSTRAINT `immobile_photos_immobileId_fkey` FOREIGN KEY (`immobileId`) REFERENCES `immobiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `immobile_photos` ADD CONSTRAINT `immobile_photos_photoId_fkey` FOREIGN KEY (`photoId`) REFERENCES `photos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
