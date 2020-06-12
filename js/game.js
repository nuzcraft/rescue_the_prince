/// This file holds the majority of the game-wide logic
function setupCanvas() {
    log('game.js.setupCanvas initialized', 1);
    try {
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");

        canvas.width = tileSize * cameraNumTiles_x;
        canvas.height = tileSize * cameraNumTiles_y;
        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        ctx.imageSmoothingEnabled = false;
    }
    catch(e){
        log(e.message, 3);
    }
    
}

function showTitle() {
    log('game.js.showTitle initialized', 1);
    try {
        ctx.setTransform(1,0,0,1,0,0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        gamestate = "title";

        drawText("Rescue the Prince", 70, true, 0, canvas.height / 2, color_white
        , "bold", "italic" );
    }
    catch(e){
        log(e.message, 3);
    }
}

function drawText(text, size, centered, textX, textY, color
    , fontWeight="", fontStyle="normal", fontVariant="", fontFamily="serif"){ 
    // fontStyle can be normal, italic, or oblique
    // fontFamily can be a bunch of stuff. Easy ones are serif, monospace
    // fontVariant can be "" or small-caps
    // fontWeight can be "", bold, bolder, lighter, or a multiple of 100
    log('game.js.drawText initialized', 1);
    try {
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
    catch(e){
        log(e.message, 3);
        // on fatal error, return to title screen
        showTitle();
    }
}

// this function will serve as the game clock, keeping time
// for the game
function tick() {
    log('game.js.tick initialized', 1);
    try {
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
    catch(e){
        log(e.message, 3);
        // on fatal error, return to title screen
        showTitle();
    }
    
}

// this function will draw the the stuff on the screen
function draw() {
    log('game.js.draw initialized', 1);
    try {
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
    catch(e){
        log(e.message, 3);
        // on fatal error, return to title screen
        showTitle();
    }    
}

// this function will draw the ui
function drawUI(){
    log('game.js.drawUI initialized', 1);
    try {
        // indicator of how many skulls have been collected
        sprSkull.draw(0, 0);
        drawText(":" + zeroFill(skulls, 3), 50, false, 40, 40, color_white, "", "normal", "", "monospace");

        sprGoldSkull.draw(168, 0);
        drawText(":" + goldskulls, 50, false, 204, 40, color_white, "", "normal", "", "monospace")
    }
    catch(e){
        log(e.message, 3);
        // on fatal error, return to title screen
        showTitle();
    }
}

// this function will take x and y values of a coordinate and return
// whether the point is in a Solid
// platform is a property of a solid, if includePlatforms = false, it will exclude any
// platforms from causing the function to return true
function pointInSolid(x, y, includePlatforms=false) {
    log('game.js.pointInSolid initialized', 1);
    try {
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
    catch(e){
        log(e.message, 3);
        // on fatal error, return to title screen
        showTitle();
    }
}

function startGame() {
    log('game.js.startGame initialized', 1);
    try {
        gamestate = "running";
    }
    catch(e){
        log(e.message, 3);
        // on fatal error, return to title screen
        showTitle();
    }
}

// TODO add gamepad support
function getInput() {
    log('game.js.getInput initialized', 1);
    try {
        document.querySelector("html").onkeydown = keyDown;
        document.querySelector("html").onkeyup = keyUp;
        document.querySelector("html").onkeypress = keyPress;
    }
    catch(e){
        log(e.message, 3);
        // on fatal error, return to title screen
        showTitle();
    }
}

function keyPress(k) {
    log('game.js.keyPress initialized', 1);
    try {
        if (gamestate == "title") {
            startGame();
        }
    }
    catch(e){
        log(e.message, 3);
        // on fatal error, return to title screen
        showTitle();
    }
}

function keyDown(k) {
    log('game.js.keyDown initialized', 1);
    if (gamestate == "running"){
        keys[keyCodes[k.key]] = 1;
    }
}

function keyUp(k) {
    log('game.js.keyUp initialized', 1);
    try {
        if (gamestate == "running") {
            keys[keyCodes[k.key]] = 0;
        }
    }
    catch(e){
        log(e.message, 3);
        // on fatal error, return to title screen
        showTitle();
    }
}

// this function will take a number and pad the front with zeroes up to the width
/**
 * @param {number} number
 * @param {number} width
 */
function zeroFill(number, width){
    log('game.js.zeroFill initialized', 1);
    try {
        // check parameters to make sure they are numbers
        if (typeof(number) != 'number' || typeof(width) != 'number'){
            throw new TypeError('all parameters must be numbers');
        }
        // make sure the number is at least as big as the width
        if (number.toString().length > width) {
            throw new Error('number must be smaller than width');
        }
        width -= number.toString().length;
        if (width > 0)
        {
            return new Array(width + (/\./.test(number.toString()) ? 2 : 1)).join('0') + number;
        }
        return number + ""; // always return a string
    }
    catch(e){
        log(e.message, 3);
        // on fatal error, return to title screen
        showTitle();
        // signal that the function failed
        return false;
    }
}

// clamp will return the value as long as it is between the min and max
/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
function clamp(value, min, max){
    log('game.js.clamp initialized', 1);
    try {
        // check parameter types
        if (typeof(value) != 'number' || 
            typeof(min) != 'number' ||
            typeof(max) != 'number'){
            throw new TypeError("all parameters must be numbers");
        }
        // perform the actual calculation
        if (value <  min) return min;
        else if (value > max) return max;
        return value;;
    }
    catch(e){
        log(e.message, 3);
        // on fatal error, return to title screen
        showTitle();
        // signal that the function failed
        return false;
    }
}

// take into account the debug mode and severity to output things to the console
/**
 * @param {string} message
 * @param {number} severity
 */
function log(message, severity, forceOutput=false){
    // message is a string, severity is an integer, forceOutput will override the debug mode an force the output
    let displayedMessage = '';
    switch (severity) {
        case 0: // log
            if ((debugMode && severity >= logThreshold) || forceOutput) {
                console.log(message);
                displayedMessage = message;
            }
            break;
        case 1: // info
            if ((debugMode && severity >= logThreshold) || forceOutput) {
                console.info(message);
                displayedMessage = message;
            }
            break;
        case 2: // warning
            if ((debugMode && severity >= logThreshold) || forceOutput) {
                console.warn(message);
                displayedMessage = message;
            }
            break;
        case 3: // error - always output
            console.error(message);
            displayedMessage = message;
            break;
        default: // oops, we put in something different, default to log and force output
            console.log(message);
            displayedMessage = message;
            break;
    }
    return displayedMessage
}

// set up our unit tests by exporting our functions
try {
    module.exports.clamp = clamp;
    module.exports.log = log;
    module.exports.zeroFill = zeroFill;
    module.exports.showTitle = showTitle;
    module.exports.pointInSolid = pointInSolid;
}
catch (err) {
    // do nothing if this throws an error
}