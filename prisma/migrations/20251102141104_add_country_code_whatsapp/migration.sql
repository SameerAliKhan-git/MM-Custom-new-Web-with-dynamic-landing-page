-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PartnershipInquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL DEFAULT '+91',
    "whatsapp" TEXT,
    "company" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "partnerType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handled" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT
);
INSERT INTO "new_PartnershipInquiry" ("address", "company", "createdAt", "email", "handled", "id", "name", "notes", "partnerType", "phone") SELECT "address", "company", "createdAt", "email", "handled", "id", "name", "notes", "partnerType", "phone" FROM "PartnershipInquiry";
DROP TABLE "PartnershipInquiry";
ALTER TABLE "new_PartnershipInquiry" RENAME TO "PartnershipInquiry";
PRAGMA foreign_keys=ON;
