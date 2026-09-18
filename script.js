// Dead Run //
//a side-scrolling survivial game 

//variables for object images
var spt;    //player
var spk;    //spike
var hrt;    //life bar
var cn;     //coin
var gt;     //final gate
var plt;    //platfrorm
var enmy;   //enemy

//variables for objects
var player;
var life;
var platform = []
var spike = []
var coin = []
var gate;
var enemy = []

var score = 0;
var stopwatch;

//Buttons on every screens
var buttons = []
var pauseButtons = []
var menuButtons = []
var gameButtons = []
var endButtons = []
var winButtons = []
var buttonMode = 'life';
var gameMode = 'menu';

//click here buttons to end the game 
var gatebutton2;    //to the game won menu
var lifebutton2;    //to the game lost menu

//variables for background images
var playscreen;
var startscreen;
var levelscreen;
var tutorialscreen;
var endscreen;
var winscreen;

function setup() {
    spt = loadImage("/images/player.png");
    spk = loadImage("/images/spike.png");
    hrt = loadImage("/images/heart.png");
    cn = loadImage("/images/coin.png");
    gt = loadImage("/images/gate.png");
    plt = loadImage("/images/brick.png");
    enmy = loadImage("/images/enemy.png");

    playscreen = loadImage("/menus/sky.jpg");
    startscreen = loadImage("/menus/startscreen.png");
    pausescreen = loadImage("/menus/pausescreen.png");
    levelscreen = loadImage("/menus/levelscreen.png");
    tutorialscreen = loadImage("/menus/tutorialscreen.png");
    endscreen = loadImage("/menus/endscreen.png");
    winscreen = loadImage("/menus/winscreen.png");

    createCanvas(600, 400);
    player = new Sprite(0, height - 150);
    life = new Life(0, 0);
    stopwatch = new Stopwatch(100, 70);
    gate = new Gate(7400, 120);

    for (var i = 0; i < 20; i++) {
        platform[i] = new Platform(i * 650, height - 80);
    }
    for (var j = 0; j < 30; j++) {
        spike[j] = new Spike(j * 650 + random(50, 400), height - 150);
    }
    for (var k = 0; k < 250; k++) {
        coin[k] = new Coin(k * 60 + 100, height - 150);
    }

    for (var l = 0; l < 30; l++) {
        enemy[l] = new Enemy(l * 650 + random(50, 400), height - 160);
    }
    ///click here buttons ---> when game ends            
    lifebutton2 = new Button2("click here", 60, 100, 80, 30, () => { gameMode = 'end'; buttons = endButtons; });
    gatebutton2 = new Button2("click here", 330, 70, 80, 30, () => { gameMode = 'win'; buttons = winButtons; });

    ///Scene Switching ---> creating buttons 
    menuButtons = [
        new Button("Start", 132, 175, 185, 50, () => { gameMode = 'play1'; buttons = gameButtons; }),
        new Button("Levels", 132, 250, 185, 50, () => { gameMode = 'levels'; buttons = levelButtons }),
        new Button("Tutorial", 132, 325, 185, 50, () => { gameMode = 'tutorial'; buttons = tutorialButtons })]

    gameButtons = [new Button("|  |", width - 60, 50, 50, 50, () => { gameMode = 'pause'; buttons = pauseButtons })]
    winButtons = [
        new Button("Next level", 132, 175, 185, 50, () => { gameMode = 'win'; buttons = winButtons; })
    ]
    pauseButtons = [
        new Button("Resume", 132, 175, 185, 50, () => { gameMode = 'play1'; buttons = gameButtons }),
        new Button("Quit", 132, 250, 185, 50, () => { gameMode = 'menu'; buttons = menuButtons })]

    tutorialButtons = [
        new Button("Tutorial", 132, 175, 185, 50, () => { gameMode = 'tutorial'; buttons = tutorialButtons }),
        new Button("Quit", 132, 250, 185, 50, () => { gameMode = 'menu'; buttons = menuButtons })]

    endButtons = [
        new Button("Replay", 132, 175, 185, 50, () => { gameMode = 'end'; buttons = endButtons })]

    levelButtons = [
        new Button("Levels", 132, 175, 185, 50, () => { gameMode = 'level'; buttons = levelButtons }),
        new Button("Quit", 132, 250, 185, 50, () => { gameMode = 'menu'; buttons = menuButtons }),
        new Button("1", 317, 97, 50, 50, () => { gameMode = 'play1'; buttons = gameButtons }),
        new Button("2", 415, 97, 50, 50, () => { gameMode = 'play2'; buttons = gameButtons }),
        new Button("3", 513, 97, 50, 50, () => { gameMode = 'play3'; buttons = levelButtons }),
        new Button("4", 317, 197, 50, 50, () => { gameMode = 'play4'; buttons = levelButtons }),
        new Button("5", 415, 197, 50, 50, () => { gameMode = 'play5'; buttons = levelButtons })]
    buttons = menuButtons;
}

