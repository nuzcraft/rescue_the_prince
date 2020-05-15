// I'm choosing to do this via (row, index).
// 18 images per row for creature, 53? for world
// both rows and indexes are 1-indexed (start with 1 as first entry)
class Sprite {
    constructor(row, index, width, height, spritesheet
            , draw_width=tileSize, draw_height=tileSize) {
        this.row = row;
        this.index = index;
        this.width = width;
        this.height = height;
        this.spritesheet = spritesheet;
        this.draw_height = draw_height;
        this.draw_width = draw_width;
    }

    // pass in x and y coordinates on the screen to draw the sprite there
    // while row and index are 1-based, x and y are 0-based and absolute
    // meaning that x and y are  not based on tilesize at all
    draw(x, y){
        ctx.drawImage(
            this.spritesheet, // spritesheet source of sprite
            this.index * this.width, // x pos (top left) of sprite in sheet
            this.row * this.height, // y pos (top left) of sprite in sheet
            this.width, // width of sprite (px)
            this.height, // height of sprite (px)
            x, // x pos to draw to on canvas
            y, // y pos to draw to on canvas
            this.draw_height, // new width to draw (from pubvars.js)
            this.draw_width // new height to draw (from pubvars.js)
        )
    }
}