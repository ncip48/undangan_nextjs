/*
  Warnings:

  - You are about to alter the column `tanggal_akad` on the `weddings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.
  - You are about to alter the column `tanggal_resepsi` on the `weddings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.

*/
-- AlterTable
ALTER TABLE `weddings` ADD COLUMN `jam_akad` VARCHAR(191) NULL,
    ADD COLUMN `jam_resepsi` VARCHAR(191) NULL,
    MODIFY `tanggal_akad` DATE NOT NULL,
    MODIFY `tanggal_resepsi` DATE NOT NULL;
