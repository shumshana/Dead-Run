class Platform {
    //platforms on which the player stands
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = 4; //scrolling speed
        this.breadth = 60;
        this.length = 500;
        this.stop = false; //to stop scrolling motion after won/lost
    }

    draw() {
        fill(18, 23, 29);
        strokeWeight(5);
        plt.resize(this.length / 2, this.breadth);
        image(plt, this.x, this.y, this.length / 2, this.breadth);
        image(plt, this.x + this.length / 2, this.y, this.length / 2, this.breadth);
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
}

