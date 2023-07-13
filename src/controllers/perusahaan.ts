import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Perusahaan
export const createPerusahaan = async (req: Request, res: Response) => {
  try {
    // Dapatkan data perusahaan dari body request
    const { nama, alamat, no_telp, kode } = req.body;

    // Validasi kode pajak
    const kodeRegex = /^[A-Z]{3}$/;
    if (!kodeRegex.test(kode)) {
      return res.status(400).json({
        status: "error",
        message: "Kode pajak harus terdiri dari 3 huruf kapital.",
      });
    }

    // Simpan data perusahaan ke basis data
    const perusahaan = await prisma.perusahaan.create({
      data: { nama, alamat, no_telp, kode },
    });

    res.status(201).json({
      status: "success",
      message: "Perusahaan berhasil ditambahkan.",
      data: perusahaan,
    });
  } catch (error) {
    console.error("Error creating perusahaan:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat menambahkan perusahaan.",
    });
  }
};

// Update Perusahaan
export const updatePerusahaan = async (req: Request, res: Response) => {
  try {
    // Dapatkan data perusahaan yang ingin diupdate dari body request
    const { nama, alamat, no_telp, kode } = req.body;
    const { id } = req.params;

    // Cek apakah perusahaan dengan ID tersebut ada di basis data
    const existingPerusahaan = await prisma.perusahaan.findUnique({
      where: { id },
    });
    if (!existingPerusahaan) {
      return res
        .status(404)
        .json({ status: "error", message: "Perusahaan tidak ditemukan." });
    }

    // Validasi kode pajak
    const kodeRegex = /^[A-Z]{3}$/;
    if (!kodeRegex.test(kode)) {
      return res.status(400).json({
        status: "error",
        message: "Kode pajak harus terdiri dari 3 huruf kapital.",
      });
    }

    // Update data perusahaan
    const updatedPerusahaan = await prisma.perusahaan.update({
      where: { id },
      data: { nama, alamat, no_telp, kode },
    });

    res.json({
      status: "success",
      message: "Perusahaan berhasil diperbarui.",
      data: updatedPerusahaan,
    });
  } catch (error) {
    console.error("Error updating perusahaan:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat memperbarui perusahaan.",
    });
  }
};

// Delete Perusahaan
export const deletePerusahaan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Cek apakah perusahaan dengan ID tersebut ada di basis data
    const existingPerusahaan = await prisma.perusahaan.findUnique({
      where: { id },
    });
    if (!existingPerusahaan) {
      return res
        .status(404)
        .json({ status: "error", message: "Perusahaan tidak ditemukan." });
    }

    // Hapus data perusahaan beserta barang yang diproduksi
    await prisma.perusahaan.delete({ where: { id } });

    res.json({
      status: "success",
      message: "Perusahaan berhasil dihapus.",
      data: existingPerusahaan,
    });
  } catch (error) {
    console.error("Error deleting perusahaan:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat menghapus perusahaan.",
    });
  }
};

// Get All Perusahaan
export const getPerusahaan = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    // Query basis data untuk mendapatkan daftar perusahaan
    const perusahaans = await prisma.perusahaan.findMany({
      where: { nama: { contains: q || "", mode: "insensitive" } },
    });

    res.json({
      status: "success",
      message: "Data perusahaan ditemukan.",
      data: perusahaans,
    });
  } catch (error) {
    console.error("Error getting perusahaan:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat mendapatkan data perusahaan.",
    });
  }
};

// Get Perusahaan by ID
export const getPerusahaanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Dapatkan perusahaan berdasarkan ID dari basis data
    const perusahaan = await prisma.perusahaan.findUnique({ where: { id } });

    if (!perusahaan) {
      return res
        .status(404)
        .json({ status: "error", message: "Perusahaan tidak ditemukan." });
    }

    res.json({
      status: "success",
      message: "Perusahaan ditemukan.",
      data: perusahaan,
    });
  } catch (error) {
    console.error("Error getting perusahaan by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat mendapatkan data perusahaan.",
    });
  }
};
