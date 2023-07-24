import prisma from "../prisma.js";

export const getPerusahaan = async (req, res) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      const q = req.query.q;
      const response = await prisma.perusahaan.findMany({
        where: {
          OR: [{ nama: q }, { kode: q }],
        },
      });
      res.status(200).json({
        status: "success",
        message: "Success!",
        data: response,
      });
    } else {
      const perusahaan = await prisma.perusahaan.findMany();
      res.status(200).json({
        status: "success",
        message: "Success!",
        data: perusahaan,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};

export const getPerusahaanById = async (req, res) => {
  try {
    const response = await prisma.perusahaan.findUnique({
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

export const createPerusahaan = async (req, res) => {
  const { nama, alamat, no_telp, kode } = req.body;

  // Validate kodePajak format (3 uppercase letters)
  const kodeRegex = /^[A-Z]{3}$/;
  if (!kodeRegex.test(kode)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Kode Pajak format. Must be 3 uppercase letters.",
      data: null,
    });
  }

  try {
    const perusahaan = await prisma.perusahaan.create({
      data: {
        nama: nama,
        alamat: alamat,
        no_telp: no_telp,
        kode: kode,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Create perusahaan success!",
      data: perusahaan,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};

export const updatePerusahaan = async (req, res) => {
  const { nama, alamat, no_telp, kode } = req.body;

  // Validate kodePajak format (3 uppercase letters)
  const kodeRegex = /^[A-Z]{3}$/;
  if (kode && !kodeRegex.test(kode)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Kode Pajak format. Must be 3 uppercase letters.",
      data: null,
    });
  }

  try {
    const perusahaan = await prisma.perusahaan.update({
      where: { id: req.params.id },
      data: {
        nama: nama,
        alamat: alamat,
        no_telp: no_telp,
        kode: kode,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Update perusahaan success!",
      data: perusahaan,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};

export const deletePerusahaan = async (req, res) => {
  try {
    const perusahaan = await prisma.perusahaan.findUnique({
      where: {
        id: req.params.id,
      },
    });
    await prisma.perusahaan.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({
      status: "success",
      message: "Delete perusahaan success!",
      data: perusahaan,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};
