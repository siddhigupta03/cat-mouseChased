var instructions = 0;
var PLAY = 1;
var END = 2;
var gameState = instructions;

var ob,obG, ob1, ob2;
var mouse, mouseImg;
var gameOver, gameOverImg;
var cat, catImg;
var iGround, road;
var score = 0;
var bg;
var mouseCaught, mouseCaughtImg;
var gameOverS

function preload() {
    ob1 = loadImage("images/trap.png");
    mouseImg = loadImage("images/mouse.png");
    catImg = loadImage("images/cat.png");
    gameOverImg = loadImage("images/gameOver.png");
    bg = loadImage("images/bg.jpg");
    mouseCaughtImg = loadImage("images/mouseCaught.png");
    //road = loadImage("images/road.png");
    gameOverS = loadSound("gameOverS.mp4");
}

function setup() {
    createCanvas(2500,1000);

    gameOver = createSprite(1250,350);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;

    mouse = createSprite(700,550);
    mouse.addImage(mouseImg);
    mouse.scale = 0.4;

    cat = createSprite(200,850);
    cat.addImage(catImg);
    cat.scale = 0.4;

    iGround = createSprite(1250,1000,200000,40);
    iGround.shapeColor = "black";

    mouseCaught = createSprite(1250,700);
    mouseCaught.addImage(mouseCaughtImg);
    mouseCaught.scale = 0.5;

    obG = new Group();
}

function draw() {
        background(255);

        mouse.collide(iGround);
        cat.collide(iGround);

    if(gameState === instructions) {
        texts();
        mouse.visible = false;
        cat.visible = false;
        iGround.visible = false;
        gameOver.visible = false;
        mouseCaught.visible = false;

        if(keyDown('s')) {
            gameState = PLAY;
        }
    }
    //cat.debug = true;
    cat.setCollider("circle",0,0,1000);

    //iGround.debug = true;
    iGround.setCollider("rectangle",0,0,10,1250,105);

    if(gameState === PLAY) {
        background(bg);
        textSize(55);
        fill("black");
        textFont("Comic Sans MS");
        text("Score: "+ score, 60,90);

        cat.y = mouse.y;

        gameOver.visible = false;
        mouseCaught.visible = false;

        mouse.visible = true;
        cat.visible = true;
        iGround.visible = true;

        if(keyDown("space")) {
            mouse.velocityY = -12;
            cat.y = mouse.y;
        }
        mouse.velocityY += 1;
        score = score+Math.round(getFrameRate()/60);

        obs();

        if(mouse.isTouching(obG)) {
            gameOverS.play();
            gameState = END;
        }
}
        if(gameState === END) {
            background(bg);
            obG.destroyEach();
            gameOver.visible = true;
            textSize(95);
            fill("black");
            strokeWeight(4);
            stroke("black");
            textFont("Ink Free");
            text("CAUGHT!!",950,100);

            mouseCaught.visible = true;

            mouse.visible = false;
            cat.visible = false;
            iGround.visible = false;

            if(keyCode === 114) {
                reset();
            }

            textSize(75);
            fill("black");
            text("Press 'R', to restart",750,950);
        }

    drawSprites();
}

function texts() {
    textSize(60);
    fill("black");
    text("GAME INSRUCTIONS", 40, 90);

    textSize(45);
    fill("black")
    text("1) Press 'SPACE' to jump.", 40, 170);

    textSize(45);
    fill("black");
    text("2) Be careful from traps!!", 40, 240);

    textSize(45);
    fill("black");
    text("3) If your game's over, then press 'R' to restart", 40, 310);

    textSize(45);
    fill("black");
    text("4) Wanna start the game? Press 's'.", 40, 380);

    textSize(195);
    fill("magenta");
    textFont("Book Antiqua");
    text("ALL THE BEST!!", 250, 700);
}

function obs() {
    if(frameCount%300 === 0) {
        ob = createSprite(2500,850);
        ob.velocityX = -(6 + 3*score/100);
        ob.addImage(ob1);
        ob.scale = 0.09;
        obG.add(ob);
    }
}

function reset() {
    gameState = PLAY;
    score = 0;
}