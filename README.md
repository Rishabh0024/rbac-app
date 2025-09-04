# Role-Based Access Control (RBAC) Web Application

A full-stack web application implementing **role-based access control** with authentication and authorization using **Express.js, Passport.js, MongoDB (Mongoose), and EJS**.

---

## 🔑 Features

- Secure **user authentication** with Passport.js (local strategy)
- **Role-based authorization** for Admin, Moderator, and Client
- **Session persistence** with Express Session + Mongo Store
- Redirect users back to attempted page after login
- Server-side input validation and **flash messages**
- Custom error handling (404, unauthorized)
- Responsive UI with EJS templating + CSS

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, CSS
- **Authentication**: Passport.js
- **Database**: MongoDB (Mongoose ORM)
- **Sessions**: Express Session + Mongo Store

---

## 📂 Project Structure

```bash
rbac-app/
│── config/ # Config files
│── models/ # Mongoose models
│── routes/ # Route definitions
│── views/ # EJS templates
│── public/ # Static assets (CSS/JS)
│── app.js # Entry point
│── package.json
│── .env.example # Example env vars

```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Rishabh0024/rbac-app.git
cd rbac-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

#### Create a .env file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
DB_NAME=rbac_app
SESSION_SECRET=your_secret_key
ADMIN_EMAIL=admin@example.com
```

### 4. Run the app

```bash
npm start
```

#### Visit 👉 http://localhost:3000

## 👤 Roles

- Admin → Full access

- Moderator → Limited access

- Client → Basic access

## 📌 Future Improvements

- JWT-based API authentication

- Role/permission management UI

- Deployment to cloud (Heroku/Render)

- Two-factor authentication

---

## 📜 License

MIT License © 2025 [Rishabh Dixit]

---
