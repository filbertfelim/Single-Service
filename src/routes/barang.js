import express from "express";
import {
  getBarang,
  getBarangById,
  createBarang,
  updateBarang,
  deleteBarang,
} from "../controllers/barang.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const ProductRouter = express.Router();

ProductRouter.get("/barang", verifyToken, getBarang);
ProductRouter.get("/barang/:id", verifyToken, getBarangById);
ProductRouter.post("/barang", verifyToken, createBarang);
ProductRouter.post("/barang/:id", verifyToken, updateBarang);
ProductRouter.delete("/barang/:id", verifyToken, deleteBarang);

export default ProductRouter;
