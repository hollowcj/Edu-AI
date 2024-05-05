/*
  Warnings:

  - You are about to drop the column `email` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the column `pfpurl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_ownerId_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "email",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pfpurl",
DROP COLUMN "profilePicture";

-- DropTable
DROP TABLE "Image";
