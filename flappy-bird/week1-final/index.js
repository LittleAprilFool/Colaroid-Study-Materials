"use strict";

// Save DOM objects to variables
const poles = document.querySelectorAll('.pole');
const pole1 = document.querySelector('#pole-1');
const pole2 = document.querySelector('#pole-2');
const gameArea = document.querySelector('#game-area');
const containerWidth = gameArea.clientWidth;
const containerHeight = gameArea.clientHeight;
const restartBtn = document.querySelector('#restart-btn');

// make some variables accesible to functions.
const speed = 2;
const playing = true;
let polesCurrentPos;

function startGame() {
    gameLoop();
}

function resetPoles() {
    poles.forEach((pole) => {
        pole.style.right = 0;
    });
}

function updatePoles() {
    // Move poles
    polesCurrentPos = parseFloat(window.getComputedStyle(poles[0]).getPropertyValue("right"));

    //  Check whether the poles went putside of game area.
    if (polesCurrentPos > containerWidth) {

        // Generate new poles. 
        let newHeight = parseInt(Math.random() * 100);
        // Change the poles' height
        pole1.style.height = `${100 + newHeight}px`;
        pole2.style.height = `${100 - newHeight}px`;

        // Move poles back to the right-hand side of game area.
        polesCurrentPos = 0; // This is based on the "right" property.

    }

    poles.forEach((pole) => {
        pole.style.right = `${polesCurrentPos + speed}px`;
    });
}

function update() {
    updatePoles();
}

function gameLoop() {
    update();
    if (playing) {
        requestAnimationFrame(gameLoop);
    }
}

restartBtn.addEventListener('click', resetPoles);

startGame();