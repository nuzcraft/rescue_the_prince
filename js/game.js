/// This file holds the majority of the game-wide logic

function setupCanvas() {

    if (debugMode) {console.log('setupCanvas started.') }

    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = tileSize * cameraNumTiles_x;
    canvas.height = tileSize * cameraNumTiles_y;
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

        // let all the entities tick *before* the player moves
        for (let i = 0; i< entities.length; i++) {
            if (entities[i] != player) {
                entities[i].tick()
            }
        }
        // let the player move
        player.tick();
    }
}

// this function will draw the the stuff on the screen
function draw() {
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update the camera location to move with the player
    cameraX = -clamp(player.x + -canvas.width / 2, 0, levelWidth - canvas.width);
    cameraY = -clamp(player.y + -canvas.height / 2, 0, levelHeight - canvas.height);

    ctx.translate(cameraX, cameraY);

    // draw all the solids
    for (let i = 0; i < solids.length; i++) {
        solids[i].draw();
    }
    
    // draw all the entities, except the player
    for (let i = 0; i < entities.length; i++) {
        if (entities[i] !== player) {
            entities[i].draw();
        }        
    }

    // draw the player last
    player.draw(); 

    // draw the ui
    drawUI();
}

// this function will draw the ui
function drawUI(){
    // indicator of how many skulls have been collected
    sprSkull.draw(0, 0);
    drawText(":" + zeroFill(skulls, 3), 50, false, 40, 40, color_white, "", "normal", "", "monospace");

    sprGoldSkull.draw(168, 0);
    drawText(":" + goldskulls, 50, false, 204, 40, color_white, "", "normal", "", "monospace")
}

// this function will take x and y values of a coordinate and return
// whether the point is in a Solid
// platform is a property of a solid, if includePlatforms = false, it will exclude any
// platforms from causing the function to return true
function pointInSolid(x, y, includePlatforms=false) {
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
                        if (includePlatforms == true || (includePlatforms == false && solids[i].platform == false)){
                            return true;
                        }
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

// this function will take a number and pad the front with zeroes up to the width
function zeroFill(number, width)
{
    width -= number.toString().length;
    if (width > 0)
    {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
}

// clamp will return the value as long as it is between the min and max
function clamp(value, min, max){
    if (value <  min) return min;
    else if (value > max) return max;
    return value;
}