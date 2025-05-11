import express from "express";
import { getAllCarts, addToCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getAllCarts);

router.post("/items", addToCart);

export default router;
