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
    let polesCurrentPos = parseFloat(window.getComputedStyle(poles[0]).getPropertyValue("right"));

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