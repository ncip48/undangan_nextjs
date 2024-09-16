-- CreateTable
CREATE TABLE `purchases` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `total` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weddings` (
    `id` VARCHAR(191) NOT NULL,
    `purchaseId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `nama_mempelai_wanita` VARCHAR(191) NOT NULL,
    `putri_ke` VARCHAR(191) NOT NULL,
    `nama_ortu_wanita` VARCHAR(191) NOT NULL,
    `nama_mempelai_pria` VARCHAR(191) NOT NULL,
    `putra_ke` VARCHAR(191) NOT NULL,
    `nama_ortu_pria` VARCHAR(191) NOT NULL,
    `tanggal_akad` VARCHAR(191) NOT NULL,
    `tanggal_resepsi` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `link_google_maps` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `weddings_purchaseId_key`(`purchaseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gifts` (
    `id` VARCHAR(191) NOT NULL,
    `weddingId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `an` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `galleries` (
    `id` VARCHAR(191) NOT NULL,
    `weddingId` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wishes` (
    `id` VARCHAR(191) NOT NULL,
    `weddingId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `wish` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `weddings` ADD CONSTRAINT `weddings_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `purchases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gifts` ADD CONSTRAINT `gifts_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `weddings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `galleries` ADD CONSTRAINT `galleries_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `weddings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishes` ADD CONSTRAINT `wishes_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `weddings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
