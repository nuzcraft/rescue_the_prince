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
        // if the lower bound of the entity is not colliding with
        // a solid, make the entity fall and increase the fall speed
        
        /// first, get the x and y coords directly below the middle of
        /// the sprite (1 pixel below) and see if any solids are there
        /// will require a defined list of solids/entities? (if we want
        /// to collide with entities). I may just make the 'collision'
        /// function pretty generic to handle both (since they both have
        /// an x and y coord)
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