"use strict";

// Save DOM objects to variables
const trees = document.querySelectorAll(".tree");
const dinosaur = document.querySelector("#dinosaur");
const gameArea = document.querySelector("#game-area");
const scoreSpan = document.querySelector("#score");
const speedSpan = document.querySelector("#speed");
const containerWidth = gameArea.clientWidth;
const containerHeight = gameArea.clientHeight;
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
let nextTree;

function startGame() {
  reset();
  gameLoop();
}

function updateTrees() {
  // Move poles
  let tree1CurrentPos = parseFloat(
    window.getComputedStyle(trees[0]).getPropertyValue("right")
  );

  let tree2CurrentPos = parseFloat(
    window.getComputedStyle(trees[1]).getPropertyValue("right")
  );

  nextTree = tree1CurrentPos < tree2CurrentPos ? trees[1] : trees[0];
  let nextCurrentPos =
    tree1CurrentPos < tree2CurrentPos ? tree2CurrentPos : tree1CurrentPos;
  //  Check whether the trees went putside of game area.
  if (nextCurrentPos > containerWidth) {
    // Generate new poles.
    let newRight = `-${100 + parseInt(Math.random() * 200)}px`;
    // Change the next tree's right
    nextTree.style.right = newRight;
    // randomize height
    nextTree.style.height = `${20 + parseInt(Math.random() * 20)}px`;

    // randomize width
    nextTree.style.width = `${10 + parseInt(Math.random() * 10)}px`;
  }

  trees.forEach((tree) => {
    let treePos = parseFloat(
      window.getComputedStyle(tree).getPropertyValue("right")
    );
    tree.style.right = `${treePos + speed}px`;
  });
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
  if (collision(dinosaur, nextTree)) {
    gameOver();
  }
}

function gameOver() {
  playing = false;
  restartBtn.addEventListener("click", startGame);
}

function update() {
  updateTrees();
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
  trees[0].style.right = `0`;
  trees[1].style.right = `-${250 + parseInt(Math.random() * 100)}px`;
  // randomize height 20-40
  trees[1].style.height = `${20 + parseInt(Math.random() * 20)}px`;
  // randomize width 10-20
  trees[1].style.width = `${10 + parseInt(Math.random() * 10)}px`;
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