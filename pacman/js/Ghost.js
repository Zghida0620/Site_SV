import { cellSize, isWall, ctx } from './board.js';

class Ghost {
    constructor(name, startX, startY, color) {
        this.name = name;
        this.x = startX;
        this.y = startY;
        this.startX = startX;
        this.startY = startY;
        this.color = color;
        this.speed = 1;
        this.direction = this.getRandomDirection();
        this.moveCounter = 0;
        this.moveDelay = 14;
    }

    placeGhost() {
        this.x = this.startX;
        this.y = this.startY;
        this.direction = this.getRandomDirection();
    }

    drawGhost() {
        let pixelX = this.x * cellSize;
        let pixelY = this.y * cellSize;
        let centerX = pixelX + cellSize / 2;
        let centerY = pixelY + cellSize / 2;
        const r = cellSize / 2;

        //fantôme
        ctx.beginPath();
        ctx.arc(centerX, centerY - r / 3, r, Math.PI, 0, false);
        ctx.lineTo(centerX + r, centerY + r);
        ctx.lineTo(centerX + r / 2, centerY + r / 2);
        ctx.lineTo(centerX, centerY + r);
        ctx.lineTo(centerX - r / 2, centerY + r / 2);
        ctx.lineTo(centerX - r, centerY + r);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    clearGhost() {
        let pixelX = this.x * cellSize;
        let pixelY = this.y * cellSize;
        ctx.fillStyle = "black";
        ctx.fillRect(pixelX, pixelY, cellSize, cellSize);
    }

    getRandomDirection() {
        const directions = ["up", "down", "left", "right"];
        return directions[Math.floor(Math.random() * directions.length)];
    }

    move(pacmanX, pacmanY) {
        this.moveCounter++;

        // Delay pour deplacement fantomes
        if (this.moveCounter < this.moveDelay) {
            return;
        }

        // counter = 0
        this.moveCounter = 0;

        // 20% suivre pacman et 80% deplacement aléatoire
        const shouldChase = Math.random() < 0.2;

        let newX = this.x;
        let newY = this.y;
        let possibleDirections = [];

        // Directions possibles
        if (!isWall(this.x, this.y - this.speed)) possibleDirections.push("up");
        if (!isWall(this.x, this.y + this.speed)) possibleDirections.push("down");
        if (!isWall(this.x - this.speed, this.y)) possibleDirections.push("left");
        if (!isWall(this.x + this.speed, this.y)) possibleDirections.push("right");

        // Si pas de directions possibles rester sur place
        if (possibleDirections.length === 0) return;

        if (shouldChase && possibleDirections.length > 0) {
            // Logique pour suivre Pac-Man
            let bestDirection = possibleDirections[0];
            let bestDistance = Infinity;

            for (let dir of possibleDirections) {
                let testX = this.x;
                let testY = this.y;

                if (dir === "up") testY -= this.speed;
                else if (dir === "down") testY += this.speed;
                else if (dir === "left") testX -= this.speed;
                else if (dir === "right") testX += this.speed;

                // Calculer la distance vers Pac-Man
                let distance = Math.abs(testX - pacmanX) + Math.abs(testY - pacmanY);

                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestDirection = dir;
                }
            }
            this.direction = bestDirection;
        } else {
            // 85% du temps continuer dans la même direction si possible
            if (Math.random() < 0.85 && possibleDirections.includes(this.direction)) {
            } else {
                // Changer de direction aléatoirement
                this.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
            }
        }

        // Mouvement
        if (this.direction === "up") {
            newY = this.y - this.speed;
        } else if (this.direction === "down") {
            newY = this.y + this.speed;
        } else if (this.direction === "left") {
            newX = this.x - this.speed;
        } else if (this.direction === "right") {
            newX = this.x + this.speed;
        }

        // Vérifier si le mouvement est ok
        if (!isWall(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
    }

    checkCollisionWithPacman(pacmanX, pacmanY) {
        return this.x === pacmanX && this.y === pacmanY;
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
        this.direction = this.getRandomDirection();
        this.moveCounter = 0;
    }
}

export default Ghost;