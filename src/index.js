import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import booksRoutes from "./routes/books.js";
import cartRoutes from "./routes/cart.js";
import invoiceRoutes from "./routes/invoice.js";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

dotenv.config();
const app = express();
const prisma = new PrismaClient().$extends(withAccelerate());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

app.use("/auth", authRoutes);
app.use("/books", booksRoutes);
app.use("/cart", cartRoutes);
app.use("/", invoiceRoutes);

app.get("/", (req, res) => {
  res.send("Online Bookstore");
});
