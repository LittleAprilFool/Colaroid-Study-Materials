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

// Move poles
function updateTree() {

  // treeCurrentPos gets the current position of the tree
  let treeCurrentPos = parseFloat(
    window.getComputedStyle(tree).getPropertyValue("right")
  );

  // if the tree disappears from the game area, we move it to the right as if a new tree is generated
  if (treeCurrentPos > containerWidth) {

    // reset tree's right position to 0
    treeCurrentPos = 0;
    
    // this line generates a random number between 20 and 40
    const newHeight = 20 + parseInt(Math.random() * 20);
    // set the tree's height
    tree.style.height = `${newHeight}px`;

    // this line generates a random number between 10 and 20
    const newWidth = 10 + parseInt(Math.random() * 10);
    
    // set the tree's width
    tree.style.width = `${newWidth}px`;
  }

  // we move the tree's right position by the value of speed
  tree.style.right = `${treeCurrentPos + speed}px`;
}

function update() {
  updateTree();
  // TODO: update the dinosaur's position if the dinosaur is moving
}

function gameLoop() {
  update();
  animationReq = requestAnimationFrame(gameLoop);
}

function reset() {
  // reset the tree's position
  tree.style.right = `0`;
 
  // TODO: reset the dinosaur's position
  if (animationReq) {
    cancelAnimationFrame(animationReq);
  }
}

restartBtn.addEventListener("click", startGame);

// test the collision function
// it should return False
console.log(collision(tree, dinosaur))