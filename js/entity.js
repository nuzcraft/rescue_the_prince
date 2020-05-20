// this class will hold all entity-wide functions
class Entity{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.last_x = x;
        this.last_y = y;
        this.vSpeed = 0; // vertical speed
        this.hSpeed = 0; // horiontal speed
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

        // control jump height
        // basically, when you let go of the jump button, it reduces your speed
        if (keys.up == 0 && this.vSpeed < -6){
            this.vSpeed = -6;
        }

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
            // if we happen to be in a solid, move upwards to get out of it
            while (pointInSolid(this.centerX(), this.bottomY())){
                this.y -=1;
            }
            // jump control
            if (keys.up){
                this.vSpeed = -16;
            }
        }
        // horiz movement
        this.move();

        // move the entity up/down based on the vSpeed
        this.y += this.vSpeed;
        // move the entity left/right based on the hSpeed;
        this.x += this.hSpeed;
    }

    // by default, an entity can move both on the ground and in the air
    // direction is supposed to be 1 or -1
    move() {
        if (keys.right || keys.left){
            this.hSpeed += (keys.right - keys.left) * player_acc;
            if (this.hSpeed > maxHSpeed) this.hSpeed = maxHSpeed;
            if (this.hSpeed < -maxHSpeed) this.hSpeed = -maxHSpeed;
        } else {
            if (this.hSpeed < 0){
                this.hSpeed += player_acc;
                if (this.hSpeed > 0){
                    this.hSpeed = 0;
                }
            } else if (this.hSpeed > 0){
                this.hSpeed -= player_acc
                if (this.hSpeed < 0){
                    this.hSpeed = 0;
                }
            }
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