function mousePressed() {
    for (b of buttons) { b.clicked() }
    lifebutton2.clicked();
    gatebutton2.clicked();
}

function draw() {
    //main draw function for scene switching
    switch (gameMode) {
        case 'play1':
            drawGame1();
            break
        case 'play2':
            drawGame2();
            break
        case 'levels':
            drawLevels();
            break
        case 'tutorial':
            drawTutorial();
            break
        case 'menu':
            drawMenu();
            break
        case 'pause':
            drawPause();
            break
        case 'end':
            drawEnd();
            break
        case 'win':
            drawWin();
            break
    }
    for (b of buttons) {
        b.render()
    }
}

///drawing menus screens
function drawWin() {
    background(winscreen);
    text("Refresh page &", 50, 250);
    text("go to levels", 60, 290);
}
function drawPause() {
    background(pausescreen);
}
function drawMenu() {
    background(startscreen);
    stopwatch.reset();
}
function drawTutorial() {
    background(tutorialscreen);
}
function drawLevels() {
    background(levelscreen);
}
function drawEnd() {
    background(endscreen);
    text("Refresh page", 60, 250);
    text("to replay", 80, 290);
}

///////////////////////////////////////Level 1
//Obstacles in level 1 are spikes
function drawGame1() {
    background(playscreen);

    fill(255);
    textSize(22);
    text("Level 1", 300, 40);
    text("Coins:", 100, 40)
    text(score, 170, 40);   //present scores

    //platforms
    for (var i = 0; i < platform.length; i++) {
        platform[i].draw();
        platform[i].scroll();
        if (life.dead == true) {
            platform[i].stop = true;
        }
        if (life.win == true) {
            platform[i].stop = true;
        }
        player.hits(platform[i]);
    }
    //final gate to reach 
    gate.draw();
    gate.scroll();

    //drawing the character
    player.draw();
    if (frameCount % 3 == 0) {  //player animation
        player.move();
    }
    player.update();
    player.offscreen();

    //the life bar
    life.draw();
    if (player.y > height) { //player fall---> reduce life---> detect dead
        life.update();
    }
    if (gate.reached(player)) {     //player winning level 1
        life.win = true;
        gatebutton2.render();   //click here button
    }

    stopwatch.update();

    //coins
    for (var k = 0; k < coin.length; k++) {
        coin[k].draw();
        coin[k].scroll();
        if (life.dead == true) {
            coin[k].stop = true;    //stop scrolling of coins after lost
            lifebutton2.render();   //clcik here button
        }
        if (life.win == true) {
            coin[k].stop = true;    //stop scrolling of coins after won
        }
        for (var b = coin.length - 1; b >= 0; b--) {
            if (coin[b].hits(player)) {
                coin.splice(b, 1);  //collecting coins
                score += 1;
            }
        }
    }

    //spikes
    for (var j = 0; j < spike.length; j++) {
        spike[j].draw();
        spike[j].scroll();
        if (life.dead == true) {
            spike[j].stop = true;   //stop scrolling of spikes after lost
        }
        if (life.win == true) {
            spike[j].stop = true;   //stop scrolling of spikes after won
        }
        for (var a = spike.length - 1; a >= 0; a--) {
            if (spike[a].hits(player)) {
                spike.splice(a, 1); //disappearance of spikes after hit
                life.update();
            }
            if (spike[a].intersects(gate)) {    //avoid overlapping with gate
                spike.splice(a, 1);
            }
        }
    }
    //overlapping of coins with ther objects
    for (var j = 0; j < spike.length; j++) {
        for (var k = 0; k < coin.length; k++) {
            for (var b = coin.length - 1; b >= 0; b--) {
                if (coin[b].intersects(spike[j]) ||
                    coin[b].intersects(gate) ||
                    coin[b].x > gate.x) {   //delete coins drawn beyond the final gate
                    coin.splice(b, 1);
                }
            }
        }
    }

    //stop the scrolling motion all the objects
    if (life.dead == true) {
        player.stop = true;
        gate.stop = true;
        stopwatch.pause(); //pause time
    }
    if (life.win == true) {
        player.stop = true;
        gate.stop = true;
        stopwatch.pause();
    }
}


