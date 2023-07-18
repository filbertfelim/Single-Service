-- DropForeignKey
ALTER TABLE "Barang" DROP CONSTRAINT "Barang_kode_fkey";

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_perusahaan_id_fkey" FOREIGN KEY ("perusahaan_id") REFERENCES "Perusahaan"("kode") ON DELETE CASCADE ON UPDATE CASCADE;
