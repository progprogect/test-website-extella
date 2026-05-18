-- CreateTable
CREATE TABLE "webinar_leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webinar_leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "webinar_leads_createdAt_idx" ON "webinar_leads"("createdAt");
