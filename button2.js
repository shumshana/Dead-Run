class Button2 {
    //click here buttons which appear after game is won or lost
    constructor(text, x, y, w, h, click) {
        this.x = x
        this.y = y;
        this.text = text;
        this.width = w;
        this.height = h;
        this.click = click;
        this.enabled = true;
    }

    clicked() {
        if (this.enabled) {
            if (mouseX > this.x - this.width / 2 &&     //mouse within the text box
                mouseX < this.x + this.width / 2 &&
                mouseY > this.y - this.height / 2 &&
                mouseY < this.y + this.height / 2) {
                //button is clicked
                this.click()
            }
        }
    }

    render() {
        push();     //text only
        textAlign(CENTER);
        fill(255, 0, 0);
        textSize(22);
        text(this.text, this.x, this.y + 10);
        pop();
    }
}