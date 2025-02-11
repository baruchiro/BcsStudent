-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "githubUsername" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
