// I'm choosing to do this via (row, index).
// 18 images per row for creature, 53? for world
// both rows and indexes are 1-indexed (start with 1 as first entry)
class Sprite {
    constructor(row, index, width, height, spritesheet, numFrames=1, animationSpeed=0
            , draw_width=tileSize, draw_height=tileSize) {
        this.row = row;
        this.index = index;
        this.width = width;
        this.height = height;
        this.spritesheet = spritesheet;
        this.numFrames = numFrames;
        this.animationSpeed = animationSpeed;
        this.draw_height = draw_height;
        this.draw_width = draw_width;
        this.frame = 0;
    }

    // pass in x and y coordinates on the screen to draw the sprite there
    // while row and index are 1-based, x and y are 0-based and absolute
    // meaning that x and y are  not based on tilesize at all
    //ctx.setTransform(1, 0, 0, 1, 0, 0) // (horiz scaling, vert skewing, horiz skewing, vert scaling, x origin, y origin)
    draw(x, y, xScale=1){
        log('sprite.js.Sprite.draw initialized', 1);
        try {
            // before we handle scale, let's handle animation...
            // animationSpeed = ms to switch (i.e. 200 will swap every 200 ms)
            // by default a adding a frame will just add another row (since our spritesheet has animations on subsequent rows)
            if (this.animationSpeed != 0) {
                if (gameclock % this.animationSpeed == 0){ // check if the gameclock is evenly divided by our animationSpeed
                    if (this.frame == this.numFrames - 1) { // we've hit the max number of frames
                        this.frame = 0; // go back to the first frame
                    } else {
                        this.frame += 1; // go to the next frame
                    }
                }
            }

            if (xScale == -1){
                // reverse the canvas
                ctx.setTransform(-1, 0, 0, 1, canvas.width, 0);
                // draw the image flipped (notice the x coord)
                ctx.drawImage(
                    this.spritesheet, // spritesheet source of sprite
                    this.index * this.width, // x pos (top left) of sprite in sheet
                    (this.row + this.frame) * this.height, // y pos (top left) of sprite in sheet
                    this.width, // width of sprite (px)
                    this.height, // height of sprite (px)
                    canvas.width - x - this.draw_width - cameraX, // x pos to draw to on canvas
                    y, // y pos to draw to on canvas
                    this.draw_height, // new width to draw (from pubvars.js)
                    this.draw_width // new height to draw (from pubvars.js)
                );
                // reset the canvas so that everything else can be drawn correctly
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            } else {
                ctx.drawImage(
                    this.spritesheet, // spritesheet source of sprite
                    this.index * this.width, // x pos (top left) of sprite in sheet
                    (this.row + this.frame) * this.height, // y pos (top left) of sprite in sheet
                    this.width, // width of sprite (px)
                    this.height, // height of sprite (px)
                    x, // x pos to draw to on canvas
                    y, // y pos to draw to on canvas
                    this.draw_height, // new width to draw (from pubvars.js)
                    this.draw_width // new height to draw (from pubvars.js)
                );
            }
        }
        catch(e){
            log(e.message, 3);
            // on fatal error, return to title screen
            showTitle();
        }
    }
}