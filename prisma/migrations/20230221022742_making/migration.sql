/*
  Warnings:

  - You are about to drop the column `accountId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[debitedAccountId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `balance` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_accountId_fkey";

-- AlterTable
ALTER TABLE "Accounts" ADD COLUMN     "balance" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountId";

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_debitedAccountId_key" ON "Transactions"("debitedAccountId");
