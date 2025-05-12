import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await prisma.cart.findFirst({
      where: { customer_id: userId },
      include: {
        items: {
          select: {
            id: true,
            books_product_id: true,
            quantity: true,
            product: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ error: "Cart is empty or not found" });
    }

    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);

    const invoice = await prisma.invoice.create({
      data: {
        cart_id: cart.id,
        customer_id: userId,
        total_amount: totalAmount,
        status: "pending",
        issued_at: new Date(),
      },
    });

    await prisma.cartItem.deleteMany({
      where: { cart_id: cart.id },
    });

    res.status(200).json({
      invoice_id: invoice.id,
      status: invoice.status,
      total_amount: invoice.total_amount,
      issued_at: invoice.issued_at,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "Failed to process checkout" });
  }
};

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      select: {
        id: true,
        cart_id: true,
        total_amount: true,
        status: true,
        issued_at: true,
      },
    });

    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};