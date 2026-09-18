class Enemy {
    //enenmies appearing in level 2
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.length = 125;

        this.frame = 0;     //animation
        this.maxframe = 1;
        this.addframe = 0;
        this.direction = 27;

        this.velocity = 4; //scrolling speed
        this.stop = false; //to stop scrolling motion after won/lost
    }

    update() {
        if (this.stop == false) {
            this.frame = ++this.frame % this.maxFrame;
        }
    }

    hits(other) {
        if (other.y + other.length >= this.y + 45 &&    //collision witht the player
            other.y <= this.y + this.length &&
            other.x <= this.x + this.length - 50 &&
            other.x + other.length >= this.x + 50) {
            return true;
        } else {
            return false;
        }
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
    scroll() {
        if (this.stop == false) {
            if (keyIsDown(65)) {    //key A
                this.x += this.velocity;
            }
            if (keyIsDown(68)) {   //key D
                this.x -= this.velocity;
            }
        }
    }

    draw() {
        image(enmy, this.x, this.y, this.length,
            this.length, this.frame * 64,
            (this.direction + 1) * 64, 64, 64);
    }
}


