# UniKart - Campus Marketplace

A full-stack web application where college students can buy and sell used items within their campus.

## Tech Stack

- **Frontend:** React.js, Bootstrap 5, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer

## Project Structure

```
uniKart/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register & Login logic
│   │   └── itemController.js     # CRUD, Search, Filter logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── uploadMiddleware.js   # Multer image upload config
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Item.js               # Item schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth/*
│   │   └── itemRoutes.js         # /api/items/*
│   ├── uploads/                  # Uploaded images storage
│   ├── .env.example              # Environment variables template
│   ├── package.json
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation bar
│   │   │   ├── ItemCard.js       # Item display card
│   │   │   └── ProtectedRoute.js # Auth route guard
│   │   ├── context/
│   │   │   └── AuthContext.js    # Global auth state
│   │   ├── pages/
│   │   │   ├── Home.js           # Landing page
│   │   │   ├── Login.js          # Login form
│   │   │   ├── Register.js       # Registration form
│   │   │   ├── PostItem.js       # Create listing
│   │   │   ├── BrowseItems.js    # Browse with search/filter
│   │   │   ├── ItemDetails.js    # Single item + contact seller
│   │   │   └── MyListings.js     # User's own listings
│   │   ├── services/
│   │   │   └── api.js            # Axios HTTP client
│   │   ├── App.js                # Root component + routes
│   │   └── index.js              # React DOM render
│   └── package.json
│
└── README.md
```

## Features

1. User Registration and Login (JWT Auth)
2. Post Item for Sale
3. Upload Item Image
4. Edit Item
5. Delete Item
6. Browse All Items
7. Search Items by keyword
8. Filter by Category (Books, Electronics, Gaming Items, Study Notes)
9. View Item Details
10. Contact Seller (view phone/email)

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env    # Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/items | Get all items | No |
| GET | /api/items/:id | Get single item | No |
| POST | /api/items | Create new item | Yes |
| PUT | /api/items/:id | Update item | Yes |
| DELETE | /api/items/:id | Delete item | Yes |
| GET | /api/items/search?q= | Search items | No |
| GET | /api/items/category/:cat | Filter by category | No |

## Categories
- Books
- Electronics
- Gaming Items
- Study Notes
