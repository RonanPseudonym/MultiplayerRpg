var canvas_width = 1000, canvas_height = 700; // Defining width and height of canvas

var stars = []
var sinWave = 0;

function setup() { // Setting up the game

    createCanvas(canvas_width, canvas_height); // Creating the inital canvas
    fill(0); // Color: Black
    noStroke() // Don't draw a border

    textSize(15); // SETTING UP TEXT
    textStyle(BOLD);
    textAlign(CENTER);

    for(i=0;i<100;i++) {
        row = [];
        row.push(random(1000), random(1000), random(-30)); // Making starfield
        stars.push(row);
    }

    pause = 10; // Making sure that when you stop, you stop fOr rEalZ
} ;

function preload() { // Preloading assets
    tile = loadImage("assets/tile.png");
    orbit = loadSound("assets/orbit.mp3");
    web = loadImage("assets/web.png");

    down_idle = loadImage("assets/front_idle.png");
    down_1 = loadImage("assets/front_1.png");
    down_2 = loadImage("assets/front_2.png");

    up_idle = loadImage("assets/back_idle.png");
    up_1 = loadImage("assets/back_1.png");
    up_2 = loadImage("assets/back_2.png");

    left_idle = loadImage("assets/left_idle.png");
    left_1 = loadImage("assets/left_1.png");
    left_2 = loadImage("assets/left_2.png");

    right_idle = loadImage("assets/right_idle.png");
    right_1 = loadImage("assets/right_1.png");
    right_2 = loadImage("assets/right_2.png");

    slime = loadImage("assets/slime.png");
}


function toggleWalk() { // Toggling the walk animation
    if (playerObj.frame == 0) {
        playerObj.frame = 1;
    } else if (playerObj.frame >= 1 && playerObj.frame < 3) {
        playerObj.frame += 0.05; // Slowing down the walk cycle
    } else if (playerObj.frame >= 3) {
        playerObj.frame = 1;
    }
}

function playSoundtrack() { // Playing the music
    if (orbit.isPlaying()) {
    } else {
        orbit.play();
    }
}

