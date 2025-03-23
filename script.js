document.addEventListener("DOMContentLoaded", function () {
    const mp3List = document.getElementById("mp3List");
    const audioPlayer = document.getElementById("audioPlayer");

    // Manually list MP3 files (GitHub Pages doesn't allow auto-folder scanning)
    const mp3Files = ["song1.mp3", "song2.mp3", "song3.mp3"]; // Add your actual MP3 file names here

    // Add MP3 files to dropdown
    mp3Files.forEach(file => {
        let option = document.createElement("option");
        option.value = "Assets/mp3/" + file;
        option.textContent = file;
        mp3List.appendChild(option);
    });

    // Play selected MP3 file
    mp3List.addEventListener("change", () => {
        if (mp3List.value !== "") {
            audioPlayer.src = mp3List.value;
            audioPlayer.play();
        }
    });
});
