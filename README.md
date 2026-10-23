# Pingly 💬

Pingly is a full-stack chat application that allows users to connect and communicate with each other. It features JWT-based authentication, secure password hashing, customizable user profiles, cloud-based profile picture uploads, and real-time communication powered by Socket.IO.

## ✨ Features

- 🔐 **JWT Authentication** — Token-based user authentication.
- 🔒 **Secure Password Hashing** — Passwords hashed using bcryptjs.
- 👤 **Profile Management** — Users can customize their profiles and update their profile pictures.
- ☁️ **Cloud Image Uploads** — Cloudinary integration for profile picture storage.
- 💬 **Real-Time Messaging** — Socket.IO integration for real-time communication.
- 🗄️ **Database Management** — MongoDB with Mongoose.
- 🛡️ **Backend Security** — Helmet security headers, cookie parsing, and CORS configuration.
- 🧭 **Client-Side Routing** — React Router DOM for navigation.
- 🎨 **Responsive UI** — Tailwind CSS and DaisyUI for styling.
- 🔔 **Toast Notifications** — React Toast for user feedback.
- 🎯 **Icon Library** — React Icons for interface elements.

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- DaisyUI
- React Router DOM
- React Icons
- React Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JSON Web Tokens (`jsonwebtoken`)
- bcryptjs
- Cloudinary
- Cookie Parser
- CORS
- Helmet
- Morgan
- dotenv

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database or MongoDB Atlas account
- Cloudinary account

### 1. Clone the Repository

```bash
git clone https://github.com/SehajdeepSinghNibber/Pingly.git
cd Pingly
```

### 2. Install Dependencies

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

> Replace `client` with your actual frontend directory name if it differs.

### 3. Configure Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Make sure the variable names match those used in your backend configuration. Never commit your `.env` file or expose your credentials.

### 4. Run the Application

Start the backend development server:

```bash
cd server
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd client
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 📂 Project Structure

```text
Pingly/
├── client/              # React frontend
│   ├── src/
│   └── package.json
├── server/              # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

*This is an illustrative structure. Update it to reflect your actual project directories.*

## 🔒 Security

- Password hashing with bcryptjs.
- JWT-based authentication.
- Environment variables for sensitive credentials.
- Helmet for HTTP security headers.
- Cookie handling through cookie-parser.
- CORS configuration for cross-origin requests.

## 🎯 Project Objective

Pingly is a full-stack development project built to explore authentication, real-time communication, database integration, cloud storage, and modern frontend development.

## 👨‍💻 Author

**Sehajdeep Singh**

GitHub: [@SehajdeepSinghNibber](https://github.com/SehajdeepSinghNibber)

---

*Built with ❤️ using the MERN stack and Socket.IO.*
