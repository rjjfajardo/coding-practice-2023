/*
  Warnings:

  - Added the required column `chosenDate` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "chosenDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
