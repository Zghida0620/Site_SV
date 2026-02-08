import { cellSize, isWall, eatFood, ctx } from './board.js';

let pacman = {
    x: 9,  //Position de départ
    y: 9,
    direction: "",
    color: "#FFFF00",
    size: 8,
    speed: 1
};

function placePacman(startX, startY) {
    pacman.x = startX;
    pacman.y = startY;
    pacman.direction = "";
}

function drawPacman() {
    let pixelX = pacman.x * cellSize;
    let pixelY = pacman.y * cellSize;

    // Centrer dans la case
    let centerX = pixelX + cellSize / 2;
    let centerY = pixelY + cellSize / 2;
    const r = cellSize / 2;

    // Dessiner Pac-Man
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0.2 * Math.PI, Math.PI * 1.8, false);
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = pacman.color;
    ctx.fill();
    ctx.closePath();
}

function clearPacman() {
    // Convertir en pixels
    let pixelX = pacman.x * cellSize;
    let pixelY = pacman.y * cellSize;

    // Dessiner un rectangle noir
    ctx.fillStyle = "black";
    ctx.fillRect(pixelX, pixelY, cellSize, cellSize);
}

function move(direction) {
    let newX = pacman.x;
    let newY = pacman.y;

    // Calculer la nouvelle position
    if (direction === "up") {
        newY -= pacman.speed;
    } else if (direction === "down") {
        newY += pacman.speed;
    } else if (direction === "right") {
        newX += pacman.speed;
    } else if (direction === "left") {
        newX -= pacman.speed;
    }

    // Verifie si il y a un mur
    if (!isWall(newX, newY)) {
        pacman.x = newX;
        pacman.y = newY;
        pacman.direction = direction;
        return true;
    }

    return false;
}

//Verifie la nourriture
function checkFoodCollision() {
    return eatFood(pacman.x, pacman.y);
}

// Gere le clavier
function handleKeyPress(event) {
    let direction = "";

    if (event.key === "ArrowUp" || event.key === "z") {
        direction = "up";
    } else if (event.key === "ArrowDown" || event.key === "s") {
        direction = "down";
    } else if (event.key === "ArrowLeft" || event.key === "q") {
        direction = "left";
    } else if (event.key === "ArrowRight" || event.key === "d") {
        direction = "right";
    } else {
        return;
    }

    move(direction);
}

export {
    pacman,
    placePacman,
    drawPacman,
    clearPacman,
    move,
    checkFoodCollision,
    handleKeyPress
};