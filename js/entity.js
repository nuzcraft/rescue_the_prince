// this class will hold all entity-wide functions
class Entity{
    constructor(x, y){
        this.x = x;
        this.y = y;
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