import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { getAllBooks } from "../controllers/booksController.js";
import { getBookById } from "../controllers/booksController.js";

const router = express.Router();

router.get("/", authenticate, getAllBooks);

router.get("/:id", authenticate, getBookById);

export default router;