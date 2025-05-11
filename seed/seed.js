import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.bookProduct.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.warehouse.deleteMany();

  // Seed Authors
  const author1 = await prisma.author.create({
    data: {
      name: "Robert C. Martin",
      bio: "Robert C. Martin, also known as Uncle Bob, is a software engineer and author known for his work in software craftsmanship and agile development.",
      birthdate: new Date("1952-12-05"),
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: "George R.R. Martin",
      bio: "George R.R. Martin is an American novelist and short story writer, best known for his series of epic fantasy novels, A Song of Ice and Fire.",
      birthdate: new Date("1948-09-20"),
    },
  });

  // Seed Books
  const book1 = await prisma.book.create({
    data: {
      title: "Clean Code",
      isbn: "9780132350884",
      publication_year: 2008,
      genre: "Programming",
      authorId: author1.id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "A Game of Thrones",
      isbn: "9780553593716",
      publication_year: 1996,
      genre: "Fantasy",
      authorId: author2.id,
    },
  });

  // Seed Warehouse
    const warehouse = await prisma.warehouse.create({
      data: { 
        name: 'Gudang Jakarta',
        location: 'Jakarta',
        capacity: 1000,
     }
    });

  // Seed Book Products
    await prisma.bookProduct.createMany({
      data: [
        {
          format: 'hardcover',
          price: 350000,
          stock: 12,
          warehouseId: warehouse.id,
          bookId: book1.id
        },
        {
          format: 'paperback',
          price: 150000,
          stock: 20,
          warehouseId: warehouse.id,
          bookId: book2.id
        }
      ]
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
