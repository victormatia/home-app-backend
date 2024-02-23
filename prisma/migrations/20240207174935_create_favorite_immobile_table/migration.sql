-- CreateTable
CREATE TABLE `favorite_immobiles` (
    `userId` VARCHAR(191) NOT NULL,
    `immobileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `immobileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favorite_immobiles` ADD CONSTRAINT `favorite_immobiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite_immobiles` ADD CONSTRAINT `favorite_immobiles_immobileId_fkey` FOREIGN KEY (`immobileId`) REFERENCES `immobiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
