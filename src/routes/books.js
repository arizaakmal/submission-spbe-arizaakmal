import express from "express";
import { getAllBooks } from "../controllers/booksController.js";
import { getBookById } from "../controllers/booksController.js";

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getBookById);

export default router;