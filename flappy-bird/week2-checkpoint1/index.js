"use strict";

// Save DOM objects to variables
const bird = document.querySelector('#bird');
const poles = document.querySelectorAll('.pole');
const gameArea = document.querySelector('#game-area');
const restartBtn = document.querySelector('#restart-btn');
const containerWidth = gameArea.clientWidth;
const containerHeight = gameArea.clientHeight;

// make some variables accesible to functions.
const speed = 2;
let flapping = false;
let animationReq;

function startGame() {
    reset();
    gameLoop();
}

function updatePoles() {
    // Move poles
    let polesCurrentPos = parseFloat(window.getComputedStyle(poles[0]).getPropertyValue("right"));

    //  Check whether the poles went putside of game area.
    if (polesCurrentPos > containerWidth) {

        // Generate new poles. 
        let newHeight = parseInt(Math.random() * 100);
        // Change the poles' height
        poles[0].style.height = `${100 + newHeight}px`;
        poles[1].style.height = `${100 - newHeight}px`;

        // Move poles back to the right-hand side of game area.
        polesCurrentPos = 0; // This is based on the "right" property.
    }

    poles.forEach((pole) => {
        pole.style.right = `${polesCurrentPos + speed}px`;
    });
}

function update() {
    updatePoles();

    // Move bird
    let birdTop = parseFloat(window.getComputedStyle(bird).getPropertyValue("top"));
    if (flapping) {
        bird.style.top = birdTop + -2 + "px";
    } else if (birdTop < containerHeight - bird.clientHeight) {
        bird.style.top = birdTop + 2 + "px";
    }
}

function gameLoop() {
    update();
    animationReq = requestAnimationFrame(gameLoop);
}

// Start flapping with mousedown
gameArea.addEventListener("mousedown", function (e) {
    flapping = true;
});

// stop flapping with mousedown
gameArea.addEventListener("mouseup", function (e) {
    flapping = false;
});

function reset() {
    flapping = false;
    poles.forEach((pole) => {
        pole.style.right = 0;
    });
    bird.style.top = "20%";
    if(animationReq) {
        cancelAnimationFrame(animationReq);
    }
}

restartBtn.addEventListener('click', startGame);