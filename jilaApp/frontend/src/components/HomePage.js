import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

// Async function to fetch topics from your server
async function fetchAllTopics() {
    console.log("Fetching topics from the server...");
    try {
        const response = await fetch('/fetch/topics');
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const topics = await response.json();
        console.log("Data converted to JSON:", topics);
        return topics.map(topic => {
            const base64String = topic.icon.split('base64,')[1];
            if (!base64String) {
                throw new Error(`Base64 string not found in topic icon for topic '${topic.topicName}'`);
            }
            const mimeType = topic.icon.substring(5, topic.icon.indexOf(';'));
            if (!mimeType) {
                throw new Error(`MIME type not found in topic icon for topic '${topic.topicName}'`);
            }
            return {
                icon: `data:${mimeType};base64,${base64String}`,
                label: topic.topicName
            };
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export default function HomePage() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTopics = async () => {
            setLoading(true);
            try {
                const fetchedTopics = await fetchAllTopics();
                setTopics(fetchedTopics);
                setError(null);
            } catch (err) {
                setError("Failed to fetch topics. Click to retry.");
                console.error(err);
            }
            setLoading(false);
        };

        loadTopics();
    }, []);

    const handleTopicClick = (topicName) => {
        navigate(`/topic/${topicName}`);
    };

    // Function to render each button
    const renderButton = (button) => (
        <div 
            key={button.label} 
            className="topic-button"
            onClick={() => handleTopicClick(button.label)}
        >
            <img className="topic-icon" src={button.icon} alt={button.label} />
            <span className="button-text">{button.label}</span>
        </div>
    );

    // Function to render each section
    const renderSection = (section) => (
        <div key={section.category} className="section">
            <h2 className="section-header">{section.category}</h2>
            <div className="section-content">
                {section.buttons.map(renderButton)}
            </div>
        </div>
    );

    const buttonData = [
        { category: 'Most Used', buttons: topics.slice(0, 3) },
        { category: 'All Topics', buttons: topics }
    ];

    return (
        <div className="homepage">
            <header className="header">
                <div className="header-content">
                    <div className="logo">🚀</div>
                    <h1 className="title">Jila App</h1>
                    <div className="logo">🚀</div>
                </div>
            </header>

            <main className="main-content">
                {loading ? (
                    <div className="loading">Loading topics...</div>
                ) : error ? (
                    <button className="error-button" onClick={() => window.location.reload()}>
                        {error}
                    </button>
                ) : (
                    buttonData.map(renderSection)
                )}
            </main>

            <nav className="nav-bar">
                <div className="nav-item">🏠</div>
                <div className="nav-item">📚</div>
                <div className="nav-item">⚙️</div>
            </nav>
        </div>
    );
}
