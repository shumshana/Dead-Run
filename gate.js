class Gate {
    //final gate to be reached to win the game
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = 4; //scrolling speed
        this.length = 250;
        this.stop = false; //to stop scrolling motion after won/lost
    }
    draw() {
        gt.resize(this.length, this.length);
        image(gt, this.x, this.y, this.length, this.length);
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
    reached(other) {    //detecting if player has reached the gate
        if (other.y + other.length >= this.y + 150 &&
            other.y <= this.y + 250 &&
            other.x <= this.x + 250 &&
            other.x + other.length >= this.x + 150) {
            return true;
        } else {
            return false;
        }
    }
}