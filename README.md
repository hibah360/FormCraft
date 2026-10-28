# FormCraft

FormCraft is a dynamic form builder application built using the **MERN stack**. It allows users to create, manage, and preview forms, as well as collect and manage form submissions.

## Features

- User authentication and login.
- Create, edit, delete, and preview forms.
- Add and configure dynamic form fields.
- Collect and manage form submissions.
- Responsive and modern user interface.

## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (Frontend), Render (Backend)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- A MongoDB database (local MongoDB or MongoDB Atlas)

### 1. Clone the Repository

git clone https://github.com/hibah360/FormCraft.git
cd FormCraft


### 2. Set Up the Backend

cd Backend
npm install


Create a `.env` file inside the `Backend` folder:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
JWT_SECRET=161e51dd8509a6341b24afab49b6186db5cdbb497b647e1d4b2ccc80c66d1f65f8c7f579738da60171d2ef45e7f40432b77255e8e540097dc2654caec913a87a

Start the backend server:

npm run dev

The backend will run at `http://localhost:5000`

### 3. Set Up the Frontend

Open a new terminal:

cd Frontend
npm install


Create a `.env` file inside the `Frontend` folder:

VITE_API_BASE_URL=http://localhost:5000

Start the frontend:

npm run dev

Open the local URL displayed in your terminal, usually `http://localhost:5173`.

## Environment Variables


`PORT` - Backend server port 
`MONGODB_URI` - MongoDB connection string 
`FRONTEND_URL` - Frontend URL used for CORS configuration 
`VITE_API_BASE_URL` - Backend base URL used by the frontend 
`JWT_SECRET` – A secret key used to sign and verify JSON Web Tokens (JWT) for user authentication and authorization.


## Live Application

- **Frontend:**https://form-craft-pearl-one.vercel.app/login
- **Backend:** https://formcraft-backend-os45.onrender.com
- **Source Code:** https://github.com/hibah360/FormCraft

---


## Usage

The **FormCraft Admin Panel** provides three main sections to create forms, manage saved forms, and track submissions.

### 1. Form Builder
- Add the required fields to create a form.
- Customize field labels and placeholders.
- Save the form to make it available in My Forms.

### 2. My Forms
View and manage all saved forms using the following actions:

- **Preview:** Preview the form.
- **Edit:** Modify the form and its fields.
- **Delete:** Delete the form and its associated submissions.
- **Share Form:** Copy the shareable form link and distribute it to public users.

Public users can open the shared link and submit their responses without accessing the admin panel.

### 3. Submissions
View and manage responses submitted by public users through shared forms. All submitted responses are displayed in the admin panel under this section.