import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ProductRouter from "./routes/barang.js";
import UserRouter from "./routes/user.js";
import PerusahaanRouter from "./routes/perusahaan.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

const app = express();
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API FOR SINGLE SERVICE",
      version: "1.0.0",
      description: "API documentation for single-service",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        LoginRequest: {
          type: "object",
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
          required: ["username", "password"],
        },
        LoginResponse: {
          type: "object",
          properties: {
            status: { type: "string" },
            message: { type: "string" },
            data: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  properties: {
                    username: { type: "string" },
                    name: { type: "string" },
                  },
                },
                token: { type: "string" },
              },
            },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            status: { type: "string" },
            message: { type: "string" },
            data: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  properties: {
                    username: { type: "string" },
                    name: { type: "string" },
                  },
                },
              },
            },
          },
        },
        Barang: {
          type: "object",
          properties: {
            id: { type: "string" },
            nama: { type: "string" },
            harga: { type: "number" },
            stok: { type: "integer" },
            kode: { type: "string" },
            perusahaan_id: { type: "string" },
          },
        },
        RegisterResponse: {
          type: "object",
          properties: {
            id: { type: "string" },
            username: { type: "string" },
            name: { type: "string" },
          },
        },
        Perusahaan: {
          type: "object",
          properties: {
            id: { type: "string" },
            nama: { type: "string" },
            alamat: { type: "string" },
            no_telp: { type: "string" },
            kode: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use(cors({ origin: true, credentials: "http://localhost:3001" }));
app.use(express.json());
app.use(ProductRouter);
app.use(UserRouter);
app.use(PerusahaanRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server running at port 3001");
});
