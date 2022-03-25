"use strict";

// Save DOM objects to variables
const poles = document.querySelectorAll(".pole");
const gameArea = document.querySelector("#game-area");
const containerWidth = gameArea.clientWidth;
const containerHeight = gameArea.clientHeight;
const restartBtn = document.querySelector("#restart-btn");

// make some variables accesible to functions.
const speed = 2;
let animationReq;


function startGame() {
  reset();
  gameLoop();
}

function updatePoles() {
  // Move poles
  let polesCurrentPos = parseFloat(
    window.getComputedStyle(poles[0]).getPropertyValue("right")
  );

  poles.forEach((pole) => {
    pole.style.right = `${polesCurrentPos + speed}px`;
  });
}

function update() {
  updatePoles();
}

function gameLoop() {
  update();
  animationReq = requestAnimationFrame(gameLoop);
}

function reset() {
  poles.forEach((pole) => {
    pole.style.right = 0;
  });
  if (animationReq) {
    cancelAnimationFrame(animationReq);
  }
}

restartBtn.addEventListener('click', startGame);