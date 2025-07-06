# Event Management Dashboard

A full-stack event management dashboard built with **React (frontend)**, **Node.js/Express (backend)**, **Prisma**, and **Supabase PostgreSQL**.

This project allows:
- **Users** to register, log in, and view/register for events.
- **Organizers** to create, edit, delete, and manage events.

---

## Features

- User and Organizer role-based authentication (JWT).
- Secure password hashing with bcrypt.
- CRUD operations for event management.
- Protected routes with role-based access.
- Persistent JWT-based session handling in frontend.
- Modular, clean code structure for easy maintenance.
- Uses Prisma ORM with Supabase PostgreSQL for scalable database management.

---

## Project Structure

```plaintext
/ (root)
├── backend
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   ├── services
│   ├── prisma
│   ├── index.js
│   └── .env
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   └── index.js
│   └── .env
├── .gitignore
└── README.md
```

## Technologies Used

- **Frontend:**
  - React
  - Axios
  - React Router
  - CSS Modules

- **Backend:**
  - Node.js
  - Express
  - Prisma
  - JWT
  - bcryptjs

- **Database**  
  - Supabase PostgreSQL  

---

## Usage
- Open http://localhost:3000 in your browser.
- Register a new account as a User or Organizer.
- Log in to receive a JWT token.
- Users are redirected to the User Dashboard; organizers to the Organizer Dashboard.
- Organizers can create, edit, and delete events.
- Users can browse events and register.

## Notes
- Ensure that the frontend and backend run on different ports to avoid conflicts.
- API calls from the frontend automatically include the JWT token using Axios interceptors.
- Passwords are securely hashed using bcrypt before being stored in the database.
