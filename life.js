class Life {
  //the life bar
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.addframe = 0;
    this.maxframe = 5;
    this.dead = false;
    this.win = false;
  }
  update() {  //animation of life bar
    this.frame = ++this.frame % this.maxframe + this.addframe;
    if (this.frame == 4) {
      this.dead = true;
      this.addframe = 4;
      console.log(this.frame);
    }
  }
  draw() {
    image(hrt, this.x, this.y, 80, 80, this.frame * 120,
      0, 120, 120);
  }
}



// refill() {
//   this.frame = 0;
//   this.dead = false;
// }