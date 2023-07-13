import { Router } from "express";
import {
  createBarang,
  updateBarang,
  deleteBarang,
  getBarang,
  getBarangById,
} from "../controllers/barang";
import {
  createPerusahaan,
  updatePerusahaan,
  deletePerusahaan,
  getPerusahaan,
  getPerusahaanById,
} from "../controllers/perusahaan";
import { loginAdmin } from "../controllers/auth";
import { authenticateAdmin } from "../middlewares/authenticateAdmin";

const router = Router();

// Barang Endpoints
router.post("/barang", authenticateAdmin, createBarang);
router.put("/barang/:id", authenticateAdmin, updateBarang);
router.delete("/barang/:id", authenticateAdmin, deleteBarang);
router.get("/barang", getBarang);
router.get("/barang/:id", getBarangById);

// Perusahaan Endpoints
router.post("/perusahaan", authenticateAdmin, createPerusahaan);
router.put("/perusahaan/:id", authenticateAdmin, updatePerusahaan);
router.delete("/perusahaan/:id", authenticateAdmin, deletePerusahaan);
router.get("/perusahaan", getPerusahaan);
router.get("/perusahaan/:id", getPerusahaanById);

// Login Admin Endpoint
router.post("/login", loginAdmin);

export default router;
