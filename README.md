# E-commerce Website (MERN Stack)

This project is a fully functional e-commerce website built using the MERN (MongoDB, Express, React, Node.js) stack. The frontend uses **React with Vite** for development, while the backend is powered by **Express.js**. The project integrates **Stripe** for handling payment transactions.

## Features

- **User Authentication**: Secure login and registration functionality.
- **Product Management**: Users can browse and manage products.
- **Shopping Cart**: Add, update, or remove products from the cart.
- **Payment Gateway**: Integrated **Stripe** for secure payments.
- **Order Management**: Users can place and view orders.
- **Admin Panel**: Admins can add, update, and delete products.
- **Email Notifications**: Implemented using **Nodemailer** and **Ethereal** for testing.

## Technologies Used

### Frontend

- **React** with **Vite**: Fast and optimized frontend development.
- **Axios**: For handling API requests.
- **React Router**: For navigation between different pages.

### Backend

- **Node.js** and **Express.js**: Backend framework for handling API requests and business logic.
- **MongoDB**: Database for storing users, products, orders, etc.
- **Mongoose**: For object data modeling (ODM) with MongoDB.
- **Stripe API**: For handling payments.
- **Nodemailer** with **Ethereal**: For sending email notifications.

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed locally or hosted on a platform like MongoDB Atlas.
- Stripe account for setting up the payment gateway.

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harshdev4/e-commerce.git
   cd e-commerce
   ```

2. **Backend Setup:**

   ```bash
   cd Backend
   npm install
   ```

   Start the backend server:

   ```bash
   npm start
   ```

   The backend will run on `http://localhost:3000` or the port specified in `process.env.PORT`.

3. **Frontend Setup:**

   Navigate to the frontend folder:

   ```bash
   cd ../Frontend
   npm install
   ```

   Start the frontend server:

   ```bash
   npm run dev
   ```

   The frontend will run on the port decided by **Vite**, likely `http://localhost:5173`.

4. **Environment Variables:**

   Backend uses environment variables defined in a `.env` file for MongoDB and other configurations. Since MongoDB is connected locally, make sure MongoDB is running on `mongodb://localhost:27017/<your-database>`.

   Create a `.env` file in the `Backend` directory with the following fields:

   ```
   PORT=3000
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   ```

## Folder Structure

Here’s the directory structure for both the backend and frontend:

### Backend Directory Structure

```
Backend/
│
├── config/             # Configuration files (e.g., nodemailer settings)
├── controllers/        # Controllers for handling business logic
├── middleware/         # Custom middleware (e.g., authentication, isAdmin, multer)
├── models/             # Mongoose models for MongoDB (e.g., User, order, product)
├── routes/             # API routes for various functionalities
├── uploads/            # Directory for file uploads (e.g., images)
├── views/              # (Optional) Views for forgot password server-side rendering
├── index.js           # Main entry point for the backend server
└── .env                # Environment variables for backend
```

### Frontend Directory Structure

```
Frontend/
│
├── public/             # Static files (e.g., images, icons)
├── src/
│   ├── assets/         # Images, logos, and other assets
│   ├── components/     # Reusable components
│   ├── pages/          # All page components (e.g., Home, Login, Product pages)
│   ├── axios/          # Axios configuration for making API requests
│   ├── App.jsx         # Main app component
│   ├── index.js        # Entry point for React
│   └── styles/         # Custom CSS or SCSS styles
└── vite.config.js      # Configuration file for Vite
```

## Usage

- Access the frontend via `http://localhost:5173`.
- Admins can manage products and view orders.
- Users can browse products, add them to the cart, and proceed to payment.

## Payment Integration

The application uses **Stripe** for payment processing. Make sure to add your Stripe keys to the `.env` file. The payment flow allows users to make secure transactions, and Stripe's API will handle the processing.

## Future Enhancements

- Improve the UI and make it more responsive.
- Add user profile management.
- Integrate additional payment gateways.
- Implement order tracking.

## Contributing

Contributions are welcome! Please fork this repository and open a pull request to propose changes.
