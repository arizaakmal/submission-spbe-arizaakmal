import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCarts = async (req, res) => {
  try {
    const carts = await prisma.cart.findMany({
      include: {
        items: {
          select: {
            id: true,
            books_product_id: true,
            quantity: true,
            created_at: true,
            product: {
              select: {
                book: {
                  select: {
                    title: true,
                  },
                },
                format: true,
                price: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ error: "Failed to fetch carts" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { books_product_id, quantity } = req.body;

    const userId = req.user.id;

    let cart = await prisma.cart.findFirst({
      where: { customer_id: userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          customer_id: userId,
          created_at: new Date(),
        },
      });
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        cart_id: cart.id,
        books_product_id,
        quantity,
        created_at: new Date(),
      },
    });

    res.status(201).json({
      id: cartItem.id,
      cart_id: cartItem.cart_id,
      books_product_id: cartItem.books_product_id,
      quantity: cartItem.quantity,
      created_at: cartItem.created_at,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

