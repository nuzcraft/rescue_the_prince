// things like collisions can be defined in the solid class
class Solid{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

// this class will be used to house the draw method
// for solids with a sprite (invisible solids can exist)
class SolidWithSprite extends Solid{
    constructor(x, y, sprite){
        super(x, y);
        this.sprite = sprite;
    }

    draw(){
        this.sprite.draw(this.x, this.y);
    }
}

// this is a class for the stone block. it may be unneccessary
// for me to have a class for each type of solid, not sure
class StoneBlock extends SolidWithSprite{
    constructor(x, y){
        super(x, y, sprStoneBlock);
    }
}