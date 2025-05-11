import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import booksRoutes from "./routes/books.js";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URL = process.env.URL || "http://localhost";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${URL}:${PORT}`));

app.use("/auth", authRoutes);
app.use("/books", booksRoutes);

app.get("/", (req, res) => {
  res.send("Online Bookstore");
});