function drawSprite(dir, frame, x, y, width, height) { // Draw the player
    if (dir == "down") {
        if (floor(frame) == 0) {
            image(down_idle,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        } else if (floor(frame) == 1) {
            image(down_1,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        } else if (floor(frame) == 2) {
            image(down_2,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        }
    } if (dir == "up") {
        if (floor(frame) == 0) {
            image(up_idle,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        } else if (floor(frame) == 1) {
            image(up_1,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        } else if (floor(frame) == 2) {
            image(up_2,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        }
    } if (dir == "left") {
        if (floor(frame) == 0) {
            image(left_idle,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        } else if (floor(frame) == 1) {
            image(left_1,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        } else if (floor(frame) == 2) {
            image(left_2,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        }
    } if (dir == "right") {
        if (floor(frame) == 0) {
            image(right_idle,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        } else if (floor(frame) == 1) {
            image(right_1,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        } else if (floor(frame) == 2) {
            image(right_2,x-playerObj.scrollX,y-playerObj.scrollY, width*1.5, height*1.5);
        }
    } else {
        console.log(dir, frame)
    }
};

function starryBackground() { // Creating a nice starry background
    background(0);
    fill(200)
    for(i=0;i<stars.length;i++) {
        rect(((playerObj.x/stars[i][2])+stars[i][0]),((playerObj.y/stars[i][2])+stars[i][1]), 4, 4); // Oof
    }
}

function infiniteTiles() { // Draw infinite tiles
    fancyX = (floor((playerObj.x)/100)*100)-playerObj.x // Making a nice fancy x for use in scrolling
    fancyY = (floor((playerObj.y)/100)*100)-playerObj.y // Same thing here

    for(y=0;y<(canvas_height/100)+1;y++) {
        for(x=0;x<(canvas_width/100)+2;x++) {
            image(tile, (x*100)+fancyX-25, (y*100)+fancyY+25, 50, 50)
        }
    }
}

function tileFloor() { // N I C E
    background(255);
    fancyX = (floor((playerObj.x)/30)*30)-playerObj.x // Making a nice fancy x for use in scrolling
    fancyY = (floor((playerObj.y)/30)*30)-playerObj.y // Same thing here
    for(i=0;i<canvas_width;i+= 30) {
        for(j=0;j<canvas_height;j+= 30) {
            noStroke();
            fill(200);
            ellipse(i+fancyX, j+fancyY, 5)
        }
    }
}

function draw() { // Drawing the graphics

    // ========================================

    // DRAW

    sinWave += 0.1

    fill(255); // WHITE
    // starryBackground(); // BG
    // infiniteTiles() // Tiles

    tileFloor()

    for (i=0;i<gameData.length;i++) { // For gamedata.length
        gameDataSelection = gameData[i]; // Just a convinience

        if (gameDataSelection["texture"] == "test") { // If this is of texture 'test'
            rect(gameDataSelection["x"]-playerObj.scrollX, gameDataSelection["y"]-playerObj.scrollY, gameDataSelection["width"], gameDataSelection["height"]) // Draw object

        } else if (gameDataSelection.texture == "slime") {
                if(gameDataSelection.awake == true){ // Drawing a "!"
                    textSize(25);
                    text("!", gameDataSelection["x"]-playerObj.scrollX+gameDataSelection.width/2, gameDataSelection["y"]-playerObj.scrollY)
                    textSize(15);
                }
                image(slime, gameDataSelection["x"]-playerObj.scrollX, gameDataSelection["y"]-playerObj.scrollY, gameDataSelection["width"], gameDataSelection["height"])
        }

        else if (gameDataSelection["texture"] == "tile") { // If this is of texture 'tile'
        image(tile, gameDataSelection["x"]-playerObj.scrollX, gameDataSelection["y"]-playerObj.scrollY, gameDataSelection["width"], gameDataSelection["height"]);
        }
    };

    // drawSprite(playerObj.dir, playerObj.frame, playerObj.x, playerObj.y, playerObj.width, playerObj.height); // Drawing you

    for (omg=0;omg<players.length;omg++) {
        currentPlayer = players[omg]
        newMg = omg;
        // if(player.name == playerName) {
        //     var playerLoc = i;
        // }
        drawSprite(currentPlayer.dir, currentPlayer.frame, currentPlayer.x, currentPlayer.y, 40, 40); // Drawing player
            console.log(currentPlayer.x, currentPlayer.y)  
            fill(255);
            text(currentPlayer.name, currentPlayer.x-currentPlayer.scrollX+(currentPlayer.width/2)+5,currentPlayer.y-currentPlayer.scrollY-5); // Draw name
        // }

    }

    fill(0, 255, 0);
    rect(20, 20, playerObj.health, 30);
    fill(200);
    rect(20+playerObj.health, 20, 100-playerObj.health, 30);

        fill(255, 0, 0, 200-((playerObj.health*5)+(Math.sin(sinWave)*10))); // The fourth parameter is the "alpha," how transparent the following shapes are
        rect(0, 0, canvas_width, canvas_height);

    playSoundtrack();

    // ========================================

    // KEYBOARD INPUT

    bufferSpeed = 10;

    if (keyIsDown(LEFT_ARROW)) { // Left
        playerObj.dir = "left";
        sendData(-1, 0)
        players[newMg].x -= bufferSpeed;
        pause = 0;
    }

    if (keyIsDown(RIGHT_ARROW)) { // Right
        playerObj.dir = "right";
        sendData(1, 0)
        players[newMg].x += bufferSpeed;
        pause = 0;
    }

    if (keyIsDown(UP_ARROW)) { // Up
        playerObj.dir = "up";
        sendData(0, -1)
        players[newMg].y -= bufferSpeed;
        pause = 0;
    }

    if (keyIsDown(DOWN_ARROW)) { // Down
        playerObj.dir = "down";
        sendData(0, 1)
        players[newMg].y += bufferSpeed;
        pause = 0;
    }

    else {
        pause ++;
        if(pause>10) {
            sendData(0, 0);
        }
    }

    playerObj.scrollX = (playerObj.x - ((canvas_width/2)-(playerObj.width/2))) // Adjusting for scrolling
    playerObj.scrollY = (playerObj.y - ((canvas_height/2)-(playerObj.height/2)));

};