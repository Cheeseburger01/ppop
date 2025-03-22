// List of MP3 files stored locally in the assets folder
const songs = [
    { name: "Song 1", url: "assets/mp3/song1.mp3" },
    { name: "Song 2", url: "assets/mp3/song2.mp3" },
    { name: "Song 3", url: "assets/mp3/song3.mp3" }
];

const audioPlayer = document.getElementById("audioPlayer");
const playlistEl = document.getElementById("playlist");
let currentIndex = 0;
let isShuffle = false;

// Create Playlist UI
function createPlaylist() {
    playlistEl.innerHTML = ""; // Clear existing playlist
    const songList = isShuffle ? shuffleArray(songs) : songs;

    songList.forEach((song, index) => {
        let li = document.createElement("li");
        li.textContent = song.name;
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
