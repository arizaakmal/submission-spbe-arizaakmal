# Online Bookstore

This application is an online bookstore API built with Node.js, PostgreSQL, and Prisma ORM. It provides features such as user authentication, shopping cart management, and invoice generation.

## How to Run

### Prerequisites

- Ensure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

### Steps

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd submission-spbe-arizaakmal
   ```

2. **Build and Run the Application**: Run the following command to build and start the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. **Access the Application**:

- The application will be available at `http://localhost:3000/`
- PostgreSQL database will be accessible at `http://localhost:5432/` with the username `postgres` and password `password`

## API Documentation

Complete API documentation is available at the following link: <a href="https://documenter.getpostman.com/view/29771405/2sB2jAb7zF" target="_blank">API Documentation</a>

## Notes

- Ensure the `.env` file is properly configured before running the application.
- Use `docker-compose down` to stop all containers after you are done using the application.
