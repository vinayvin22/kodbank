# 🏦 Kodbank - Premium Banking Experience

Kodbank is a secure, modern, full-stack banking web application built with Node.js, Express, and Aiven MySQL. It features a sleek glassmorphism UI, JWT-based authentication, and a delightful user experience.

## ✨ Features

- **Premium UI**: Ultra-modern design with dark mode, glassmorphism, and smooth animations.
- **Secure Registration**: Unique UUID generation and hashed passwords (bcrypt).
- **JWT Authentication**: Secure session management using HTTP-only cookies.
- **Dashboard**: Real-time balance checking with celebratory feedback animations.
- **Aiven MySQL**: High-performance cloud database integration.

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: Aiven MySQL
- **Frontend**: Vanilla HTML5, CSS3 (Glassmorphism), Modern JavaScript
- **Security**: JWT (JSON Web Tokens), Bcrypt.js, Cookie-parser

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- Aiven MySQL account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vinayvin22/kodbank.git
   cd kodbank
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=your_host
   DB_PORT=your_port
   DB_USER=avnadmin
   DB_PASSWORD=your_password
   DB_NAME=defaultdb
   JWT_SECRET=your_secret
   PORT=3000
   ```

4. **Run the app**
   ```bash
   npm start
   ```

Visit `http://localhost:3000/register.html` to get started!

## 📜 License

Created by Antigravity for Vinay.
