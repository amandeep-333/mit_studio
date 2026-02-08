-- CreateEnum
CREATE TYPE "PrintType" AS ENUM ('regular', 'aop');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('tshirt', 'hoodie', 'tank', 'jacket');

-- CreateEnum
CREATE TYPE "DesignStatus" AS ENUM ('draft', 'saved', 'ordered');

-- CreateTable
CREATE TABLE "Design" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "designImage" TEXT NOT NULL,
    "printType" "PrintType" NOT NULL DEFAULT 'regular',
    "positionX" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "positionY" DOUBLE PRECISION NOT NULL DEFAULT 40,
    "size" DOUBLE PRECISION NOT NULL DEFAULT 30,
    "rotation" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "productType" "ProductType" NOT NULL DEFAULT 'tshirt',
    "color" TEXT NOT NULL DEFAULT 'white',
    "status" "DesignStatus" NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);
