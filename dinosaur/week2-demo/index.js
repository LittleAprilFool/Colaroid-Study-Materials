"use strict";

// Save DOM objects to variables
const tree = document.querySelector("#tree");
const dinosaur = document.querySelector("#dinosaur");
const gameArea = document.querySelector("#game-area");
const scoreSpan = document.querySelector("#score");
const speedSpan = document.querySelector("#speed");
const containerWidth = gameArea.clientWidth;
const restartBtn = document.querySelector("#restart-btn");

// make some variables accesible to functions.
const bottomLine = 90;
let score;
let speed;
let animationReq;
let playing;
let isJumping;
let scoreUpdated;
let jumpMaxHeight = 200;
let dinosaurSpeed = 3;
let isDrop;

function startGame() {
  reset();
  gameLoop();
}

function updateTree() {
  // Move poles
  let treeCurrentPos = parseFloat(
    window.getComputedStyle(tree).getPropertyValue("right")
  );

  if (treeCurrentPos > containerWidth) {
    // reset tree's right
    treeCurrentPos = 0;

    // randomize height
    tree.style.height = `${20 + parseInt(Math.random() * 20)}px`;
    // randomize width
    tree.style.width = `${10 + parseInt(Math.random() * 10)}px`;
  }

  tree.style.right = `${treeCurrentPos + speed}px`;
}

function updateDinosaur() {
  if (isJumping) {
    let dinosaurCurrentPos = parseFloat(
      window.getComputedStyle(dinosaur).getPropertyValue("bottom")
    );

    if (isDrop) {
      let nextPos = dinosaurCurrentPos - dinosaurSpeed;
      if (nextPos < bottomLine) {
        isJumping = false;
        isDrop = false;
        dinosaur.style.bottom = `${bottomLine}px`;
        // Update speed
        speed += 0.25;
        speedSpan.textContent = parseInt(speed);
        scoreUpdated = false;
      } else {
        dinosaur.style.bottom = `${nextPos}px`;
      }
    } else {
      if (dinosaurCurrentPos < jumpMaxHeight) {
        dinosaur.style.bottom = `${dinosaurCurrentPos + dinosaurSpeed}px`;
      } else {
        dinosaurCurrentPos = `${jumpMaxHeight}px`;
        isDrop = true;
      }
    }
  }
}

function detectGameOver() {
  if (collision(dinosaur, tree)) {
    gameOver();
  }
}

function gameOver() {
  playing = false;
  restartBtn.addEventListener("click", startGame);
}

function update() {
  updateTree();
  updateDinosaur();
  detectGameOver();
  updateScore();
}

function updateScore() {
  if (!scoreUpdated) {
    score += 1;
    scoreUpdated = true;
  }
  scoreSpan.textContent = score;
}

function gameLoop() {
  update();
  if (playing) {
    animationReq = requestAnimationFrame(gameLoop);
  }
}

function reset() {
  playing = true;
  isJumping = false;
  isDrop = false;
  speed = 2;
  score = 0;
  speedSpan.textContent = speed;
  scoreSpan.textContent = score;
  scoreUpdated = true;
  // randomize position
  tree.style.right = `0`;
  // randomize height
  tree.style.height = `${20 + parseInt(Math.random() * 20)}px`;

  // randomize width
  tree.style.width = `${10 + parseInt(Math.random() * 10)}px`;
  dinosaur.style.bottom = `${bottomLine}px`;

  if (animationReq) {
    cancelAnimationFrame(animationReq);
  }
}

// Start flapping with mousedown
gameArea.addEventListener("mousedown", function (e) {
  if (playing) {
    if (!isJumping) {
      isJumping = true;
    }
  }
});

restartBtn.addEventListener("click", startGame);
