class Button {
    //buttons on the menus
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
        push();     //for the rectangular box
        rectMode(CENTER);
        fill(0);
        rect(this.x, this.y, this.width, this.height)
        pop();

        push();     //for the text inside
        textAlign(CENTER);
        fill(255)
        textSize(30)
        text(this.text, this.x, this.y + 10)
        pop();
    }
}