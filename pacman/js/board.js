/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = 20;
const cellSize = 20;

const wall = 0;
const eat = 1;
const empty = 2;

canvas.width = width * cellSize;
canvas.height = width * cellSize;

const originalLayout = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 2, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 2, 2, 1, 0, 1, 1, 2, 1, 2, 2, 1, 1, 0, 2, 1, 1, 0, 0],
    [0, 0, 1, 0, 2, 0, 1, 0, 0, 2, 2, 0, 0, 1, 0, 1, 0, 2, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 0, 2, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0],
    [0, 1, 1, 2, 1, 0, 2, 1, 2, 1, 1, 2, 1, 1, 0, 1, 2, 1, 2, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 2, 1, 2, 1, 2, 1, 1, 0, 0, 1, 1, 2, 1, 1, 2, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 0, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 0, 1, 2, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 2, 2, 2, 1, 2, 1, 2, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let layout = originalLayout.map(row => [...row]);

function resetLayout() {
    layout = originalLayout.map(row => [...row]);
}



function drawPlan() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawWall() {
    for (let row = 0; row < layout.length; row++) {
        for (let col = 0; col < layout[row].length; col++) {
            if (layout[row][col] === wall) {
                const x = col * cellSize;
                const y = row * cellSize;
                ctx.fillStyle = "pink";
                ctx.fillRect(x, y, cellSize, cellSize);
            }
        }
    }
}

function drawMiniHeart(ctx, x, y, size) {
  const topCurveHeight = size * 0.3;

  ctx.beginPath();
  ctx.moveTo(x, y + topCurveHeight);

  // gauche
  ctx.bezierCurveTo(
    x, y,
    x - size / 2, y,
    x - size / 2, y + topCurveHeight
  );

  ctx.bezierCurveTo(
    x - size / 2, y + (size + topCurveHeight) / 2,
    x, y + (size + topCurveHeight) / 2,
    x, y + size
  );

  // droite
  ctx.bezierCurveTo(
    x, y + (size + topCurveHeight) / 2,
    x + size / 2, y + (size + topCurveHeight) / 2,
    x + size / 2, y + topCurveHeight
  );

  ctx.bezierCurveTo(
    x + size / 2, y,
    x, y,
    x, y + topCurveHeight
  );

  ctx.closePath();

  // couleur + glow léger
  ctx.fillStyle = "#ff2d55";
  ctx.shadowColor = "#ff5fa2";
  ctx.shadowBlur = 6;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function drawHeart() {
  for (let row = 0; row < layout.length; row++) {
    for (let col = 0; col < layout[row].length; col++) {
      if (layout[row][col] === eat) {
        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;

        // taille du coeur (à ajuster)
        drawMiniHeart(ctx, x, y - 2, 8);
      }
    }
  }
}

function isWall(x, y) {
    return layout[y][x] === wall;
}

function eatFood(x, y) {

    if (layout[y][x] === eat) {
        layout[y][x] = empty;
        // if pacman in index eat remplacer eat par empty et ajouter 1 au compteur
        return true;
    }
    return false;
}


export {
    drawHeart,
    drawWall,
    drawPlan,
    cellSize,
    layout,
    ctx,
    canvas,
    isWall,
    eatFood,
    resetLayout
};