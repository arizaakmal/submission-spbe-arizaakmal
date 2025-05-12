import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { checkout, getAllInvoices } from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/checkout", authenticate, checkout);

router.get("/invoices", authenticate, getAllInvoices);

export default router;
