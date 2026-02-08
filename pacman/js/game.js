import { drawHeart, drawWall, drawPlan, resetLayout } from "./board.js";
import { placePacman, drawPacman, handleKeyPress, checkFoodCollision, pacman } from "./pacman.js";
import Ghost from "./Ghost.js";

const score = document.getElementById("score");
const endOfGame = document.getElementById("win");

let scoreCounter = 0;
let gameInterval;
let ghosts = [];

// Désactiver le scroll avec les fleches, trouvée sur internet.
window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


document.addEventListener("keydown", handleKeyPress);

// Init le jeu
function initGame() {
    resetLayout();
    scoreCounter = 0;
    score.textContent = scoreCounter;

    drawPlan();
    drawWall();
    drawHeart();

    placePacman(1, 3);
    drawPacman();

    ghosts = [
        new Ghost("Blinky", 9, 9, "#FF0000"),
        new Ghost("Pinky", 10, 9, "#FFB8FF"),
        new Ghost("Inky", 9, 10, "#00FFFF"),
    ];
    ghosts.forEach(ghost => {
        ghost.placeGhost();
        ghost.drawGhost();
    });
}

function gameLoop() {
    if (checkFoodCollision()) {
        scoreCounter++;
        score.textContent = scoreCounter;
    }

    ghosts.forEach(ghost => ghost.clearGhost());

    drawPlan();
    drawWall();
    drawHeart();
    drawPacman();

    ghosts.forEach(ghost => {
        ghost.move(pacman.x, pacman.y);
        ghost.drawGhost();
    });

    if (scoreCounter === 15) {
        clearInterval(gameInterval);

        endOfGame.classList.remove("hidden");
        endOfGame.innerHTML = `
            <h2><strong>Gagné</strong></h2>
            <button id="restart">Relancer</button>
            <button id="level-sup">Page surprise</button>
        `;

        document.getElementById("restart").onclick = restartGame;
        document.getElementById("level-sup").onclick = () => { window.top.location.href = "../fin.html"; };
    }

    else if (ghosts.some(ghost => ghost.checkCollisionWithPacman(pacman.x, pacman.y))) {
        clearInterval(gameInterval);

        endOfGame.classList.remove("hidden");
        endOfGame.innerHTML = `
            <h2><strong>Game Over</strong></h2>
            <button id="restart">Relancer</button>
           
        `;

        document.getElementById("restart").onclick = restartGame;
        document.getElementById("level-sup").onclick = () => { window.top.location.href = "../fin.html"; };
    }
}

function restartGame() {
    endOfGame.classList.add("hidden");
    endOfGame.innerHTML = "";

    initGame();

    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 16);
}

// Démarrage
initGame(); 
gameInterval = setInterval(gameLoop, 16);