/////////////////////////////////////////Level 2
//Obstcale in level 2 are enemies
function drawGame2() {
    background(playscreen);

    fill(255);
    textSize(22);
    text("Level 2", 300, 40);
    text("Coins:", 100, 40)
    text(score, 170, 40);

    //platform pl
    for (var i = 0; i < platform.length; i++) {
        platform[i].draw();
        platform[i].scroll();
        if (life.dead == true) {
            platform[i].stop = true;
        }
        if (life.win == true) {
            platform[i].stop = true; //stop platform scrolling after
        }
        player.hits(platform[i]);
    }

    //final gate
    gate.draw();
    gate.scroll();

    //drawing the character
    player.draw();
    if (frameCount % 3 == 0) {
        player.move();
    }
    player.update();
    player.offscreen();

    life.draw();

    if (player.y > height) {
        life.update();  //player fall and dies
    }
    if (gate.reached(player)) {
        life.win = true;
        gatebutton2.render();   //click here button to end the game
    }

    stopwatch.update();
    //coins
    for (var k = 0; k < coin.length; k++) {
        coin[k].draw();
        coin[k].scroll();
        if (life.dead == true) {
            coin[k].stop = true;
            lifebutton2.render();   //click here button to end the game
        }
        if (life.win == true) {
            coin[k].stop = true;
        }
        for (var b = coin.length - 1; b >= 0; b--) {
            if (coin[b].hits(player)) {
                coin.splice(b, 1);      //collect coins---> disappear coins
                score += 1;
            }
        }
    }
    //enemies
    for (var l = 0; l < enemy.length; l++) {
        enemy[l].draw();
        enemy[l].update();
        enemy[l].scroll();
        if (life.dead == true) {
            enemy[l].stop = true;   //stop scrolling motion when game lost
        }
        if (life.win == true) {
            enemy[l].stop = true;   //stop scrolling motion when game won
        }
        for (var a = enemy.length - 1; a >= 0; a--) {
            if (enemy[a].hits(player)) {
                life.update();
                player.x -= 150;    //push back the player when hit by the enemy 
            }
            if (enemy[a].intersects(gate)) {    //delete enemies drawn over the final gate
                enemy.splice(a, 1);
            }
        }
    }
    //overlapping of coins with other objects
    for (var l = 0; l < enemy.length; l++) {
        for (var k = 0; k < coin.length; k++) {
            for (var b = coin.length - 1; b >= 0; b--) {
                if (coin[b].intersects(enemy[l]) ||
                    coin[b].intersects(gate) ||
                    coin[b].x > gate.x) {
                    coin.splice(b, 1);
                }
            }
        }
    }

    if (life.dead == true) { // pause motion of objects after game lost
        player.stop = true;
        gate.stop = true;
        stopwatch.pause();
    }
    if (life.win == true) { //pause motion of objects after game won
        player.stop = true;
        gate.stop = true;
        stopwatch.pause();
    }
}



