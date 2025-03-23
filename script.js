// List of MP3 files (Manually add the file names)
const mp3Files = ["song1.mp3", "song2.mp3", "song3.mp3"];

const mp3List = document.getElementById("mp3List");
const audioPlayer = document.getElementById("audioPlayer");

// Populate the dropdown with MP3 files
mp3Files.forEach(file => {
    let option = document.createElement("option");
    option.value = "Assets/mp3/" + file;
    option.textContent = file;
    mp3List.appendChild(option);
});

// Change audio source when selecting a file
mp3List.addEventListener("change", () => {
    audioPlayer.src = mp3List.value;
    audioPlayer.play();
});
