const player = document.getElementById("player");
const cactus = document.getElementById("cactus");

// Runs when page is loaded
window.onload = function() {
    UpdateInfoText("Jump with space");
};

//Runs when space key is pressed
document.addEventListener("keydown", function(event) {

    if (event.key === " " && !event.repeat) {
        Jump();
    }

});

//Runs when player collided with bullet
let isAlive = setInterval( function() {

    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

    if (cactusLeft < 50 && cactusLeft > 0 && playerTop >= 400) {
        SetGameOver();
    }

}, 10);

function UpdateInfoText(text) {
    document.getElementById("infoText").textContent = String(text);
}

function Jump() {

    if (player.classList != "jump") {
        player.classList.add("jump")
    }

    setTimeout( function() {
        player.classList.remove("jump")
    }, 300);

}

function SetGameOver(){
    UpdateInfoText("GameOver!");
    cactus.classList.add("paused");
    cactus.style.backgroundImage = "none";
}