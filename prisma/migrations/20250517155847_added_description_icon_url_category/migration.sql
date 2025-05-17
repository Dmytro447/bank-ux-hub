-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Категорія UX-патернів',
ADD COLUMN     "iconUrl" TEXT NOT NULL DEFAULT 'https://example.com/default-icon.svg';
