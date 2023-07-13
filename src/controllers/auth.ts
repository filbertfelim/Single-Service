import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Login Admin
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validasi username dan password
    if (username !== "admin" || password !== "password") {
      return res
        .status(401)
        .json({ status: "error", message: "Username atau password salah." });
    }

    // Generate JWT token
    const token = generateToken(req, res);

    res.json({
      status: "success",
      message: "Login berhasil.",
      data: {
        user: { username: "admin", name: "Admin" },
        token,
      },
    });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat login admin.",
    });
  }
};

// Function untuk generate JWT token
const generateToken = (req: Request, res: Response) => {
  // Definisikan payload yang akan dimasukkan ke dalam token
  const { username, password } = req.body;
  const payload = {
    // Informasi tambahan yang ingin Anda sertakan dalam token, misalnya ID pengguna, peran, dll.
    // Anda dapat menyesuaikan payload sesuai kebutuhan aplikasi Anda
    username: "admin",
    name: "admin",
  };

  // Kunci rahasia yang digunakan untuk menandatangani token
  const secretKey = "yourSecretKey"; // Ganti dengan kunci rahasia yang lebih aman

  // Waktu kedaluwarsa token (opsional)
  const expiresIn = "1h"; // Token akan kedaluwarsa setelah 1 jam

  // Hasilkan token menggunakan fungsi sign dari library jsonwebtoken
  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};
