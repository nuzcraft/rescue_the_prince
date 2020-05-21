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
    }

    tick() {
        this.xPrevious = this.x;
        this.yPrevious = this.y;
        this.state();
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

    // returns the right x coord of the entity
    rightX(){
        return this.x + this.sprite.draw_width - 1;
    }

    draw(){
        this.sprite.draw(this.x, this.y);
    }

    move() {
        // horizontal collisions
        if (this.hSpeed > 0) { // moving right
            if (pointInSolid (this.rightX() + this.hSpeed, this.centerY())){
                // if we're moving into a solid, need to make sure we don't overlap            
                while (!pointInSolid(this.rightX() + 1, this.centerY())){ //edge it in one at a time
                    this.x += 1;
                }
                this.hSpeed = 0;
            }
        } else if (this.hSpeed < 0) { // moving left
            if (pointInSolid (this.x + this.hSpeed, this.centerY())){
                while (!pointInSolid(this.x - 1, this.centerY())){
                    this.x -= 1;
                }
                this.hSpeed = 0;
            }
        } else if (this.hSpeed == 0){// not moving left or right
            while (pointInSolid(this.x, this.centerY())){
                this.x += 1;
            }
            while (pointInSolid(this.rightX(), this.centerY())){
                this.x -= 1;
            }
        }
        this.x += this.hSpeed;

        // vertical collisions
        if (this.vSpeed > 0) { // moving down
            if (pointInSolid (this.centerX(), this.bottomY() + this.vSpeed)){
                // if we're moving into a solid, need to make sure we don't overlap            
                while (!pointInSolid(this.centerX(), this.bottomY() + 1)){ //edge it in one at a time
                    this.y += 1;
                }
                this.vSpeed = 0;
            }
        } else if (this.vSpeed < 0) { // moving up
            if (pointInSolid (this.centerX(), this.y + this.vSpeed)){
                while (!pointInSolid(this.centerX(), this.y - 1)){
                    this.y -= 1;
                }
                this.vSpeed = 0;
            }
        } else if (this.vSpeed == 0){// on a surface
            // make sure we aren't sunk into the floor
            while(pointInSolid(this.centerX(), this.bottomY())){
                this.y -= 1;
            }
        }
        this.y += this.vSpeed;  
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
        this.state = this.move_state;
        this.facingRight = 0; // 0 for left, 1 for right
    }

    move_state() {
        // check the lower bound of the entity
        if (!pointInSolid(this.centerX(), this.bottomY() + 1)){
            // if point below the entity not in a solid, increase the vSpeed due to gravity
            this.vSpeed += gravity;

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

        // adjust the player sprites depending on the direction they are moving
        if (keys.right || keys.left){
            // if player is pressing a key, face that direction
            if (keys.right){ // player pressing right
                this.sprite = sprPrincess1Flipped;
                this.sprite2 = sprPrincess2Flipped;
                this.facingRight = 1;
            } else { // player is pressing left
                this.sprite = sprPrincess1;
                this.sprite2 = sprPrincess2;
                this.facingRight = 0;
            }
        } 
        else {
            if (this.hSpeed > 0) { // character is moving right
                this.sprite = sprPrincess1Flipped;
                this.sprite2 = sprPrincess2Flipped;
                this.facingRight = 1;
            } else if (this.hSpeed < 0) { // character is moving left
                this.sprite = sprPrincess1;
                this.sprite2 = sprPrincess2;
                this.facingRight = 0;
            }
        }

        this.move();

        // check for ledge grab state
        var falling = this.y - this.yPrevious > 0;
        var wasntWall, isWall;
        if (this.facingRight){ // facing right
            // check 3 pixels to the right of the previous y
            wasntWall = !pointInSolid(this.rightX() + 2, this.yPrevious + this.sprite.draw_height / 2);
            // check 3 pixels to the right of the current y
            isWall = pointInSolid(this.rightX() + 2, this.centerY());
        } else { // facing left
            // check 3 pixels to the left of the previous y
            wasntWall = !pointInSolid(this.x - 2, this.yPrevious + this.sprite.draw_height / 2);
            // check 3 pixels to the right of the current y
            isWall = pointInSolid(this.x - 2, this.centerY());
        }

        // if we are falling, there wasn't a wall, and now there is
        if (falling && wasntWall && isWall){
            this.hSpeed = 0;
            this.vSpeed = 0;

            // make sure we're butted up against the wall
            if (this.facingRight){ // facing right
                while (!pointInSolid(this.rightX() + 1, this.centerY())){
                    this.x += 1;
                }
                while (pointInSolid(this.rightX(), this.centerY())){
                    this.x -= 1;
                }
                while (pointInSolid(this.rightX() + 1, this.y - 1)){
                    this.y -= 1;
                }

                // get the ledge grab sprites
                this.sprite = sprPrincessLedgeGrabFlipped;
                this.sprite2 = sprPrincessLedgeGrabFlipped;

            } else { // facing left
                while (!pointInSolid(this.x - 1, this.centerY())){
                    this.x -= 1;
                }
                while (pointInSolid(this.x, this.centerY())){
                    this.x += 1;
                }
                while (pointInSolid(this.x - 1, this.y - 1)){
                    this.y -= 1;
                }

                // get the ledge grab sprites
                this.sprite = sprPrincessLedgeGrab;
                this.sprite2 = sprPrincessLedgeGrab;
            }

            this.state = this.ledgeGrab_state;
        }
    }

    ledgeGrab_state(){
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
}