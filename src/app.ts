import express, { Application, Request, Response } from "express";
import apiRoutes from "./routes/api";

const app: Application = express();

app.use(express.json());

app.use("/api", apiRoutes);

// Handler untuk rute tidak ditemukan
// app.use((req: Request, res: Response) => {
//   res.status(404).json({ message: "Route not found" });
// });

app.use("/login", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  // Handle the login request and send the response
});

export default app;
