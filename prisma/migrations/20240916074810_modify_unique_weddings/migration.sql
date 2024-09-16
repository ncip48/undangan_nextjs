/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `weddings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `weddings_username_key` ON `weddings`(`username`);
