// this class will hold all entity-wide functions
class Entity{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.xPrevious = x;
        this.yPrevious = y;
        this.vSpeed = 0; // vertical speed
        this.hSpeed = 0; // horiontal speed
        this.state = undefined;
        this.maskXOffset = 0; //
        this.maskYOffset = 0;
        this.maskWidth = tileSize;
        this.maskHeight = tileSize;
    }

    // returns the center x coord of the the entity
    centerX(){
        // @ts-ignore
        log('entity.js.Entity.centerX initialized', 1);
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
        log('entity.js.Entity.centerY initialized', 1);
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
        log('entity.js.Entity.bottomY initialized', 1);
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
        log('entity.js.Entity.topY initialized', 1);
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
        log('entity.js.Entity.rightX initialized', 1);
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
        log('entity.js.Entity.leftX initialized', 1);
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

    tick() {
        // @ts-ignore
        log('entity.js.Entity.tick initialized', 1);
        try {
            this.xPrevious = this.x;
            this.yPrevious = this.y;
            this.state();
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

// this class will hold the draw function for entities that
// have a sprite
class EntityWithSprite extends Entity{
    constructor(x, y, sprite){
        super(x, y);
        this.sprite = sprite;
        this.xScale = 1; // 1 for left facing; -1 for right facing
    }

    draw(){
        // @ts-ignore
        log('entity.js.EntityWithSprite.draw initialized', 1);
        try {
            this.sprite.draw(this.x, this.y, this.xScale);
        }
        catch(e){
            // @ts-ignore
            log(e.message, 3);
            // on fatal error, return to title screen
            // @ts-ignore
            showTitle();
        }
    }

    move() {
        // @ts-ignore
        log('entity.js.EntityWithSprite.move initialized', 1);
        try {
            // horizontal collisions
            if (this.hSpeed > 0) { // moving right
                // @ts-ignore
                if (pointInSolid (this.rightX() + this.hSpeed, this.centerY())){
                    // if we're moving into a solid, need to make sure we don't overlap            
                    // @ts-ignore
                    while (!pointInSolid(this.rightX() + 1, this.centerY())){ //edge it in one at a time
                        this.x += 1;
                    }
                    this.hSpeed = 0;
                }
            } else if (this.hSpeed < 0) { // moving left
                // @ts-ignore
                if (pointInSolid (this.leftX() + this.hSpeed, this.centerY())){
                    // @ts-ignore
                    while (!pointInSolid(this.leftX() - 1, this.centerY())){
                        this.x -= 1;
                    }
                    this.hSpeed = 0;
                }
            } else if (this.hSpeed == 0){// not moving left or rightd
                // @ts-ignore
                while (pointInSolid(this.leftX(), this.centerY())){
                    this.x += 1;
                }
                // @ts-ignore
                while (pointInSolid(this.rightX(), this.centerY())){
                    this.x -= 1;
                }
            }
            this.x += this.hSpeed;

            // vertical collisions
            if (this.vSpeed > 0) { // moving down
                // we use the no mask version here because platforms can be very small
                // @ts-ignore
                if (pointInSolidNoMask(this.centerX(), this.bottomY() + this.vSpeed, true)){
                    // if we're moving into a solid, need to make sure we don't overlap            
                    // @ts-ignore
                    while (!pointInSolid(this.centerX(), this.bottomY()+1, true)){ //edge it in one at a time, check platforms too
                        this.y += 1;
                    }
                    this.vSpeed = 0;
                }
            } else if (this.vSpeed < 0) { // moving up
                // @ts-ignore
                if (pointInSolid (this.centerX(), this.topY() + this.vSpeed)){
                    // @ts-ignore
                    while (!pointInSolid(this.centerX(), this.topY() - 1)){
                        this.y -= 1;
                    }
                    this.vSpeed = 0;
                }
            } else if (this.vSpeed == 0){// on a surface
                // make sure we aren't sunk into the floor
                // @ts-ignore
                while(pointInSolid(this.centerX(), this.bottomY())){
                    this.y -= 1;
                }
            }
            this.y += this.vSpeed;  
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

class Player extends EntityWithSprite{
    constructor(x, y){
        super(x, y, sprPrincess);
        this.state = this.move_state;
        // this.facingRight = 0; // 0 for left, 1 for right

        this.maskXOffset = 7;
        this.maskWidth = this.maskWidth - this.maskXOffset * 2; //left and right can have even margins

        this.maskYOffset = 10;
        this.maskHeight = this.maskHeight - this.maskYOffset - 1; //I only want the  player to sink in one pixel
    }

    move_state() {
        // @ts-ignore
        log('entity.js.Player.move_state initialized', 1);
        try {
            // check the lower bound of the entity
            // @ts-ignore
            if (!pointInSolid(this.centerX(), this.bottomY() + 1, true)){
                // if point below the entity not in a solid, increase the vSpeed due to gravity
                this.vSpeed += gravity;

                // player is in the air
                if (this.vSpeed > 0){ // falling
                    this.sprite = sprPrincessFalling;
                } else { // jumping
                        this.sprite = sprPrincessJump;               
                }

                // control jump height
                // basically, when you let go of the jump button, it reduces your speed
                if (keys.up == 0 && this.vSpeed < -6){
                    this.vSpeed = -6;
                }

                // slow the player down if they are falling too fast
                if (this.vSpeed > maxVSpeed){
                    this.vSpeed = maxVSpeed;
                }

            } else {
                // point below is in a solid, stop the fall
                this.vSpeed = 0;
                
                // jump control
                if (keys.up){
                    this.vSpeed = -16;
                }

                // if standing on a platform, allow us to press the down button to move down
                // below the platform
                if (keys.down){
                    // check to see if we are on a solid or platform
                    // we've already determined were on something...the false will show we are on 
                    // a platform
                    console.log('keydown pressed');
                    // @ts-ignore
                    if (!pointInSolid(this.centerX(), this.bottomY() + 1, false)){
                        // move the player down into the platform bounding box
                        // TODO: make this more dynamic instead of assuming all platforms are 1 px tall
                        this.y += 2;
                        // use a loop to move the player below the mask of the platform
                        // @ts-ignore
                        // while (pointInSolid(this.centerX(), this.bottomY(), true)){
                        //     this.y += 1;
                        // }
                    }
                }

                // player is on the ground
                this.sprite = sprPrincess;
            }

            // horiz movement
            if (keys.right || keys.left){ // if we are pressing the left or right key
                // speed up te player
                this.hSpeed += (keys.right - keys.left) * player_acc;

                // but not greater than the the max speed
                if (this.hSpeed > maxHSpeed) this.hSpeed = maxHSpeed;
                if (this.hSpeed < -maxHSpeed) this.hSpeed = -maxHSpeed;

            } else {
                // apply friction
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

            if (this.hSpeed != 0){
                this.xScale = -Math.sign(this.hSpeed);
            }

            this.move();

            // check for ledge grab state
            var falling = this.y - this.yPrevious > 0;
            var wasntWall, isWall;
            if (this.xScale == -1){ // facing right
                // check 3 pixels to the right of the previous y
                // @ts-ignore
                wasntWall = !pointInSolid(this.rightX() + 2, this.yPrevious + this.maskYOffset + Math.floor(this.maskHeight / 2));
                // check 3 pixels to the right of the current y
                // @ts-ignore
                isWall = pointInSolid(this.rightX() + 2, this.centerY());
            } else { // facing left
                // check 3 pixels to the left of the previous y
                // @ts-ignore
                wasntWall = !pointInSolid(this.leftX() - 2, this.yPrevious + this.maskYOffset + Math.floor(this.maskHeight / 2));
                // check 3 pixels to the right of the current y
                // @ts-ignore
                isWall = pointInSolid(this.leftX() - 2, this.centerY());
            }

            // if we are falling, there wasn't a wall, and now there is
            if (falling && wasntWall && isWall){
                this.hSpeed = 0;
                this.vSpeed = 0;

                // make sure we're butted up against the wall
                if (this.xScale == -1){ // facing right
                    // @ts-ignore
                    while (!pointInSolid(this.rightX() + 1, this.centerY())){
                        this.x += 1;
                    }
                    // @ts-ignore
                    while (pointInSolid(this.rightX(), this.centerY())){
                        this.x -= 1;
                    }
                    // @ts-ignore
                    while (pointInSolid(this.rightX() + 1, this.topY() - 1)){
                        this.y -= 1;
                    }         
                } else { // facing left
                    // @ts-ignore
                    while (!pointInSolid(this.leftX() - 1, this.centerY())){
                        this.x -= 1;
                    }
                    // @ts-ignore
                    while (pointInSolid(this.leftX(), this.centerY())){
                        this.x += 1;
                    }
                    // @ts-ignore
                    while (pointInSolid(this.leftX() - 1, this.topY() - 1)){
                        this.y -= 1;
                    }
                }
                this.sprite = sprPrincessLedgeGrab;
                this.state = this.ledgeGrab_state;
            }
        }
        catch(e){
            // @ts-ignore
            log(e.message, 3);
            // on fatal error, return to title screen
            // @ts-ignore
            showTitle();
        }
    }

    ledgeGrab_state(){
        // @ts-ignore
        log('entity.js.Player.ledgeGrab_state initialized', 1);
        try {
            // super simple state, we hover (no gravity)
            // we can either jump out of it, or drop down back into the move state

            if (keys.down){
                this.state = this.move_state;
            }

            if (keys.up){
                this.state = this.move_state;
                this.vSpeed = -16;
            }
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

class Collectible extends EntityWithSprite{
    constructor(x, y, sprite){
        super(x, y, sprite);
    }

    tick() {
        // @ts-ignore
        log('entity.js.Collectible.tick initialized', 1);
        try {
            // look around and see if the player is close enough for us to collect
            if (player.leftX() <= this.rightX() &&
            player.rightX() >= this.leftX() &&
            player.topY() <= this.bottomY() &&
            player.bottomY() >= this.topY()){
                this.collect()
            }
        }
        catch(e){
            // @ts-ignore
            log(e.message, 3);
            // on fatal error, return to title screen
            // @ts-ignore
            showTitle();
        }
    }

    collect(){
        // @ts-ignore
        log('entity.js.Collectible.collect initialized', 1);
        try {
            // remove the collectible from the list of collectibles
            for (let i = 0; i < entities.length; i++) {
                if (entities[i] == this) {
                    entities.splice(i, 1);
                }        
            } 
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

class SkullCollectible extends Collectible{
    constructor(x, y){
        super(x, y, sprSkull);
    }

    collect(){
        // @ts-ignore
        log('entity.js.SkullCollectible.collect initialized', 1);
        try {
            super.collect();
            skulls += 1;
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

class GoldSkullCollectible extends Collectible{
    constructor(x, y){
        super(x, y, sprGoldSkull);
    }

    collect(){
        // @ts-ignore
        log('entity.js.GoldSkullCollectible.collect initialized', 1);
        try {
            super.collect();
            goldskulls += 1;
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
