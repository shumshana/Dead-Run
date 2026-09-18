class Sprite {
    //the main character to play the game
    constructor(x, y) {
        this.x = x; //horizontal movements
        this.y = y;
        this.velocityX = 4;
        this.length = 95;

        this.frame = 0; //animation
        this.maxFrame = 8;
        this.direction = 3;

        this.velocityY = 0; //jumping
        this.lift = -8;
        this.g = 0;

        this.stop = false; //to stop entire motion after won/lost
    }
    move() {
        if (this.stop == false) {
            if (keyIsDown(65)) {    //key A
                this.direction = 1;
                this.frame = ++this.frame % this.maxFrame;
                this.x -= this.velocityX;
            }
            if (keyIsDown(68)) {   //key D
                this.direction = 3;
                this.frame = ++this.frame % this.maxFrame;
                this.x += this.velocityX;
            }
        }
    }

    hits(other) {
        if (this.y + this.length >= other.y + 10 && //collision with other objects
            this.x <= other.x + other.length &&
            this.x + this.length / 2 >= other.x) {
            this.g = 0;
            this.velocityY = 0;
        }
    }

    update() {
        if (this.stop == false) {
            ///jump
            if (keyIsDown(32)) { //space bar
                this.velocityY = this.lift;
                this.y += this.velocityY;
            }
            if (this.y + this.length < height - 80) {
                this.frame = 8;
            }
            this.velocityY += this.g;
            this.y += this.velocityY;
            this.g = 1.5;
        }
    }
    offscreen() {
        if (this.x > width / 2 - this.length) { // horizontal range
            this.x -= this.velocityX;
        } else if (this.x < 0) {
            this.x += this.velocityX;
        }
        if (this.y < 50) { //limit upward motion when jumping
            this.y = 50;
        }
    }
    draw() {
        image(spt, this.x, this.y, this.length,
            this.length, this.frame * 64 + 17,
            (this.direction + 8) * 64 + 7, 44, 57);
    }
}





// image(spt, this.x, this.y, this.length,
//     this.length, this.frame * 64,
//     (this.direction + 8) * 64, 64, 64);


// stands(platform) {
//     var d = dist(this.x, this.y, platform.x + platform.breadth / 2, platform.y + platform.breadth / 2);
//     if (d < this.length / 2 + platform.length / 2) {
//         this.onPlatform = true;
//     } else {
//         this.onPLatform = false;
//     }
// }

// onPlatform() {
//     this.stand = true;
//     this.velocityY = 0;
// }


// move(other) {
//     if (this.y + this.length <= other.y + other.length &&
//         this.y >= 0 &&
//         this.x <= other.x &&
//         this.x + this.length >= other.x + other.length) {
//         if (this.stop == false) {
//             if (keyIsDown(65)) {    //LEFT A
//                 this.direction = 1;
//                 this.frame = ++this.frame % this.maxFrame;
//                 this.x -= this.velocityX;
//             }
//             if (keyIsDown(68)) {   //RIGHT D
//                 this.direction = 3;
//                 this.frame = ++this.frame % this.maxFrame;
//                 this.x += this.velocityX;
//             }
//         }
//     } else {
//         this.g = 0.5;
//     }
// }

// update(other) {
//     if (this.y + this.length <= other.y + other.length &&
//         this.y >= 0 &&
//         this.x <= other.x &&
//         this.x + this.length >= other.x + other.length) {
//         if (this.stop == false) {
//             ///jump
//             if (keyIsDown(32)) {
//                 this.velocityY = this.lift;
//                 this.y += this.velocityY;
//             }
//             this.velocityY += this.g;
//             this.y += this.velocityY
//         }
//     } else {
//         this.g = 0.5;
//     }
// }

// reposition() {
//     this.y = height - 160;
//     this.x = 0;
// }