import express from "express";
import { register, login, getUsers } from "../controllers/user.js";
import verifyToken from "../middlewares/authMiddleware.js";

const UserRouter = express.Router();

UserRouter.get("/self", verifyToken, getUsers);
UserRouter.post("/register", register);
UserRouter.post("/login", login);

export default UserRouter;
