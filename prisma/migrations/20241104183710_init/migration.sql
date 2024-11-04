-- CreateTable
CREATE TABLE "Collage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoOrder" INTEGER[],

    CONSTRAINT "Collage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CollagePhotos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Collage_name_key" ON "Collage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_url_key" ON "Photo"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_CollagePhotos_AB_unique" ON "_CollagePhotos"("A", "B");

-- CreateIndex
CREATE INDEX "_CollagePhotos_B_index" ON "_CollagePhotos"("B");

-- AddForeignKey
ALTER TABLE "_CollagePhotos" ADD CONSTRAINT "_CollagePhotos_A_fkey" FOREIGN KEY ("A") REFERENCES "Collage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollagePhotos" ADD CONSTRAINT "_CollagePhotos_B_fkey" FOREIGN KEY ("B") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
