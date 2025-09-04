# Jila Frontend

A React web application for managing videos and topics, converted from React Native.

## Features

- **Homepage**: Display all available topics with icons
- **Video Page**: Show videos for a specific topic with YouTube links
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface with hover effects

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Your Flask backend running on port 5001

## Complete System Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- Python 3.7+ with virtual environment
- MongoDB Atlas cluster running
- Your Flask backend running on port 5001

### Step-by-Step Setup

#### **Step 1: Start Your Flask Backend (Terminal 1)**
```bash
cd jilaApp/backend
source venv/bin/activate
python app.py
```
**✅ Expected Output**: "the api is up!" (keep this terminal running)

#### **Step 2: Install React Dependencies (Terminal 2)**
```bash
cd jilaApp/frontend
npm install
```
**✅ Expected Output**: Dependencies installed successfully

#### **Step 3: Start Your React Frontend (Terminal 2)**
```bash
npm start
```
**✅ Expected Output**: Browser opens automatically to `http://localhost:3000`

#### **Step 4: Test Your Internal Tool (Optional - Terminal 3)**
```bash
cd internalTool
# Open index.html in your browser
```
**✅ Expected Output**: Password-protected admin interface

### **What You'll Have Running:**

| Service | Port | Purpose | Status |
|---------|------|---------|---------|
| **Flask Backend** | 5001 | API + Database | ✅ Running |
| **React Frontend** | 3000 | User Interface | ✅ Running |
| **MongoDB** | Cloud | Database | ✅ Connected |
| **Internal Tool** | File | Admin Interface | ✅ Available |

### **Test Your System:**

#### **React App (http://localhost:3000):**
- Should show topics from your database
- Click topics to see videos
- Click play buttons to open YouTube

#### **API Endpoints (http://localhost:5001):**
- `/fetch/topics` - Get all topics
- `/fetchTopic/<name>` - Get videos for a topic
- `/fetchVideos/all` - Get all videos

### **Troubleshooting:**

#### **If React won't start:**
- Make sure you're in `jilaApp/frontend` directory
- Check if port 3000 is available
- Try `npm install` again

#### **If API calls fail:**
- Ensure Flask backend is running on port 5001
- Check browser console for errors
- Verify MongoDB connection

#### **If topics don't show:**
- Add a topic first through your internal tool
- Check browser console for API errors
- Verify the topic has an icon image

### **Success Indicators:**
- ✅ Flask shows "the api is up!"
- ✅ React opens at localhost:3000
- ✅ Topics display with icons
- ✅ Clicking topics shows videos
- ✅ YouTube links open correctly

## Installation (Quick Start)

If you just want to run the frontend:

## API Endpoints

The frontend expects these endpoints from your Flask backend:
- `GET /fetch/topics` - Get all topics
- `GET /fetchTopic/<topicName>` - Get videos for a specific topic

## Project Structure

```
src/
├── components/
│   ├── HomePage.js      # Main topics page
│   ├── HomePage.css     # Homepage styles
│   ├── VideoPage.js     # Videos for a topic
│   └── VideoPage.css    # Video page styles
├── App.js               # Main app component with routing
├── App.css              # Global styles
├── index.js             # App entry point
└── index.css            # Base styles
```

## Usage

1. **Homepage**: Browse all available topics
2. **Click a topic**: Navigate to see videos for that topic
3. **Watch videos**: Click the play button to open YouTube links
4. **Navigation**: Use the back button to return to topics

## Development

- The app uses React Router for navigation
- CSS modules for component-specific styling
- Responsive design with mobile-first approach
- Proxy configured to forward API calls to your Flask backend
