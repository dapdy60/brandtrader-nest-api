-- CreateTable
CREATE TABLE "BatchCodeDecodingResult" (
    "id" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT,
    "lastModificationTime" TIMESTAMP(3),
    "lastModifierId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deleterId" TEXT,
    "deletionTime" TIMESTAMP(3),
    "inputBatchCode" TEXT NOT NULL,
    "responseDictionaryJson" TEXT NOT NULL,
    "usedSmartLookup" BOOLEAN NOT NULL,
    "brandId" TEXT NOT NULL,
    "batchCodeCalculationFormularId" TEXT,
    "userDetailsId" TEXT,

    CONSTRAINT "BatchCodeDecodingResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchCodeFormular" (
    "id" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT,
    "lastModificationTime" TIMESTAMP(3),
    "lastModifierId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deleterId" TEXT,
    "deletionTime" TIMESTAMP(3),
    "manufacturerId" TEXT NOT NULL,
    "decodeFunctionShortName" TEXT NOT NULL,
    "decodeFunctionFullName" TEXT NOT NULL,
    "exampleImageURL" TEXT NOT NULL,
    "exampleInput" TEXT NOT NULL,
    "decodeFunctionType" TEXT NOT NULL,

    CONSTRAINT "BatchCodeFormular_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDetails" (
    "id" TEXT NOT NULL,
    "usedMainPlatform" BOOLEAN NOT NULL,
    "platformDetails" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "additionalLocationDetails" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT,
    "lastModificationTime" TIMESTAMP(3),
    "lastModifierId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deleterId" TEXT,
    "deletionTime" TIMESTAMP(3),
    "manufacturerId" TEXT,
    "fullName" TEXT NOT NULL,
    "standardName" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT,
    "lastModificationTime" TIMESTAMP(3),
    "lastModifierId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deleterId" TEXT,
    "deletionTime" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFeedback" (
    "id" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT,
    "lastModificationTime" TIMESTAMP(3),
    "lastModifierId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deleterId" TEXT,
    "deletionTime" TIMESTAMP(3),
    "feedbackType" TEXT NOT NULL,
    "feedbackMessage" TEXT NOT NULL,
    "feedbackSubject" TEXT NOT NULL,
    "feedbackResponse" TEXT NOT NULL,
    "feedbackResponseTime" TIMESTAMP(3) NOT NULL,
    "feedbackResponseUserDetailsId" TEXT,
    "rating" INTEGER NOT NULL,
    "isResolved" BOOLEAN NOT NULL,
    "resolvedBy" TEXT,
    "resolvedTime" TIMESTAMP(3),
    "resolvedMessage" TEXT,

    CONSTRAINT "UserFeedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BatchCodeDecodingResult" ADD CONSTRAINT "BatchCodeDecodingResult_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchCodeDecodingResult" ADD CONSTRAINT "BatchCodeDecodingResult_batchCodeCalculationFormularId_fkey" FOREIGN KEY ("batchCodeCalculationFormularId") REFERENCES "BatchCodeFormular"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchCodeDecodingResult" ADD CONSTRAINT "BatchCodeDecodingResult_userDetailsId_fkey" FOREIGN KEY ("userDetailsId") REFERENCES "UserDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchCodeFormular" ADD CONSTRAINT "BatchCodeFormular_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFeedback" ADD CONSTRAINT "UserFeedback_feedbackResponseUserDetailsId_fkey" FOREIGN KEY ("feedbackResponseUserDetailsId") REFERENCES "UserDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
