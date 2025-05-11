import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.bookProduct.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.warehouse.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.cartItem.deleteMany();

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
      author_id: author1.id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "A Game of Thrones",
      isbn: "9780553593716",
      publication_year: 1996,
      genre: "Fantasy",
      author_id: author2.id,
    },
  });

  // Seed Warehouse
  const warehouse = await prisma.warehouse.create({
    data: {
      name: "Gudang Jakarta",
      location: "Jakarta",
      capacity: 1000,
    },
  });

  // Seed Book Products
  await prisma.bookProduct.createMany({
    data: [
      {
        format: "hardcover",
        price: 350000,
        stock: 12,
        warehouse_id: warehouse.id,
        book_id: book1.id,
      },
      {
        format: "paperback",
        price: 150000,
        stock: 20,
        warehouse_id: warehouse.id,
        book_id: book2.id,
      },
    ],
  });

  // Seed Customer
  const customer1 = await prisma.customer.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      address: "123 Main St",
      phone: "081234567890",
    },
  });

  //Seed Cart
  await prisma.cart.create({
    data: {
      customer_id: customer1.id,
      created_at: new Date(),
    },
  });

  //Seed Cart Items
  const cart = await prisma.cart.findFirst();

  const bookProduct1 = await prisma.bookProduct.findFirst();
  const bookProduct2 = await prisma.bookProduct.findFirst({ skip: 1 });

 await prisma.cartItem.createMany({
  data: [
    {
      cart_id: cart.id, 
      books_product_id: bookProduct1.id,
      quantity: 2,
    },
    {
      cart_id: cart.id,
      books_product_id: bookProduct2.id,
      quantity: 1,
    },
  ],
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
