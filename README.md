# Brand Shoe Store - Role-Based Dashboard App

[![Live Project]](https://brand-store-hjuu.vercel.app/)

This is a full-stack role-based shoe store dashboard built with **React.js** for the frontend and **Node.js/Express** for the backend. The app allows users to view, create, edit, and delete shoes depending on their role (`super_admin` or `brand_user`).

## Features

- **Authentication** with JWT
- **Role-Based Access Control**:
  - `super_admin` can manage all brands
  - `brand_user` can only manage shoes within their brand
- **CRUD Operations** for Shoes (Create, Read, Update, Delete)
- **Brand Switching** for super admins
- Clean and responsive UI built with **Bootstrap**
- Backend integration with secure API endpoints

---

## Technologies Used

### Frontend
- React.js
- React Router
- Bootstrap 5
- CSS
- Axios
- JWT Decode

### Backend (see backend repo if separate)
- Node.js
- Express.js
- MongoDB (or any database used)
- Mongoose
- JSON Web Tokens (JWT)

---

## Pages

### Auth
- `/signup` — Create new user
- `/login` — User login

### Main
- `/` — Home page (Dashboard)
- `/about` — About section

### Admin Panel
- `/users` — Manage users (super_admin only)

---

## 🧭 Role Behaviors

| Role         | Can View | Can Create | Can Edit | Can Delete | Can Switch Brands |
|--------------|----------|------------|----------|------------|-------------------|
| Super Admin  |  All   |  All     | All   | All     | Yes             |
| Brand User   |  Own   |  Own     | Own   | Own     | No              |

---

## Project Structure

├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── .env
│ └── server.js
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── styles/
│ ├── utils/
│ └── App.js
├── .env
└── package.json


---

## How to Run This Project Locally

### Backend Setup

#### 1. Navigate to the backend folder:
cd backend

#### 2. Install backend dependencies:
npm install

#### 3. Create .env file and add the following:
PORT=5002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

#### 4. Start backend server:
npm run dev

### Frontend Setup

#### 1.Navigate to the frontend folder:
cd frontend

#### 2. Install frontend dependencies:
npm install

#### 3. Create .env file in the frontend/ folder:
REACT_APP_BACKEND_PORT=http://localhost:5002

#### 4. Start the React app:
npm start

### API Endpoints
Method      Endpoint        Description
GET         /dashboard	    Fetch all shoes
POST	    /shoes/create	Add a new shoe
PUT	      /shoes/update/:id	Update a shoe
DELETE	  /shoes/delete/:id	Delete a shoe
POST	    /auth/signup	Register new user
POST	   /auth/login	    User login

### Future Improvements
- Cloud image uploads

- Pagination & search

- User activity logs

- Admin analytics dashboard

- Form validation

