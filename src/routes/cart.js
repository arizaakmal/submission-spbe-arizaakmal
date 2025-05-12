import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { getAllCarts, addToCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", authenticate, getAllCarts);

router.post("/items", authenticate, addToCart);

export default router;
