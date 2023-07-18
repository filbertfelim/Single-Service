import express from "express";
import {
  getPerusahaan,
  getPerusahaanById,
  createPerusahaan,
  updatePerusahaan,
  deletePerusahaan,
} from "../controllers/perusahaan.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const PerusahaanRouter = express.Router();

PerusahaanRouter.get("/perusahaan", verifyToken, getPerusahaan);
PerusahaanRouter.get("/perusahaan/:id", verifyToken, getPerusahaanById);
PerusahaanRouter.post("/perusahaan", verifyToken, createPerusahaan);
PerusahaanRouter.patch("/perusahaan/:id", verifyToken, updatePerusahaan);
PerusahaanRouter.delete("/perusahaan/:id", verifyToken, deletePerusahaan);

export default PerusahaanRouter;
