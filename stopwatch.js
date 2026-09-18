class Stopwatch {
    //stopwatch showing time run in the game
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ms = 0; //millisecond
        this.s = 0;  //second
        this.run = 1;  //rate by which time runs
        this.paused = false;
    }

    update() {
        this.ms += this.run;
        if (this.ms > 60) {
            this.ms = 0;
            this.s += this.run;
        }
        if (this.s > 60) {
            this.s = 0;
        }

        fill(255);  //display time 
        text(this.ms, this.x + 40, this.y);
        text(":", this.x + 30, this.y);
        text(this.s, this.x, this.y);
    }
    reset() {
        this.cs = 0;
        this.s = 0;
        this.m = 0;
    }
    pause() {
        this.paused = true;
        this.run = 0;
    }
    resume() {
        this.paused = false;
        this.run = 1;
    }
}