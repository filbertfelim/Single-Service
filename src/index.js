import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ProductRouter from "./routes/barang.js";
import UserRouter from "./routes/user.js";
import PerusahaanRouter from "./routes/perusahaan.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(ProductRouter);
app.use(UserRouter);
app.use(PerusahaanRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server running at port 3001");
});
