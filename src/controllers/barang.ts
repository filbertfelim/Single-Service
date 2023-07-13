import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Barang
export const createBarang = async (req: Request, res: Response) => {
  try {
    // Dapatkan data barang dari body request
    const { nama, harga, stok, perusahaan_id, kode } = req.body;

    // Cek apakah kode barang sudah ada di basis data
    const existingBarang = await prisma.barang.findUnique({ where: { kode } });
    if (existingBarang) {
      return res
        .status(400)
        .json({ status: "error", message: "Kode barang sudah digunakan." });
    }

    // Simpan data barang ke basis data
    const barang = await prisma.barang.create({
      data: { nama, harga, stok, perusahaan_id, kode },
    });

    res.status(201).json({
      status: "success",
      message: "Barang berhasil ditambahkan.",
      data: barang,
    });
  } catch (error) {
    console.error("Error creating barang:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat menambahkan barang.",
    });
  }
};

// Update Barang
export const updateBarang = async (req: Request, res: Response) => {
  try {
    // Dapatkan data barang yang ingin diupdate dari body request
    const { nama, harga, stok, perusahaan_id, kode } = req.body;
    const { id } = req.params;

    // Cek apakah barang dengan ID tersebut ada di basis data
    const existingBarang = await prisma.barang.findUnique({ where: { id } });
    if (!existingBarang) {
      return res
        .status(404)
        .json({ status: "error", message: "Barang tidak ditemukan." });
    }

    // Update data barang
    const updatedBarang = await prisma.barang.update({
      where: { id },
      data: { nama, harga, stok, perusahaan_id, kode },
    });

    res.json({
      status: "success",
      message: "Barang berhasil diperbarui.",
      data: updatedBarang,
    });
  } catch (error) {
    console.error("Error updating barang:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat memperbarui barang.",
    });
  }
};

// Delete Barang
export const deleteBarang = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Cek apakah barang dengan ID tersebut ada di basis data
    const existingBarang = await prisma.barang.findUnique({ where: { id } });
    if (!existingBarang) {
      return res
        .status(404)
        .json({ status: "error", message: "Barang tidak ditemukan." });
    }

    // Hapus data barang
    await prisma.barang.delete({ where: { id } });

    res.json({
      status: "success",
      message: "Barang berhasil dihapus.",
      data: existingBarang,
    });
  } catch (error) {
    console.error("Error deleting barang:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat menghapus barang.",
    });
  }
};

// Get All Barang
export const getBarang = async (req: Request, res: Response) => {
  try {
    const { q, perusahaan } = req.query;

    // Query basis data untuk mendapatkan daftar barang
    const barangs = await prisma.barang.findMany({
      where: {
        OR: [
          { nama: { contains: q || "", mode: "insensitive" } },
          { kode: { contains: q || "", mode: "insensitive" } },
        ],
        perusahaan: {
          nama: { contains: perusahaan || "", mode: "insensitive" },
        },
      },
    });

    res.json({
      status: "success",
      message: "Data barang ditemukan.",
      data: barangs,
    });
  } catch (error) {
    console.error("Error getting barang:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat mendapatkan data barang.",
    });
  }
};

// Get Barang by ID
export const getBarangById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Dapatkan barang berdasarkan ID dari basis data
    const barang = await prisma.barang.findUnique({ where: { id } });

    if (!barang) {
      return res
        .status(404)
        .json({ status: "error", message: "Barang tidak ditemukan." });
    }

    res.json({ status: "success", message: "Barang ditemukan.", data: barang });
  } catch (error) {
    console.error("Error getting barang by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat mendapatkan data barang.",
    });
  }
};
