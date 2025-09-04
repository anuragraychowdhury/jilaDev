import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VideoPage.css';

// Helper function to open YouTube links
const openYouTubeVideo = (url) => {
  window.open(url, '_blank');
};

const VideoListItem = ({ title, duration, youtubeUrl }) => {
  return (
    <div className="video-list-item">
      <div className="video-info">
        <h3 className="video-title">{title}</h3>
        <p className="video-duration">{duration}</p>
      </div>
      <button 
        className="play-button"
        onClick={() => openYouTubeVideo(youtubeUrl)}
        title="Watch on YouTube"
      >
        ▶️
      </button>
    </div>
  );
};

export default function VideoPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topicName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`/fetchTopic/${topicName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        
        setVideos(data.map(video => ({
          id: video.title,
          title: video.title.replace('.mp4', ''),
          duration: video.length,
          youtubeUrl: video.youtubeLink
        })));
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setError('Failed to load videos');
        setLoading(false);
      }
    };

    fetchVideos();
  }, [topicName]);

  if (loading) {
    return (
      <div className="video-page">
        <div className="loading">Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="video-page">
      <div className="content-container">
        {/* Header */}
        <header className="video-header">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back
          </button>
          <h1 className="header-text">{topicName}</h1>
        </header>
        
        {/* Main content */}
        <main className="video-content">
          {videos.length === 0 ? (
            <div className="no-videos">
              <p>No videos available for this topic yet.</p>
              <button className="back-button" onClick={() => navigate('/')}>
                Go Back to Topics
              </button>
            </div>
          ) : (
            <div className="video-list">
              {videos.map((video) => (
                <VideoListItem 
                  key={video.id}
                  title={video.title} 
                  duration={video.duration} 
                  youtubeUrl={video.youtubeUrl} 
                />
              ))}
            </div>
          )}
        </main>
      </div>
      
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-item">🏠</div>
        <div className="nav-item">📚</div>
        <div className="nav-item">⚙️</div>
      </nav>
    </div>
  );
}
