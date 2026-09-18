class Spike {
    //obstacle drawn accross the game 
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = 4;
        this.length = 75;
        this.stop = false;
    }
    hits(other) {
        if (other.y + other.length >= this.y + 25 && //collision with the player
            other.y <= this.y + this.length &&
            other.x <= this.x + this.length - 45 &&
            other.x + other.length >= this.x + 45) {
            return true;
        } else {
            return false;
        }
    }
    intersects(other) {
        if (other.y + other.length >= this.y && //overlapping with other objects
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
        spk.resize(this.length, this.length);
        image(spk, this.x, this.y);
    }
}

