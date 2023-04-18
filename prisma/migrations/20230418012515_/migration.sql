-- AlterTable
ALTER TABLE "User" ALTER COLUMN "activation_code" DROP NOT NULL,
ALTER COLUMN "login_code" DROP NOT NULL;
