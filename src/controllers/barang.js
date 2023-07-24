import prisma from "../prisma.js";

export const getBarang = async (req, res) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      const q = req.query.q;
      const p = req.query.perusahaan;
      if (q || p) {
        if (q && p) {
          const response = await prisma.barang.findMany({
            where: {
              OR: [{ nama: q }, { kode: q }],
              perusahaan_id: p,
            },
          });
          res.status(200).json({
            status: "success",
            message: "Success!",
            data: response,
          });
        } else if (q) {
          const response = await prisma.barang.findMany({
            where: {
              OR: [{ nama: q }, { kode: q }],
            },
          });
          res.status(200).json({
            status: "success",
            message: "Success!",
            data: response,
          });
        } else if (p) {
          const response = await prisma.barang.findMany({
            where: {
              perusahaan_id: p,
            },
          });
          res.status(200).json({
            status: "success",
            message: "Success!",
            data: response,
          });
        }
      }
    } else {
      const response = await prisma.barang.findMany();
      res.status(200).json({
        status: "success",
        message: "Success!",
        data: response,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};

export const getBarangById = async (req, res) => {
  try {
    const response = await prisma.barang.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Success!",
      data: response,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};

export const createBarang = async (req, res) => {
  const { nama, harga, stok, perusahaan_id, kode } = req.body;
  if (harga <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Invalid nilai harga, harga harus > 0",
      data: null,
    });
  } else if (stok < 0) {
    return res.status(400).json({
      status: "error",
      message: "Invalid nilai stok, stok harus >= 0",
      data: null,
    });
  }
  try {
    const barang = await prisma.barang.create({
      data: {
        nama: nama,
        harga: harga,
        stok: stok,
        kode: kode,
        perusahaan_id: perusahaan_id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Create barang success!",
      data: barang,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: error.message, data: null });
  }
};
export const updateBarang = async (req, res) => {
  const { nama, harga, stok, perusahaan_id, kode } = req.body;
  if (harga <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Invalid nilai harga, harga harus > 0",
      data: null,
    });
  } else if (stok < 0) {
    return res.status(400).json({
      status: "error",
      message: "Invalid nilai stok, stok harus >= 0",
      data: null,
    });
  }
  try {
    const barang = await prisma.barang.update({
      where: {
        id: req.params.id,
      },
      data: {
        nama: nama,
        harga: harga,
        stok: stok,
        kode: kode,
        perusahaan_id: perusahaan_id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Update barang success!",
      data: barang,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: error.message, data: null });
  }
};

export const deleteBarang = async (req, res) => {
  try {
    const product = await prisma.barang.findUnique({
      where: {
        id: req.params.id,
      },
    });
    await prisma.barang.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Delete barang success!",
      data: {
        id: product.id,
        nama: product.nama,
        harga: product.harga,
        stok: product.stok,
        kode: product.kode,
        perusahaan_id: product.perusahaan_id,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: error.message, data: null });
  }
};
