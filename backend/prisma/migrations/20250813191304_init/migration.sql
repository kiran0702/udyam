-- CreateTable
CREATE TABLE "public"."RegistrationStep1" (
    "id" SERIAL NOT NULL,
    "aadhaarNumber" TEXT NOT NULL,
    "entrepreneurName" TEXT NOT NULL,
    "consentGiven" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistrationStep1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RegistrationStep2" (
    "id" SERIAL NOT NULL,
    "registrationStep1Id" INTEGER NOT NULL,
    "panNumber" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistrationStep2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationStep1_aadhaarNumber_key" ON "public"."RegistrationStep1"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationStep2_panNumber_key" ON "public"."RegistrationStep2"("panNumber");

-- AddForeignKey
ALTER TABLE "public"."RegistrationStep2" ADD CONSTRAINT "RegistrationStep2_registrationStep1Id_fkey" FOREIGN KEY ("registrationStep1Id") REFERENCES "public"."RegistrationStep1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
