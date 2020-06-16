// things like collisions can be defined in the solid class
class Solid{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.platform = false;
        this.maskXOffset = 0;
        this.maskYOffset = 0;
        this.maskWidth = tileSize;
        this.maskHeight = tileSize;
    }

    // returns the center x coord of the the entity
    centerX(){
        // @ts-ignore
        log('solid.js.Solid.centerX initialized', 1);
        try {
            return this.leftX() + Math.floor(this.maskWidth / 2);
        }
        catch(e){
            // @ts-ignore
            log(e.message, 3);
            // on fatal error, return to title screen
            // @ts-ignore
            showTitle();
        }
    }

    // returns the center y coord of the entity
    centerY(){
        // @ts-ignore
        log('solid.js.Solid.centerY initialized', 1);
        try {
            return this.topY() + Math.floor(this.maskHeight / 2);
        }
        catch(e){
            // @ts-ignore
            log(e.message, 3);
            // on fatal error, return to title screen
            // @ts-ignore
            showTitle();
        }
    }

    // returns the bottom y coord of the entity
    bottomY(){
        // @ts-ignore
        log('solid.js.Solid.bottomY initialized', 1);
        try {
            return this.topY() + this.maskHeight - 1;
        }
        catch(e){
            // @ts-ignore
            log(e.message, 3);
            // on fatal error, return to title screen
            // @ts-ignore
            showTitle();
        }
    }

    // returns the top y coord of the entity, with mask offset taken into account
    topY(){
        // @ts-ignore
        log('solid.js.Solid.topY initialized', 1);
        try {
            return this.y + this.maskYOffset;
        }
        catch(e){
            // @ts-ignore
            log(e.message, 3);
            // on fatal error, return to title screen
            // @ts-ignore
            showTitle();
        }
    }

    // returns the right x coord of the entity
    rightX(){
        // @ts-ignore
        log('solid.js.Solid.rightX initialized', 1);
        try {
            return this.leftX() + this.maskWidth - 1;
        }
        catch(e){
            // @ts-ignore
            log(e.message, 3);
            // on fatal error, return to title screen
            // @ts-ignore
            showTitle();
        }
    }

    // returns the left x cooord, with mask taken into account
    leftX(){
        // @ts-ignore
        log('solid.js.Solid.leftX initialized', 1);
        try {
            return this.x + this.maskXOffset;
        }
        catch(e){
            // @ts-ignore
            log(e.message, 3);
            // on fatal error, return to title screen
            // @ts-ignore
            showTitle();
        }
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
        // @ts-ignore
        log('solid.js.SolidWithSprite.draw initialized', 1);
        try {
            this.sprite.draw(this.x, this.y);
        }
        catch(e){
            // @ts-ignore
            log(e.message, 3);
            // on fatal error, return to title screen
            // @ts-ignore
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
        // @ts-ignore
        log('solid.js.SolidWithSpriteAndOverlay.draw initialized', 1);
        try {
            this.sprite.draw(this.x, this.y);
            this.overlaySprite.draw(this.x, this.y);
        }
        catch(e){
            // @ts-ignore
            log(e.message, 3);
            // on fatal error, return to title screen
            // @ts-ignore
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

        // since this is a platform, make the mask height 1
        this.maskHeight = 1;
    }
}