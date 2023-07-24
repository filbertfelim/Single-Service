import express from "express";
import { register, login, getUsers } from "../controllers/user.js";
import verifyToken from "../middlewares/authMiddleware.js";

const UserRouter = express.Router();
/**
 * @swagger
 * /self:
 *   get:
 *     summary: Get users
 *     description: Get list of users.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
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
UserRouter.get("/self", verifyToken, getUsers);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     description: Register a new user with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - name
 *               - confirmPassword
 *     responses:
 *       200:
 *         description: Successful registration
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
 *                   $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Password and Confirm Password don't match!
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
UserRouter.post("/register", register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and generates a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Wrong password
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
 *       404:
 *         description: User not found
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
UserRouter.post("/login", login);

export default UserRouter;
