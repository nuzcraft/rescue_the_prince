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

    gamestate = "title";

    drawText("Rescue the Prince", 70, true, 0, canvas.height / 2, color_white
    , "bold", "italic" );

}

function drawText(text, size, centered, textX, textY, color
    , fontWeight="", fontStyle="normal", fontVariant="", fontFamily="serif"){
    
    // fontStyle can be normal, italic, or oblique
    // fontFamily can be a bunch of stuff. Easy ones are serif, monospace
    // fontVariant can be "" or small-caps
    // fontWeight can be "", bold, bolder, lighter, or a multiple of 100
    if (fontStyle != "")
        fontStyle = fontStyle + " ";
    if (fontVariant != "")
        fontVariant = fontVariant + " ";
    if (fontWeight != "")
        fontWeight = fontWeight + " ";
    
    ctx.fillStyle = color;
    ctx.font = fontStyle + 
            fontVariant +
            fontWeight +
            size + "px " +
            fontFamily;

    if (centered) {
        textX = ((canvas.width - ctx.measureText(text).width) / 2) + textX;
    }

    ctx.fillText(text, textX, textY);
}

// this function will serve as the game clock, keeping time
// for the game
function tick() {
    if (gamestate == "running") {
        // advance the gameclock
        gameclock = gameclock + tickInterval;

        draw() //game.js

        // not sure the best way to handle animations...
        // right now, they all switch after 200 ms, but 
        // if necessary, we can move that into each object individually
        if (gameclock % 200 == 0){
            player.animate();
        }

        // right now, the player is the only thing that will move each
        // frame
        player.tick();
    }
}

// this function will draw the the stuff on the screen
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw all the solids
    for (let i = 0; i < solids.length; i++) {
        solids[i].draw();
    }
    
    player.draw(); 
}

// this function will take x and y values of a coordinate and return
// whether the point is in a Solid
function pointInSolid(x, y) {
    // loop through all the solids
    for (let i = 0; i < solids.length; i++) {
        // check if the x coord is in the x of the solid
        // leans on solid.x and solid.sprite.width
        for (let j = solids[i].x; j <= solids[i].x + solids[i].sprite.draw_width; j++){
            // if the x coords match, check the y
            if (x == j){
                // check the y coord for a match
                for (let k = solids[i].y; k <= solids[i].y + solids[i].sprite.draw_height; k++){
                    if (y == k){
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function startGame() {
    console.log("Starting game.");
    gamestate = "running";
}

// TODO add gamepad support
function getInput() {
    document.querySelector("html").onkeydown = keyDown;
    document.querySelector("html").onkeyup = keyUp;
    document.querySelector("html").onkeypress = keyPress;
}

function keyPress(k) {
    if (gamestate == "title") {
        startGame();
    }
}

function keyDown(k) {
    if (gamestate == "running"){
        keys[keyCodes[k.key]] = 1;
    }
}

function keyUp(k) {
    if (gamestate == "running") {
        keys[keyCodes[k.key]] = 0;
    }
}