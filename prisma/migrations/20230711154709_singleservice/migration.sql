-- CreateTable
CREATE TABLE "Barang" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "kode" TEXT NOT NULL,
    "perusahaan_id" INTEGER NOT NULL,

    CONSTRAINT "Barang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perusahaan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,
    "kode" TEXT NOT NULL,

    CONSTRAINT "Perusahaan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_perusahaan_id_fkey" FOREIGN KEY ("perusahaan_id") REFERENCES "Perusahaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
