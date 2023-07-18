-- DropForeignKey
ALTER TABLE "Barang" DROP CONSTRAINT "Barang_perusahaan_id_fkey";

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_kode_fkey" FOREIGN KEY ("kode") REFERENCES "Perusahaan"("kode") ON DELETE CASCADE ON UPDATE CASCADE;
