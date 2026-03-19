# Ecommerce Fullstack Design

A professional, high-performance e-commerce platform built with a modern fullstack architecture. Features a responsive frontend, a robust backend API, and a secure authentication system.

## 🚀 Features

- **Responsive Design**: Mobile-first approach using TailwindCSS for a seamless experience on all devices.
- **Dynamic Product Catalog**: Interactive product listing with categories, search, and filtering.
- **Product Details**: Comprehensive view with images, specs, ratings, and descriptions.
- **Shopping Cart & Wishlist**: Real-time state management for items and synchronized across sessions.
- **Secure Authentication**: User signup and login with JWT-based sessions and bcrypt password hashing.
- **Order Management**: Track and view order history with status updates.
- **Admin Dashboard**: Specialized interface for managing products, categories, and users.
- **Currency Support**: Automatic price formatting and currency context.
- **User Profile & Settings**: Personal information and security settings management.

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Lighting fast development and optimized production build.
- **TailwindCSS**: Utility-first CSS framework for custom styling.
- **Axios**: Promised-based HTTP client for API communication.
- **React Router Dom**: Client-side routing with navigation guards.
- **Context API**: Global state management for Auth, Cart, Wishlist, and Currency.

### Backend
- **Node.js & Express**: Scalable and flexible server environment.
- **MongoDB (Mongoose)**: Document-oriented database with flexible schema and powerful querying.
- **JSON Web Token (JWT)**: Secure stateless authentication.
- **Bcryptjs**: Industry-standard password encryption.
- **CORS & Dotenv**: Environment management and cross-origin security.

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local instance)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ecommerce-fullstack-design.git
    cd ecommerce-fullstack-design
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend/` directory:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    ```
    Create a `.env` file in the `frontend/` directory:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

### Running the Project

1.  **Start the Backend:**
    ```bash
    cd backend
    npm run dev
    ```
    The server will run on [http://localhost:5000](http://localhost:5000).

2.  *(Optional)* **Seed the Database:**
    ```bash
    cd backend
    npm run seed
    ```

3.  **Start the Frontend:**
    ```bash
    cd ../frontend
    npm run dev
    ```
    The application will be available at [http://localhost:5173](http://localhost:5173).

## 📁 Project Structure

```bash
├── backend/
│   ├── models/       # Mongoose Schemas (User, Product, Order)
│   ├── routes/       # API Route handlers
│   ├── middleware/   # Auth and Error handling
│   ├── server.js     # Main entry point
│   └── seed.js       # Database initialization
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── context/    # Global state (Auth, Cart, etc.)
    │   ├── pages/      # Route-level views (Home, Profile, etc.)
    │   ├── services/   # API interaction layer
    │   └── App.jsx     # Main routing component
    └── public/         # Static assets
```

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built by [sibghamursaleen](https://github.com/sibghamursaleen)
