const songs = [
    { url: "assets/mp3/relaxing-music.mp3" },
    { url: "assets/mp3/summer-vibes.mp3" },
    { url: "assets/mp3/chill-beats.mp3" }
];

const audioPlayer = document.getElementById("audioPlayer");
const playlistEl = document.getElementById("playlist");
let currentIndex = 0;
let isShuffle = false;

// Function to extract the file name (without extension) from the URL
function getSongName(filePath) {
    const fileName = filePath.split('/').pop(); // Get the file name with extension
    return fileName.replace('.mp3', ''); // Remove the .mp3 extension to use the name
}

// Create Playlist UI
function createPlaylist() {
    playlistEl.innerHTML = ""; // Clear existing playlist
    const songList = isShuffle ? shuffleArray(songs) : songs;

    songList.forEach((song, index) => {
        let li = document.createElement("li");
        li.textContent = getSongName(song.url); // Use the file name as the song name
        li.addEventListener("click", () => playSong(index));
        playlistEl.appendChild(li);
    });
}

// Shuffle the playlist
function shuffleArray(array) {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
}

// Play selected song
function playSong(index) {
    currentIndex = index;
    audioPlayer.src = songs[currentIndex].url;
    audioPlayer.play();
    highlightPlaying();
}

// Highlight Currently Playing Song
function highlightPlaying() {
    let items = playlistEl.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        items[i].style.color = (i === currentIndex) ? "#ff4f81" : "black";
        items[i].style.fontWeight = (i === currentIndex) ? "bold" : "normal";
    }
}

// Play Next Song When Current One Ends
audioPlayer.addEventListener("ended", () => {
    playSong((currentIndex + 1) % songs.length); // Next song
});

// Shuffle Button Click
document.getElementById("shuffleButton").addEventListener("click", () => {
    isShuffle = !isShuffle; // Toggle shuffle mode
    createPlaylist(); // Update the playlist
});

// Initialize Playlist
createPlaylist();
