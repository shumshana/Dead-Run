class Coin {
    //coins drawn across the game
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = 4;  //scrolling speed
        this.length = 50;

        this.stop = false;  //to stop scrolling motion after won/lost
    }
    hits(other) {
        if (other.y + other.length >= this.y &&     //collision with the player
            other.y <= this.y + this.length &&
            other.x + other.length >= this.x + 47 &&
            other.x <= this.x + this.length - 47) {
            return true;
        } else {
            return false;
        }
    }
    scroll() {
        if (this.stop == false) {
            if (keyIsDown(65)) {    //right scroll A
                this.x += this.velocity;
            }
            if (keyIsDown(68)) {   //left scroll D
                this.x -= this.velocity;
            }
        }
    }
    draw() {
        image(cn, this.x, this.y, this.length, this.length, 0,
            0, 220, 220);
    }
    intersects(other) {
        if (other.y + other.length >= this.y &&     //overlapping with other objects
            other.y <= this.y + this.length &&
            other.x <= this.x + this.length &&
            other.x + other.length >= this.x) {
            return true;
        } else {
            return false;
        }
    }
}

