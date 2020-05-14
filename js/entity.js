// this class will hold all entity-wide functions
class Entity{
    constructor(x, y){
        this.x = x;
        this.y = y;
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

    draw(){
        this.sprite.draw(this.x, this.y);
    }

    // by default, entities with sprites will be affected by gravity
    tick(){
        // move the entity down based on the vSpeed
        this.y += this.vSpeed;

        // check the lower bound of the entity (using the sprite)
        if (!pointInSolid(this.x + (this.sprite.width / 2), this.y + this.sprite.height + 1)){
            // if point below the entity not in a solid, increase the vSpeed
            this.vSpeed += gravity;
            if (this.vSpeed > maxVSpeed){
                this.vSpeed = maxVSpeed;
            }
        } else {
            // point below is in a solid, stop the fall
            this.vSpeed = 0;
            // TODO make sure the entity will then rest on the solid, not
            // midway through it
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