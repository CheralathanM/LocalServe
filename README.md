# LocalServe

LocalServe is a full-stack web application that enables users to discover, manage, and connect with local service providers such as plumbers, electricians, and cleaning professionals. The platform provides a structured and secure environment for service listing, discovery, and user interaction.

---

## Overview

LocalServe is designed to streamline the process of finding and offering local services. It integrates a modern frontend with a scalable backend API, supporting authentication, service management, and role-based access control.

The system is suitable for academic projects, prototyping service marketplaces, and demonstrating full-stack development capabilities.

---

## Live Application

https://local-serve-w0xs.onrender.com/

---

## Core Capabilities

* **Authentication and Authorization**

  * Secure login and registration using JSON Web Tokens (JWT)
  * Role-based access control (Customer and Service Provider)

* **Service Management**

  * Create, update, and delete service listings
  * Structured data handling using MongoDB

* **Service Discovery**

  * Browse and search available services
  * Organized service presentation

* **API Architecture**

  * RESTful API design using Express.js
  * Middleware-based request handling
  * Protected routes for secure operations

---

## Technology Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Tokens (JWT)
* bcryptjs

---

## System Architecture

The application follows a client-server architecture:

* The **frontend client** communicates with backend APIs via HTTP requests.
* The **backend server** handles authentication, business logic, and database interactions.
* **MongoDB** is used for persistent data storage.

---

## Project Structure

```id="arch1"
LocalServe/
├── client/        # Frontend application (React)
├── server/        # Backend API (Node.js + Express)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── README.md
```

---

## Installation and Setup

### Clone Repository

```id="clone1"
git clone https://github.com/CheralathanM/LocalServe.git
cd LocalServe
```

---

### Backend Setup

```id="backend1"
cd server
npm install
npm run dev
```

Create a `.env` file in the `server` directory:

```id="env1"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Frontend Setup

```id="frontend1"
cd client
npm install
npm run dev
```

---

## Deployment

The application is deployed on Render with integrated frontend and backend services. The deployment environment is configured to handle API routing and environment variables securely.

---

## Security Considerations

* All authentication is handled using JWT tokens.
* Sensitive configuration values are managed through environment variables.
* Passwords are securely hashed using bcrypt.
* API routes are protected via middleware to enforce access control.

---

## Future Enhancements

* Booking and scheduling system
* User ratings and feedback
* Real-time communication (WebSockets)
* Payment gateway integration
* Advanced filtering and recommendation system

