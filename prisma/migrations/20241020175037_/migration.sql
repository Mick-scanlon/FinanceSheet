/*
  Warnings:

  - You are about to drop the column `amount_tax` on the `income` table. All the data in the column will be lost.
  - Added the required column `amount_post` to the `income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_pre` to the `income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "income" DROP COLUMN "amount_tax",
ADD COLUMN     "amount_post" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "amount_pre" DOUBLE PRECISION NOT NULL;
