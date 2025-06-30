-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('KNOWLEDGE', 'HOSPITAL', 'FINANCE');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('PENDING', 'CONTACTED', 'IN_DISCUSSION', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "_BlogPostTags" ADD CONSTRAINT "_BlogPostTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_BlogPostTags_AB_unique";

-- AlterTable
ALTER TABLE "_CourseToRelatedCourses" ADD CONSTRAINT "_CourseToRelatedCourses_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CourseToRelatedCourses_AB_unique";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "curriculum" JSONB;

-- CreateTable
CREATE TABLE "partners" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" "PartnerType" NOT NULL,
    "logo" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "established" VARCHAR(4) NOT NULL,
    "location" VARCHAR(200) NOT NULL,
    "website" VARCHAR(300) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "specialties" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_inquiries" (
    "id" SERIAL NOT NULL,
    "hospitalName" VARCHAR(200) NOT NULL,
    "contactName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "designation" VARCHAR(100) NOT NULL,
    "hospitalBedCount" VARCHAR(20) NOT NULL,
    "purposeForCollaboration" VARCHAR(100) NOT NULL,
    "message" TEXT,
    "status" "InquiryStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "partners_type_idx" ON "partners"("type");

-- CreateIndex
CREATE INDEX "partners_name_idx" ON "partners"("name");

-- CreateIndex
CREATE INDEX "partners_isActive_idx" ON "partners"("isActive");

-- CreateIndex
CREATE INDEX "partner_inquiries_status_idx" ON "partner_inquiries"("status");

-- CreateIndex
CREATE INDEX "partner_inquiries_createdAt_idx" ON "partner_inquiries"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_courseId_key" ON "CartItem"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
