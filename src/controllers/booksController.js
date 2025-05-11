import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        isbn: true,
        publication_year: true,
        genre: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        isbn: true,
        publication_year: true,
        genre: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        products: {
          select: {
            id: true,
            format: true,
            price: true,
            stock: true,
            warehouse: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch book" });
  }
};
