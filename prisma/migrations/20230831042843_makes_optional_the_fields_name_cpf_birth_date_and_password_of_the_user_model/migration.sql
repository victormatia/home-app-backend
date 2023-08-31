-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL,
    MODIFY `cpf` VARCHAR(191) NULL,
    MODIFY `birthDate` DATETIME(3) NULL;
