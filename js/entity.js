// this class will hold all entity-wide functions
class Entity{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.vSpeed = 0; // vertical speed
        this.hSpeed = 0; // horiontal speed
        this.state = undefined;
    }

    tick() {
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
    }

    tick() {
        this.state();
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
            } else { // player is pressing left
                this.sprite = sprPrincess1;
                this.sprite2 = sprPrincess2;
            }
        } 
        else {
            if (this.hSpeed > 0) { // character is moving right
                this.sprite = sprPrincess1Flipped;
                this.sprite2 = sprPrincess2Flipped;
            } else if (this.hSpeed < 0) { // character is moving left
                this.sprite = sprPrincess1;
                this.sprite2 = sprPrincess2;
            }
        }

        this.move();

    }
}