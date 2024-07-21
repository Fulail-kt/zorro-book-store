Here's a sample `README.md` file for your GitHub repository:


# Online Bookstore

## Project Overview

This project is an online bookstore application developed using the MERN stack (MongoDB, Express.js, React.js/Next.js, Node.js). The application allows users to browse, search, and purchase books. It features user authentication, book management, shopping cart functionality, and order management. The project aims to provide a responsive and user-friendly interface for book enthusiasts.

## Objectives

- Create a responsive and user-friendly interface for browsing and purchasing books.
- Implement user authentication and authorization.
- Ensure data persistence using MongoDB.
- Implement RESTful APIs using Express.js and Node.js.
- Use Next.js for the frontend to provide a dynamic and interactive user experience.

## Tools and Technologies

- **Frontend:** Next.js, Tailwind CSS, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Image Storage:** Firebase
- **Version Control:** Git, GitHub

## Features

### User Authentication
- User registration and login using JWT for authentication.
- Role-based access control (admin, customer).

### Book Management
- Schema for books in MongoDB.
- CRUD APIs for managing books (Create, Read, Update, Delete).

### Shopping Cart and Orders
- Shopping cart feature for users to add, remove, and update items.
- Schema for orders in MongoDB.
- APIs for placing and managing orders.
- Order history page for users.

### Frontend Enhancements
- Search functionality for books.
- Filters for categories, price range, and ratings.
- Responsive and mobile-friendly design.

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- Firebase account for image storage

### Environment Variables
Create a `.env` file in the root of the project with the following variables:

```env
- BACKEND

MONGODB_URI=<your-mongodb-uri>

```
```env

- FRONTEND

NEXT_PUBLIC_BASE_URL=<your backend url>
NEXT_PUBLIC_API_KEY=<firebase-api-key>
NEXT_PUBLIC_DOMAIN=<firebase-domain>
NEXT_PUBLIC_PROJECT_ID=<firebase-project-id>
NEXT_PUBLIC_STORAGE_BUCKET=<firebase=storage-bucket>
NEXT_PUBLIC_MESSAGING_SENDER_ID=<firebase messaging sender-id>
NEXT_PUBLIC_APP_ID=<firebase-app-id>
NEXT_PUBLIC_MEASUREMENT_ID=<firebase measurement-id>

```

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Fulail-kt/zorro-book-store.git
    ```

2. Navigate to the backend directory:
    ```bash
    cd zorro-book-store/backend
    
    ```

3. Install the dependencies:
    ```bash
    yarn / yarn add
    ```

4. Start the backend server:
    ```bash
    yarn dev
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the dependencies:
    ```bash
    yarn/ yarn add
    ```

3. Start the frontend server:
    ```bash
    yarn dev
    ```


## API Documentation

### User Authentication
- **POST** `/api/v1/user/register` - Register a new user
- **POST** `/api/v1/user/login` - Login a user

### Book Management
- **GET** `/api/v1/book?page=1&limit=10&search='` - Get all books
- **POST** `/api/v1/book` - Add a new book
- **GET** `/api/v1/book/:id` - Get a book by ID
- **PUT** `/api/v1/book/:id` - Update a book by ID
- **DELETE** `/api/v1/book/:id` - Delete a book by ID

### Order Management
- **GET** `/api/v1/order` - Get all orders
- **POST** `/api/v1/order` - Place a new order
- **GET** `/api/v1/order/:id` - Get an order by ID
- **GET** `/api/v1/order/user/:userId` - Get an order by userID
- **PUT** `/api/v1/order/:id` - Update an order by ID




**API DOCUMENTATION**- https://docs.google.com/document/d/1SqaTXokYttlgZALnIo5Aw_JoADnLWnDsVcRxUxWDnJA/edit?usp=sharing




For any inquiries or feedback, please contact [Muhamed Fulail](mailto:muhamedfulail77@gmail.com).
