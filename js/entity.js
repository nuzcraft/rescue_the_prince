// this class will hold all entity-wide functions
class Entity{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.last_x = x;
        this.last_y = y;
        this.vSpeed = 0; // vertical speed
    }
}

// this class will hold the draw function for entities that
// have a sprite
class EntityWithSprite extends Entity{
    constructor(x, y, sprite){
        super(x, y);
        this.sprite = sprite;
    }

    // returns the center x coord of the the entity
    centerX(){
        return this.x + this.sprite.draw_width / 2;
    }

    // returns the center y coord of the entity
    centerY(){
        return this.y + this.sprite.draw_height / 2;
    }

    // returns the bottom y coord of the entity
    bottomY(){
        return this.y + this.sprite.draw_height - 1;
    }

    draw(){
        this.sprite.draw(this.x, this.y);
    }

    // by default, entities with sprites will be affected by gravity
    tick(){
        // set the last x and y coords
        this.last_x = this.x;
        this.last_y = this.y;
        // move the entity up/down based on the vSpeed
        this.y += this.vSpeed;
        // check the lower bound of the entity (using the sprite)
        if (!pointInSolid(this.centerX(), this.bottomY() + 1)){
            // if point below the entity not in a solid, increase the vSpeed
            this.vSpeed += gravity;
            if (this.vSpeed > maxVSpeed){
                this.vSpeed = maxVSpeed;
            }
        } else {
            // point below is in a solid, stop the fall
            this.vSpeed = 0;
            // check the points between this position and the last one
            // to put the entity right on top of the solid
            var diff_y = this.y - this.last_y;
            // work our way from current position back to last pos
            // if the bottomY() is no longer in a solid, set the new y coord
            for (let i = 0; i < diff_y; i++){
                if (!pointInSolid(this.centerX(), this.bottomY() - i)){
                    this.y = this.y - i;
                    break;
                }
            }            
        }
        //TODO deal with moving left and right
    }

    // by default, an entity will jump straight up with a change in vspeed
    jump() {
        // entities can only jump from solid ground
        if(pointInSolid(this.centerX(), this.bottomY() + 1)){
            this.vSpeed = -16; // negative since up is the -y direction
        }
    }
}

// this class will handle entities that have 2 sprites
// that can be animated between
class EntityWith2Sprites extends EntityWithSprite{
    constructor(x, y, sprite, sprite2){
        super(x, y, sprite);
        this.sprite2 = sprite2;
    }

    // this will swap sprite1 and sprite2 
    animate() {
        var tempSprite = this.sprite;
        this.sprite = this.sprite2;
        this.sprite2 = tempSprite;
    }
}

class Player extends EntityWith2Sprites{
    constructor(x, y){
        super(x, y, sprPrincess1, sprPrincess2);
    }
}