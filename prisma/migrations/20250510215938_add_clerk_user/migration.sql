/*
  Warnings:

  - You are about to drop the column `description` on the `UXFlow` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UXFlow" DROP CONSTRAINT "UXFlow_authorId_fkey";

-- AlterTable
ALTER TABLE "UXFlow" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "role",
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("clerkId");

-- AddForeignKey
ALTER TABLE "UXFlow" ADD CONSTRAINT "UXFlow_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
