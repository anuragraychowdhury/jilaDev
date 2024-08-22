async function fetchVideos() {
    try {
        const response = await fetch('http://api.jila-app.org/fetchVideos/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}

async function fetchAllTopics() {
    try {
        const response = await fetch('http://api.jila-app.org/fetch/topics');
        if (!response.ok) {
            throw new Error("network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}

// edit functionality tbd.
// function createVideoGridItem(video) {
//     const videoItem = document.createElement('div');
//     videoItem.classList.add('grid-item');

//     const editButton = document.createElement('button');
//     editButton.textContent = 'Edit';

//     const saveButton = document.createElement('button');
//     saveButton.textContent = 'Save';
//     saveButton.style.display = 'none'; 

//     const videoInfo = `
//         <h3>${video.title}</h3>
//         <p><strong>Length:</strong> ${video.length}</p>
//         <p><strong>Topic:</strong> ${video.topicName ? video.topicName : video.category}</p>
//         <p><a href="${video.youtubeLink}" target="_blank">Watch Video</a></p>
//     `;

//     const editForm = `
//         <h3><input type="text" value="${video.title}"></h3>
//         <p><strong>Length:</strong> <input type="text" value="${video.length}"></p>
//         <p><strong>Topic:</strong> <input type="text" value="${video.topicName ? video.topicName : video.category}"></p>
//         <p><strong>YouTube Link:</strong> <input type="text" value="${video.youtubeLink}"></p>
//         <p><a href="${video.youtubeLink}" target="_blank">Watch Video</a></p>
//     `;

//     let inEditMode = false;

//     const toggleEditMode = () => {
//         inEditMode = !inEditMode;

//         if (inEditMode) {
//             videoItem.innerHTML = editForm;
//             videoItem.appendChild(saveButton);
//             saveButton.style.display = 'inline-block';
//             editButton.style.display = 'none';
//         } else {
//             videoItem.innerHTML = videoInfo;
//             videoItem.appendChild(editButton);
//             saveButton.style.display = 'none';
//             editButton.style.display = 'inline-block'; 
//         }
//     };

//     editButton.addEventListener('click', toggleEditMode);
//     saveButton.addEventListener('click', () => {
//         const inputs = videoItem.querySelectorAll('input');
//         const updatedVideo = {
//             title: inputs[0].value,
//             length: inputs[1].value,
//             topicName: inputs[2].value,
//             youtubeLink: inputs[3].value, 
//         };

//         fetch('/editVideo', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedVideo),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log('Success:', data);
//                 toggleEditMode();
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     });

//     videoItem.innerHTML = videoInfo;
//     videoItem.appendChild(editButton);

//     return videoItem;
// }

async function addVideo() {
    console.log("reached here");
    const title = document.getElementById('videoTitleInput').value;
    const length = document.getElementById('videoLengthInput').value;
    const show = document.getElementById('videoShowInput').value;
    const topic = document.getElementById('videoTopicNameInput').value;
    const youtubeLink = document.getElementById('videoYoutubeLinkInput').value;

    const videoData = JSON.stringify({
        title: title,
        show: show,
        topicName: topic,
        length: length,
        youtubeLink: youtubeLink,
    })

    fetch('http://api.jila-app.org/addVideo', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: videoData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            console.log('topic added successfully!');
        }
    })
        .then(data => {
            console.log('Topic added successfully:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    // location.reload();
}

async function addTopic() {
    const topicName = document.getElementById('topicNameInput').value;
    const topicImageInput = document.getElementById('topicImageInput');
    const topicImage = topicImageInput.files[0];

    if (!topicName || !topicImage) {
        alert("Please enter topic name and select an image.");
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(topicImage);
    reader.onload = function () {
        const base64Image = reader.result;
        const body = JSON.stringify({ topicName: topicName, icon: base64Image });
        fetch('http://api.jila-app.org/addTopic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                console.log('topic added successfully!');
            }
        })
            .then(data => {
                console.log('Topic added successfully:', data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    };
    // location.reload();
}
function deleteTopic(topicName) {
    fetch(`http://api.jila-app.org/deleteTopic/${encodeURIComponent(topicName)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log('Topic deleted successfully:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function deleteVideo(videoName) {
    fetch(`http://api.jila-app.org/deleteVideo/${encodeURIComponent(videoName)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log('Topic deleted successfully:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function createVideoGridItem(video) {
    const videoItem = document.createElement('div');
    videoItem.classList.add('grid-item');

    // delete button logic
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this video?')) {
            deleteVideo(video.title);
        }
    });

    if ('title' in video && 'youtubeLink' in video) {
        videoItem.innerHTML = `
            <h3>${video.title}</h3>
            <p><strong>Length:</strong> ${video.length}</p>
            <p><strong>Topic:</strong> ${video.topicName ? video.topicName : video.category}</p>
            <p><a href="${video.youtubeLink}" target="_blank">Watch Video</a></p>
        `;
        videoItem.appendChild(deleteButton);
    } else {
        videoItem.innerHTML = `<p>Malformed video object</p>`;
    }
    return videoItem;
}

function addTopicToGrid(topic) {
    const topicsGrid = document.getElementById('topicsGrid');
    const topicItem = createTopicGridItem(topic);
    topicsGrid.appendChild(topicItem);
}

function createTopicGridItem(topic) {
    const topicItem = document.createElement('div');
    topicItem.classList.add('grid-item');

    if ("topicName" in topic && "icon" in topic) {
        const iconImg = document.createElement('img');
        iconImg.src = topic.icon;
        iconImg.alt = topic.topicName + ' icon';
        iconImg.classList.add('topic-icon');

        const topicName = document.createElement('h3');
        topicName.textContent = topic.topicName;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            deleteTopic(topic.topicName);
        });

        topicItem.appendChild(iconImg);
        topicItem.appendChild(topicName);
        topicItem.appendChild(deleteButton);
    } else {
        topicItem.innerHTML = `<p>Malformed topic object</p>`;
    }
    return topicItem;
}

function renderVideos(videos) {
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = ''; // Clear existing content
    console.log(videos);
    videos.forEach(video => {
        const videoItem = createVideoGridItem(video);
        videosGrid.appendChild(videoItem);
    });
}

function renderTopics(topics) {
    const topicsGrid = document.getElementById('topicsGrid');
    topicsGrid.innerHTML = '';

    if (topics.length === 0) {
        topicsGrid.innerHTML = '<p>No topics available</p>';
        return;
    }
    topics.forEach(topic => {
        const topicItem = createTopicGridItem(topic);
        topicsGrid.appendChild(topicItem);
    });
}

function checkPassword() {
    // password is here, feel free to change
    const correctPassword = 'jila-internaltool'; 
    const inputPassword = document.getElementById('passwordInput').value;

    if (inputPassword === correctPassword) {
        document.getElementById('passwordPrompt').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block'; 
    } else {
        alert('Incorrect password, please try again.');
    }
}

window.onload = async function () {
    const videos = await fetchVideos();
    const topics = await fetchAllTopics();
    renderVideos(videos);
    renderTopics(topics);
};

