/*
  Warnings:

  - You are about to drop the column `amount_net` on the `income` table. All the data in the column will be lost.
  - Added the required column `amount_tax` to the `income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "income" DROP COLUMN "amount_net",
ADD COLUMN     "amount_tax" DOUBLE PRECISION NOT NULL;
