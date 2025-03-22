let audioPlayer = document.getElementById("audioPlayer");
let fileInput = document.getElementById("fileInput");
let playlistEl = document.getElementById("playlist");
let shuffleBtn = document.getElementById("shuffleBtn");

let songs = [];
let currentIndex = 0;
let isShuffle = false;

// Retrieve songs from sessionStorage if available
if (sessionStorage.getItem("songs")) {
    songs = JSON.parse(sessionStorage.getItem("songs"));
    createPlaylist();
}

// Handle file selection
fileInput.addEventListener("change", function(event) {
    let files = Array.from(event.target.files); // Convert FileList to Array
    let newSongs = files.map(file => ({ name: file.name, url: URL.createObjectURL(file) }));
    songs = songs.concat(newSongs);
    
    // Save the new list of songs to sessionStorage
    sessionStorage.setItem("songs", JSON.stringify(songs));
    
    createPlaylist();
    playSong(0); // Start playing first song
});

// Create Playlist UI
function createPlaylist() {
    playlistEl.innerHTML = ""; // Clear existing playlist
    songs.forEach((song, index) => {
        let li = document.createElement("li");
        li.textContent = song.name;
        li.addEventListener("click", () => playSong(index));
        playlistEl.appendChild(li);
    });
}

// Play Selected Song
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
    if (isShuffle) {
        playSong(Math.floor(Math.random() * songs.length)); // Random song
    } else {
        playSong((currentIndex + 1) % songs.length); // Next song
    }
});

// Toggle Shuffle Mode
shuffleBtn.addEventListener("click", function() {
    isShuffle = !isShuffle;
    shuffleBtn.textContent = isShuffle ? "Shuffle: ON" : "Shuffle: OFF";
});
