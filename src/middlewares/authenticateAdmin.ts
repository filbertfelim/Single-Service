import { Request, Response, NextFunction } from "express";

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementasi logika otentikasi admin di sini
  // Panggil next() jika otentikasi berhasil
};
