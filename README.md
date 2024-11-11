# AirMoya Mini Test Project

This is a mini test project for **AirMoya**, showcasing a simple content management system with an image gallery, services management (CRUD operations), and a real-time chat feature. The application uses **React**, **Redux Toolkit**, and **Tailwind CSS** on the frontend, with **Express**, **Socket.IO**, and **Local Storage** on the backend.

### Live Demo
- **Frontend**: [Live Site on Netlify](https://airmoya-crud.netlify.app/)
- **Backend**: [Hosted on Render](https://airmoya-test-crud.onrender.com), connected to Netlify for live updates

### Repository Link
- **Repository**: [GitHub Repo](https://github.com/FevenSeyfu/Airmoya-test-crud)
---

## Features

1. **Image Upload with Preview and Gallery**
   - Allows users to upload images, preview them before submitting, and view them in a gallery.
   - Images are stored on the server in local storage for easy retrieval.

2. **Services Management**
   - Full CRUD (Create, Read, Update, Delete) functionality for managing services.
   - Users can add, edit, delete, and view details of various services.

3. **Real-Time Chat**
   - Enables real-time messaging using **Socket.IO** for WebSocket integration.
   - Simulates a simple chat application allowing multiple users to chat in real-time.

3. **User registration**
   - Enable user registration and authentication with username,email,password using JWT.
   - From validation for required fields and correct email format.

---

## Technologies Used

### Backend

- **Express.js** - A minimalist web framework for Node.js.
- **Socket.IO** - Enables real-time, bidirectional communication between clients and server.
- **JWT** - Enables user authentication.
- **Local Storage** - Saves images and chat data in the `/uploads` directory on the server.

### Frontend

- **React.js** - JavaScript library for building user interfaces.
- **Redux Toolkit** - Simplifies global state management for the services and chat features.
- **Tailwind CSS** - Utility-first CSS framework for fast UI styling.
- **Tailwind CSS** - Javascript build tool.

### Deployment

- **Backend**: Deployed on [Render](https://render.com/)
- **Frontend**: Deployed on [Netlify](https://www.netlify.com/)

---

## Installation and Setup

To run this project locally:

### Prerequisites
- Install Node.js and npm on your machine.
- Git for cloning repositories.

### 1. Clone the Repositories

```bash
git clone [Frontend Repository URL]
```
### 2. Backend Setup
- Navigate to the backend directory and install dependencies:

```bash
cd Backend
npm install
```

- Start the backend server:

```bash
npm start
```
The backend server should now be running on http://localhost:5000.

### 3. Frontend Setup
- Navigate to the backend directory and install dependencies:

```bash
cd Frontend
npm install
```

- Start the backend server:

```bash
npm run dev
```
The frontend should now be available at http://localhost:5173.

## Features
- **User Registration**: Go to '/login' or '/register' to authenticate user.
- **Image Upload**: Go to the gallery page to upload and view images.
- **Manage Services**: Add, edit, delete,view and sort services in the Services section.
- **Real-Time Chat**: Access the chat page to send and receive messages in real time.
