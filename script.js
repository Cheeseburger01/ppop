const songs = [
    "assets/mp3/relaxing-music.mp3",
    "assets/mp3/summer-vibes.mp3",
    "assets/mp3/chill-beats.mp3"
];

const audioPlayer = document.getElementById("audioPlayer");
const playlistEl = document.getElementById("playlist");
const shuffleButton = document.getElementById("shuffleButton");

let isShuffle = false;
let currentPlaylist = [...songs];

// Function to extract song name from filename
function getSongName(filePath) {
    return filePath.split('/').pop().replace('.mp3', '').replace(/-/g, ' ');
}

// Create the Playlist
function createPlaylist() {
    playlistEl.innerHTML = "";
    currentPlaylist.forEach((song, index) => {
        let li = document.createElement("li");
        li.textContent = getSongName(song);
        li.addEventListener("click", () => playSong(index));
        playlistEl.appendChild(li);
    });
}

// Play a Selected Song
function playSong(index) {
    audioPlayer.src = currentPlaylist[index];
    audioPlayer.play();
    highlightPlaying(index);
}

// Highlight Currently Playing Song
function highlightPlaying(index) {
    const items = playlistEl.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        items[i].classList.toggle("playing", i === index);
    }
}

// Shuffle Playlist
shuffleButton.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleButton.textContent = isShuffle ? "Unshuffle" : "Shuffle";
    currentPlaylist = isShuffle ? shuffleArray([...songs]) : [...songs];
    createPlaylist();
});

// Shuffle Array Function
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Autoplay Next Song
audioPlayer.addEventListener("ended", () => {
    let currentIndex = currentPlaylist.indexOf(audioPlayer.src.split('/').pop());
    playSong((currentIndex + 1) % currentPlaylist.length);
});

// Initialize
createPlaylist();
