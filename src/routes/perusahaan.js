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
/**
 * @swagger
 * /perusahaan:
 *   get:
 *     summary: Get perusahaan (optional berdasarkan nama perusahaan  dan kode perusahaan)
 *     description: Get list of perusahaan
 *     parameters:
 *       - in: query
 *         name: q
 *         description: Search parameter for nama and kode.
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
 *                      $ref: '#/components/schemas/Perusahaan'
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
PerusahaanRouter.get("/perusahaan", verifyToken, getPerusahaan);
/**
 * @swagger
 * /perusahaan/{id}:
 *   get:
 *     summary: Get perusahaan by id
 *     description: Get perusahaan berdasarkan id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id perusahaan yang ingin ditampilkan
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
 *                      $ref: '#/components/schemas/Perusahaan'
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
PerusahaanRouter.get("/perusahaan/:id", verifyToken, getPerusahaanById);
/**
 * @swagger
 * /perusahaan:
 *   post:
 *     summary: Create a new perusahaan
 *     description: Creates a new perusahaan with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               alamat:
 *                 type: string
 *               no_telp:
 *                 type: string
 *               kode:
 *                 type: string
 *             required:
 *               - nama
 *               - alamat
 *               - no_telp
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
 *                   $ref: '#/components/schemas/Perusahaan'
 *       400:
 *         description: Invalid Kode Pajak format
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
PerusahaanRouter.post("/perusahaan", verifyToken, createPerusahaan);
/**
 * @swagger
 * /perusahaan/{id}:
 *   post:
 *     summary: Update a perusahaan by id
 *     description: Updates a perusahaan with the provided data by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the perusahaan to update.
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
 *               alamat:
 *                 type: string
 *               no_telp:
 *                 type: string
 *               kode:
 *                 type: string
 *             required:
 *               - nama
 *               - alamat
 *               - no_telp
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
 *                   $ref: '#/components/schemas/Perusahaan'
 *       400:
 *         description: Invalid Kode Pajak format
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
PerusahaanRouter.patch("/perusahaan/:id", verifyToken, updatePerusahaan);
/**
 * @swagger
 * /perusahaan/{id}:
 *   delete:
 *     summary: Delete a perusahaan by id
 *     description: Deletes a perusahaan by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the perusahaan to delete.
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
 *                   $ref: '#/components/schemas/Perusahaan'
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
PerusahaanRouter.delete("/perusahaan/:id", verifyToken, deletePerusahaan);

export default PerusahaanRouter;
