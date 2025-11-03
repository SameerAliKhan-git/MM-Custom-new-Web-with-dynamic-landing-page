-- CreateTable
CREATE TABLE "PartnershipInquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "partnerType" TEXT NOT NULL CHECK("partnerType" IN ('CORPORATE', 'INSTITUTIONAL')),
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handled" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT
);

-- CreateIndex
CREATE INDEX "PartnershipInquiry_email_idx" ON "PartnershipInquiry"("email");

-- CreateIndex
CREATE INDEX "PartnershipInquiry_handled_idx" ON "PartnershipInquiry"("handled");

-- CreateIndex
CREATE INDEX "PartnershipInquiry_createdAt_idx" ON "PartnershipInquiry"("createdAt");
