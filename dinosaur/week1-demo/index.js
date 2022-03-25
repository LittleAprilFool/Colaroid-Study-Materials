"use strict";

// Save DOM objects to variables
const trees = document.querySelectorAll(".tree");
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

function updateTrees() {
  // Move poles
  let tree1CurrentPos = parseFloat(
    window.getComputedStyle(trees[0]).getPropertyValue("right")
  );

  let tree2CurrentPos = parseFloat(
    window.getComputedStyle(trees[1]).getPropertyValue("right")
  );

  let nextTree = tree1CurrentPos < tree2CurrentPos ? trees[1] : trees[0];
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

function update() {
  updateTrees();
}

function gameLoop() {
  update();
  animationReq = requestAnimationFrame(gameLoop);
}

function reset() {
  // randomize position
  trees[0].style.right = `0`;
  trees[1].style.right = `-${250 + parseInt(Math.random() * 100)}px`;
  // randomize height
  trees[1].style.height = `${20 + parseInt(Math.random() * 20)}px`;

  // randomize width
  trees[1].style.width = `${10 + parseInt(Math.random() * 10)}px`;
  if (animationReq) {
    cancelAnimationFrame(animationReq);
  }
}

restartBtn.addEventListener("click", startGame);
