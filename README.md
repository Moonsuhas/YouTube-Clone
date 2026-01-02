# YouTube Clone – Full Stack MERN Application

A full stack YouTube Clone web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project replicates core features of YouTube such as user authentication, video upload, video streaming, likes, comments, and user channels.

## Author

Name: Suhas  
Role: Full Stack Developer  

## Project Description

This project is a full stack web application that demonstrates real-world application development using modern web technologies. The frontend is developed using React to provide a smooth and responsive user interface, while the backend is built with Node.js and Express.js to handle APIs, authentication, and database operations. MongoDB is used as the database to store users, videos, and comments.

## 🚀 Features

### Home Page
- Grid display of all videos  
- Category filtering and search bar  
- Responsive layout for mobile, tablet, desktop  

### Video Watch Page
- Play selected video  
- View video title, uploader, and views  
- Multiple language support for audio (English, Hindi)  

### Sidebar
- YouTube-style sidebar with 20+ sections:
  - Home, Shorts, Subscriptions, Library, History, Your Videos, Downloads, Music, News, Sports, Gaming, Trending, etc.  
- Scrollable sidebar  
- Active section highlighted  

### User Authentication
- Login / Register  
- Profile picture display when logged in  
- Logout redirects to Home page and profile disappears  
- Protected routes (Upload, Channel)  

### Mic / Voice Search
- Start voice search by clicking the mic icon  
- Search videos using speech recognition (Chrome supported)  

### Upload & Channel
- Upload videos via a protected page  
- Manage channel information  
## Technologies Used

Frontend:
- React.js
- React Router
- Axios
- CSS / Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js

Tools:
- Git
- GitHub
- Thunder client
- VS Code

## Project Folder Structure

youtube-clone/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── videoController.js
│   │   └── commentController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Video.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── videoRoutes.js
│   │   └── commentRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── README.md
└── .gitignore

## Installation and Setup

Clone the repository:
git clone [https://github.com/your-username/youtube-clone.git] (https://github.com/Moonsuhas/YouTube-Clone)

Backend setup:
cd backend  
npm install  
npm start  

Frontend setup:
cd frontend  
npm install  
npm start  

## Environment Variables

Create a .env file inside the backend folder and add:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

## API Endpoints

Authentication:
POST /api/auth/register  
POST /api/auth/login  

Videos:
POST /api/videos/upload  
GET /api/videos  
GET /api/videos/:id  

Comments:
POST /api/comments  
GET /api/comments/:videoId  

## Future Enhancements
- Subscribe and unsubscribe feature
- Video search functionality
- Playlists
- Watch history
- Admin dashboard

## Learning Outcome

- Understanding MERN stack architecture
- REST API development
- JWT authentication
- Database design using MongoDB
- Frontend and backend integration
- GitHub project management

## License
This project is created for educational and learning purposes only.
