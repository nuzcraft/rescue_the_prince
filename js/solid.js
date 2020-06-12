import { log, showTitle } from "./game";
import { sprStoneBlock, sprGrassOverlay_TopMid_1, sprGrassOverlay_TopMid_2, sprGrassOverlay_TopMid_3, sprMudContinuous_BottomMid, sprBarrel } from "./pubvars";

// things like collisions can be defined in the solid class
class Solid{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.platform = false;
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
        log('solid.js.SolidWithSprite.draw initialized', 1);
        try {
            this.sprite.draw(this.x, this.y);
        }
        catch(e){
            log(e.message, 3);
            // on fatal error, return to title screen
            showTitle();
        }
    }
}

class SolidWithSpriteAndOverlay extends SolidWithSprite{
    constructor(x, y, sprite, overlaySprite){
        super(x, y, sprite);
        this.overlaySprite = overlaySprite
    }

    draw() {
        log('solid.js.SolidWithSpriteAndOverlay.draw initialized', 1);
        try {
            this.sprite.draw(this.x, this.y);
            this.overlaySprite.draw(this.x, this.y);
        }
        catch(e){
            log(e.message, 3);
            // on fatal error, return to title screen
            showTitle();
        }
    }

}

// this is a class for the stone block. it may be unneccessary
// for me to have a class for each type of solid, not sure
class StoneBlock extends SolidWithSprite{
    constructor(x, y){
        super(x, y, sprStoneBlock);
    }
}

// this is specifically for 1 tall mud and grass platforms
// there are 3 different top, mid, grass overlays, so this will 
// randomize the one that is chosen
class GrassPlatform_Mid extends SolidWithSpriteAndOverlay{
    constructor(x, y){
        // random number between 0 and 2
        let variant = Math.floor(Math.random() * 3);
        var overlaySprite;
        if (variant == 0){
            overlaySprite = sprGrassOverlay_TopMid_1;
        } else if (variant == 1){
            overlaySprite = sprGrassOverlay_TopMid_2;
        } else if (variant == 2){
            overlaySprite = sprGrassOverlay_TopMid_3;
        }
        super(x, y, sprMudContinuous_BottomMid, overlaySprite);
    }
}

class Barrel extends SolidWithSprite{
    constructor(x, y){
        super(x, y, sprBarrel);
        this.platform = true;
    }
}