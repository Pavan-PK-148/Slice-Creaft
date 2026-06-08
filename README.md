# 🍕 SliceCraft — Full Stack Pizza Ordering Platform

## 🚀 Live Demo

### 🌐 Frontend

[https://slicecraft-frontend.netlify.app/](https://slice-craft148.netlify.app/)

### ⚙ Backend API

[https://slicecraft-api.onrender.com/](https://slice-craft.onrender.com)


---

# 📌 About SliceCraft

SliceCraft is a modern, high-performance Full Stack Pizza Ordering Platform engineered using the MERN Stack. The application delivers an immersive pizza customization experience through dynamic UI animations, real-time cart synchronization, scalable backend architecture, and secure authentication workflows.

The platform is designed with a production-level architecture featuring responsive design systems, cloud-hosted APIs, modular component structures, JWT-based authentication security, and scalable MongoDB database models.

---

# 🏗️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Framer Motion
* React Three Fiber (R3F)
* Three.js
* React Hot Toast
* Lucide React Icons

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt.js
* CORS

## Deployment

* Netlify (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

# ✨ Core Features

## 🔥 Architectural & Core Foundation

### 01. Modern MERN Architecture

Engineered as a high-performance decoupled Monorepo featuring a lightweight React.js SPA frontend hosted on Netlify and a scalable Node.js/Express.js REST API hosted on Render.

### 02. Dynamic 3D Immersive UI Engine

Integrated interactive WebGL-powered Three.js particle ecosystems using React Three Fiber and @react-three/drei for premium visual engagement.

### 03. Fluid Motion Mechanics

Wrapped with Framer Motion animation systems for smooth transitions, hover interactions, and spring-based UI dynamics.

### 04. Centralized Environment Configuration

Structured multi-environment .env architecture utilizing Vite tokens for seamless local and production switching.

### 05. Optimized State Management

Global CartProvider state synchronization with browser localStorage persistence for uninterrupted user sessions.

---

# 🎨 Frontend Features & User Experience

### 06. Modern Orange Workspace Branding

Minimalistic orange-themed UI powered by Tailwind CSS utility architecture.

### 07. Dynamic Multi-Step Pizza Customizer

Interactive pizza builder supporting:

* Bases
* Crust Types
* Sauces
* Cheese Layers
* Veg Toppings
* Premium Meat Options

### 08. Real-Time Bill Calculation

Instant pricing engine dynamically recalculating pizza costs based on selected customizations.

### 09. Smart Navigation System

Declarative React Router navigation with custom ScrollToTop route interceptors.

### 10. Real-Time Global Cart System

Supports:

* Complex pizza stacking
* Dynamic subtotal calculation
* Quantity handling
* Instant item removal

---

# 🔒 Backend, Security & Asset Management

### 11. Intelligent Image Path Resolver

Custom asset parsers handling duplicate upload route conflicts and fallback media rendering.

### 12. Optimized Static Asset Delivery

Express static middleware configured for high-speed media streaming.

### 13. Production Asset Preservation

Advanced .gitignore inversion strategies preserving cloud deployment product assets.

### 14. JWT Authentication Security

Protected backend route architecture using JSON Web Tokens and custom middleware validation.

### 15. Enterprise CORS Configuration

Restricted cross-origin backend access exclusively bound to production frontend domains.

---

# 🛠️ Admin Dashboard Features

### 16. Professional Admin Control Center

Dedicated management panel with Lucide React powered navigation systems.

### 17. Live Order Queue Monitoring

Real-time operational visibility into customer orders and processing workflows.

### 18. Real-Time Notification Framework

Interactive toast notification system powered by react-hot-toast.

### 19. Scalable MongoDB Schema Architecture

Structured database models:

* Product.js
* Order.js
* User.js

### 20. Payment Integration Ready

Prepared infrastructure for Razorpay and Stripe transaction gateway integration.

---

# 📸 Application Screenshots

## 🏠 Home Page

<img width="1512" height="905" alt="Screenshot 2026-06-08 at 11 31 49 AM" src="https://github.com/user-attachments/assets/caacffcf-2633-48c9-abe4-24158c49cd35" />

---

## 🍕 Products Page

<img width="1512" height="906" alt="Screenshot 2026-06-08 at 11 32 28 AM" src="https://github.com/user-attachments/assets/d9bf22b9-36ff-4fae-ba69-49e64fce5d7a" />

---

## 🛒 Cart Page

<img width="1512" height="912" alt="Screenshot 2026-06-08 at 11 33 16 AM" src="https://github.com/user-attachments/assets/0a1a759d-dcdb-4df1-9b23-bacd4f7d0c55" />


---

## 💳 Checkout Page

<img width="1512" height="909" alt="Screenshot 2026-06-08 at 11 33 42 AM" src="https://github.com/user-attachments/assets/c459e2a9-5137-4505-ab39-72f0364004a1" />


---

## 📦 Orders Page

<img width="1512" height="910" alt="Screenshot 2026-06-08 at 11 34 02 AM" src="https://github.com/user-attachments/assets/d9b007ff-bb60-42c9-93da-1b3ffd6ac40e" />


<img width="1512" height="907" alt="Screenshot 2026-06-08 at 11 34 28 AM" src="https://github.com/user-attachments/assets/a4b69c1c-db0f-4696-ac87-0149738023f8" />


---

# 👨‍💼 Admin Panel Screenshots

## 📊 Dashboard

<img width="1512" height="912" alt="Screenshot 2026-06-08 at 11 35 04 AM" src="https://github.com/user-attachments/assets/9bbca78a-015c-428f-b06f-373fbd7cc035" />


---

## 📦 Admin Orders

<img width="1512" height="908" alt="Screenshot 2026-06-08 at 11 35 36 AM" src="https://github.com/user-attachments/assets/a81ae9e5-dd99-43f1-bc35-f4fd3a747092" />


---

## 🍕 Admin Products

<img width="1512" height="909" alt="Screenshot 2026-06-08 at 11 35 56 AM" src="https://github.com/user-attachments/assets/79604146-779c-4828-87e0-a32a9ff42ff3" />


---

## 📈 Analytics

<img width="1512" height="913" alt="Screenshot 2026-06-08 at 11 36 18 AM" src="https://github.com/user-attachments/assets/f81a34ad-41e0-4707-b6d1-ca46b3863058" />


---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Pavan-PK-148/SliceCraft.git
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Backend Setup

```bash
cd server
npm install
npm run server
```

---

# 🔐 Environment Variables

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## Backend (.env)

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
CLIENT_URL=http://localhost:5173
```

---

# 📁 Folder Structure

```bash
SliceCraft/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── assets/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── uploads/
│
└── README.md
```

---

# 📈 Future Enhancements

* Razorpay Integration
* Stripe Payments
* AI Pizza Recommendations
* Live Order Tracking
* PWA Support
* Docker Deployment
* Role-Based Admin Permissions
* Email Notifications
* Coupon System
* Advanced Analytics Dashboard

---

# 👨‍💻 Developed By

## Pavan Kalyan Srinivas Robba

📧 Email: 
[pavanrobba148@gmail.com](mailto:pavanrobba148@gmail.com)

📱 Phone:
9346005430

🌐 Portfolio:
https://pavanportfolio148.netlify.app/

💼 LinkedIn:
https://www.linkedin.com/in/pavan-kalyan-srinivas-robba-723b43347/

🐙 GitHub:
https://github.com/Pavan-PK-148

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub and supporting the repository.
