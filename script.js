const player = document.getElementById("player");
const cactus = document.getElementById("cactus");
const infoText = document.getElementById("info-text");
const scoreText = document.getElementById("score-text");

let isPressedSpace = false;
let isDead = false;
let score;

// Runs when page is loaded
window.onload = function() {

    createGround();

    score = 0;
    updateScoreText(score);
    updateInfoText("Jump with space");
};

//Runs when some key is pressed
document.addEventListener("keydown", function(event) {

    if (event.key === " " && !event.repeat) {
        
        if (!isDead) {
            isPressedSpace = true;
            doPlayerJump();
        }
    }

    if (event.key === "r") {
        
        if (isDead) {
            this.location.reload();
        }
    }

    if (event.key === "p") {
        
        window.location.href = "index.html";
    }

});

//Runs when player collided with cactus
let collisionDetection = setInterval( function() {

    const playerRect = player.getBoundingClientRect();
    const obstacleRect = cactus.getBoundingClientRect();

    if ((playerRect.right > obstacleRect.left) && !isPressedSpace) {
        initializeGameOver();
    }

}, 10);

let scoreController = setInterval( () => {

    if (!isDead) {
        score++;
        updateScoreText(score);
    }

}, 1000);

function updateScoreText(score) {
    scoreText.textContent = `score: ${String(score)}`;
}

function updateInfoText(text) {
    infoText.textContent = String(text);
}

function doPlayerJump() {

    if (player.classList != "jump" && !isDead) {
        player.classList.add("jump")
    }

    setTimeout( function() {
        player.classList.remove("jump")
        isPressedSpace = false;
    }, 300);

}

function initializeGameOver() {

    isDead = true;
    updateInfoText("GameOver! Press R to restart or P to exit...");
    cactus.style.backgroundImage = "none";
    player.style.backgroundImage = "url(img/deadPlayer.gif)";

}

function createGround() {

    const pixelColors = ['#8B4513', '#D2691E', '#A52A2A', '#8B4513', '#D2691E'];
    const numberOfPixels = 140;
    const pixelArtContainer = document.getElementById('pixelArtContainer');

    for (let i = 0; i < numberOfPixels; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.backgroundColor = pixelColors[Math.floor(Math.random() * pixelColors.length)];
        pixelArtContainer.appendChild(pixel);
    }
    
}