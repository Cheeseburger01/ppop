document.getElementById("fileInput").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let objectURL = URL.createObjectURL(file);
        let audioPlayer = document.getElementById("audioPlayer");
        audioPlayer.src = objectURL;
        audioPlayer.play();
    }
});
