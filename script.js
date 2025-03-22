// Placeholder for the song data and player
let isPlaying = false;
let currentSong = {
    name: "Song Name",
    artist: "Artist Name",
    albumCover: "https://via.placeholder.com/150",
    progress: 0
};

const playButton = document.querySelector('.play');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const progressBar = document.querySelector('#song-progress');
const volumeControl = document.querySelector('#volume');

function updateSongProgress() {
    if (isPlaying) {
        currentSong.progress += 0.1;
        if (currentSong.progress >= 100) {
            currentSong.progress = 0;
        }
        progressBar.value = currentSong.progress;
    }
}

playButton.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playButton.textContent = isPlaying ? 'Pause' : 'Play';
    if (isPlaying) {
        setInterval(updateSongProgress, 100);
    }
});

prevButton.addEventListener('click', () => {
    alert("Previous song!");
    // Implement previous song functionality
});

nextButton.addEventListener('click', () => {
    alert("Next song!");
    // Implement next song functionality
});

volumeControl.addEventListener('input', (e) => {
    let volume = e.target.value;
    console.log(`Volume changed to: ${volume}`);
    // Adjust volume functionality here
});
