/*
  Warnings:

  - A unique constraint covering the columns `[templateId]` on the table `weddings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `templateId` to the `weddings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `weddings` ADD COLUMN `templateId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `weddings_templateId_key` ON `weddings`(`templateId`);

-- AddForeignKey
ALTER TABLE `weddings` ADD CONSTRAINT `weddings_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `templates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
