/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `UXPattern` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UXPattern_title_key" ON "UXPattern"("title");
