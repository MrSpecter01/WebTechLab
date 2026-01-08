// Helper function to format seconds into MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// 1. Video Logic
const video = document.getElementById('myVideo');
const videoTimeDisplay = document.getElementById('videoTime');

video.addEventListener('timeupdate', () => {
    videoTimeDisplay.innerText = formatTime(video.currentTime);
});

// 2. Audio Logic
const audio = document.getElementById('myAudio');
const audioTimeDisplay = document.getElementById('audioTime');

audio.addEventListener('timeupdate', () => {
    audioTimeDisplay.innerText = formatTime(audio.currentTime);
});