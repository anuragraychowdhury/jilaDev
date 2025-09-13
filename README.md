# Jila App - Video & Topic Management System

A full-stack web application for managing educational videos and topics with a modern React frontend, Flask API backend, and MongoDB database.

## 🚀 Features

- **Modern React Frontend**: Responsive web interface for browsing videos and topics
- **Flask REST API**: Robust backend with CRUD operations for videos and topics
- **Admin Dashboard**: Internal tool for content management with password protection
- **MongoDB Integration**: Cloud database for scalable data storage
- **YouTube Integration**: Direct links to educational videos

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Flask API     │    │   MongoDB       │
│   (Port 3000)   │◄──►│   (Port 5001)   │◄──►│   Atlas         │
│                 │    │                 │    │   (Cloud)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲
         │                       │
┌─────────────────┐    ┌─────────────────┐
│ Internal Tool   │    │ API Endpoints   │
│ (HTML/CSS/JS)   │    │ • /fetch/topics │
│                 │    │ • /fetchTopic/* │
└─────────────────┘    │ • /addVideo     │
                       │ • /addTopic     │
                       └─────────────────┘
```

## 🛠️ Tech Stack

- **Frontend**: React, React Router, CSS3
- **Backend**: Python, Flask, Flask-CORS
- **Database**: MongoDB Atlas
- **Authentication**: Password-protected admin access

## 📦 Quick Start

### Prerequisites
- Node.js 14+
- Python 3.7+
- MongoDB Atlas account

### Installation

1. **Clone and setup backend:**
```bash
cd jilaApp/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Setup frontend:**
```bash
cd jilaApp/frontend
npm install
```

3. **Configure environment:**
```bash
# Create .env file in jilaApp/backend/
MONGO_URI=your_mongodb_connection_string
```

### Running the Application

1. **Start backend:**
```bash
cd jilaApp/backend
source venv/bin/activate
python app.py
```

2. **Start frontend:**
```bash
cd jilaApp/frontend
npm start
```

3. **Access applications:**
- **User Interface**: http://localhost:3000
- **Admin Dashboard**: Open `internalTool/index.html` (password: `jila-internaltool`)

## 📁 Project Structure

```
jilaApp/
├── backend/                 # Flask API server
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables (not in repo)
├── frontend/               # React web application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main app with routing
│   │   └── index.js       # App entry point
│   └── package.json       # Node.js dependencies
└── internalTool/           # Admin dashboard
    ├── index.html         # Main dashboard page
    ├── script.js          # Frontend JavaScript
    └── styles.css         # Dashboard styling
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/fetch/topics` | Get all topics with icons |
| GET | `/fetchTopic/<name>` | Get videos for specific topic |
| GET | `/fetchVideos/all` | Get all videos |
| PUT | `/addVideo` | Add new video |
| POST | `/addTopic` | Add new topic with icon |
| DELETE | `/deleteVideo/<name>` | Delete video |
| DELETE | `/deleteTopic/<name>` | Delete topic |

## 🎯 Key Features

### React Frontend
- **Responsive Design**: Works on desktop and mobile
- **Topic Navigation**: Browse topics with visual icons
- **Video Playback**: Direct YouTube integration
- **Modern UI**: Clean, professional interface

### Admin Dashboard
- **Content Management**: Add/edit/delete videos and topics
- **Secure Access**: Password-protected interface
- **Real-time Updates**: Changes reflect immediately

### Flask Backend
- **RESTful API**: Clean, documented endpoints
- **CORS Enabled**: Cross-origin requests supported
- **Error Handling**: Robust error responses
- **MongoDB Integration**: Scalable data storage

## 🔒 Security Features

- Password-protected admin access
- Environment variables for sensitive data
- CORS configuration for API security
- Input validation and sanitization

## 📱 Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes
