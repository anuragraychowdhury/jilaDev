/**
 * Jila App - Main React Application
 * =================================
 * 
 * Main React component with routing for the Jila video and topic management system.
 * Provides navigation between the homepage (topics) and video pages.
 * 
 * Features:
 * - React Router for client-side navigation
 * - HomePage: Browse all available topics
 * - VideoPage: View videos for a specific topic
 * - Responsive design with modern UI
 * 
 * Author: Anurag Raychowdhury
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import VideoPage from './components/VideoPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topic/:topicName" element={<VideoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
