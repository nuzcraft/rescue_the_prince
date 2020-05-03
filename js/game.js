/// This file holds the majority of the game-wide logic

function setupCanvas() {

    if (debugMode) {console.log('setupCanvas started.') }

    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = tileSize * numTiles_x;
    canvas.height = tileSize * numTiles_y;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    ctx.imageSmoothingEnabled = false;
}

function showTitle() {

    if (debugMode) {console.log('showTitle started.')}

    drawText("Rescue the Prince", 70, true, 0, canvas.height / 2, color_white);

}

function drawText(text, size, centered, textX, textY, color){
    ctx.fillStyle = color;
    ctx.font = size + "px sserif";

    if (centered) {
        textX = ((canvas.width - ctx.measureText(text).width) / 2) + textX;
    }

    ctx.fillText(text, textX, textY);
}
