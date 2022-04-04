"use strict";

// Save DOM objects to variables
const tree = document.querySelector("#tree");
const gameArea = document.querySelector("#game-area");
const containerWidth = gameArea.clientWidth;
const restartBtn = document.querySelector("#restart-btn");

// make some variables accesible to functions.
const speed = 2;
let animationReq;

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

function update() {
  updateTree();
}

function gameLoop() {
  update();
  animationReq = requestAnimationFrame(gameLoop);
}

function reset() {
  // randomize position
  tree.style.right = `0`;
  // randomize height
  tree.style.height = `${20 + parseInt(Math.random() * 20)}px`;

  // randomize width
  tree.style.width = `${10 + parseInt(Math.random() * 10)}px`;
  if (animationReq) {
    cancelAnimationFrame(animationReq);
  }
}

restartBtn.addEventListener("click", startGame);