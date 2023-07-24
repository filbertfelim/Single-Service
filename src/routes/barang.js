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
/**
 * @swagger
 * /barang:
 *   get:
 *     summary: Get barang (optional berdasarkan nama barang , kode barang, dan kode perusahaan)
 *     description: Get list of barang
 *     parameters:
 *       - in: query
 *         name: q
 *         description: Search parameter for nama and kode.
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: perusahaan
 *         description: Filter by perusahaan id.
 *         required: false
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/Barang'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   example : null
 *                   nullable: true
 */
ProductRouter.get("/barang", verifyToken, getBarang);
/**
 * @swagger
 * /barang/{id}:
 *   get:
 *     summary: Get barang by id
 *     description: Get barang berdasarkan id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id barang yang ingin ditampilkan
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/Barang'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   example : null
 *                   nullable: true
 */
ProductRouter.get("/barang/:id", verifyToken, getBarangById);
/**
 * @swagger
 * /barang:
 *   post:
 *     summary: Create a new barang
 *     description: Creates a new barang with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               harga:
 *                 type: integer
 *               stok:
 *                 type: integer
 *               perusahaan_id:
 *                 type: string
 *               kode:
 *                 type: string
 *             required:
 *               - nama
 *               - harga
 *               - stok
 *               - perusahaan_id
 *               - kode
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success, error]
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Barang'
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   example : null
 *                   nullable: true
 */
ProductRouter.post("/barang", verifyToken, createBarang);
/**
 * @swagger
 * /barang/{id}:
 *   post:
 *     summary: Update a barang by id
 *     description: Updates a barang with the provided data by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the barang to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               harga:
 *                 type: integer
 *               stok:
 *                 type: integer
 *               perusahaan_id:
 *                 type: string
 *               kode:
 *                 type: string
 *             required:
 *               - nama
 *               - harga
 *               - stok
 *               - perusahaan_id
 *               - kode
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success, error]
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Barang'
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   example : null
 *                   nullable: true
 */
ProductRouter.post("/barang/:id", verifyToken, updateBarang);
/**
 * @swagger
 * /barang/{id}:
 *   delete:
 *     summary: Delete a barang by id
 *     description: Deletes a barang by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the barang to delete.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success, error]
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Barang'
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   example : null
 *                   nullable: true
 */
ProductRouter.delete("/barang/:id", verifyToken, deleteBarang);
export default ProductRouter;
