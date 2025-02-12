/*
  Warnings:

  - You are about to drop the column `url` on the `GithubUser` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `PullRequest` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Repository` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "UserType" ADD VALUE 'Bot';

-- AlterTable
ALTER TABLE "GithubUser" DROP COLUMN "url";

-- AlterTable
ALTER TABLE "PullRequest" DROP COLUMN "body";

-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
DROP COLUMN "url";
