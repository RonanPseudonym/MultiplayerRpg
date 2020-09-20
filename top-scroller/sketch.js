var canvas_width = 1000, canvas_height = 700; // Defining width and height of canvas

var stars = []

function setup() { // Setting up the game

    createCanvas(canvas_width, canvas_height); // Creating the inital canvas
    fill(0); // Color: Black
    noStroke() // Don't draw a border

    textSize(15); // SETTING UP TEXT
    textAlign(CENTER);

    for(i=0;i<100;i++) {
        row = [];
        row.push(random(1000), random(1000), random(-30)); // Making starfield
        stars.push(row);
    }
} ;

function preload() { // Preloading assets
    tile = loadImage("assets/tile.png");
    orbit = loadSound("assets/orbit.mp3");

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
    fill(255);
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

function draw() { // Drawing the graphics

    // ========================================

    // DRAW

    fill(255); // WHITE
    starryBackground(); // BG
    infiniteTiles() // Tiles

    for (i=0;i<gameData.length;i++) { // For gamedata.length
        gameDataSelection = gameData[i]; // Just a convinience
        if (gameDataSelection["texture"] == "test") { // If this is of texture 'test'
            rect(gameDataSelection["x"]-playerObj.scrollX, gameDataSelection["y"]-playerObj.scrollY, gameDataSelection["width"], gameDataSelection["height"]) // Draw object

        } else if (gameDataSelection["texture"] == "tile") { // If this is of texture 'tile'
        image(tile, gameDataSelection["x"]-playerObj.scrollX, gameDataSelection["y"]-playerObj.scrollY, gameDataSelection["width"], gameDataSelection["height"]);
        }
    };

    // drawSprite(playerObj.dir, playerObj.frame, playerObj.x, playerObj.y, playerObj.width, playerObj.height); // Drawing you

    for (i=0;i<players.length;i++) {
        // if (players[i].name != playerName) { // If it isn't you
            drawSprite(players[i].dir, players[i].frame, players[i].x, players[i].y, playerObj.width, playerObj.height); // Drawing player            
            fill(255);
            text(players[i].name, players[i].x-playerObj.scrollX+(playerObj.width/2),players[i].y-playerObj.scrollY-5); // Draw name
        // }

            if(players[i].name == playerName) {
                playerObj.x = players[i].x;
                playerObj.y = players[i].y;
                console.log(players[i])
            }
    }

    playSoundtrack();

    // ========================================

    // KEYBOARD INPUT

    if (keyIsDown(LEFT_ARROW)) { // Left
        playerObj.dir = "left";
        sendData(-1, 0)
    }

    if (keyIsDown(RIGHT_ARROW)) { // Right
        playerObj.dir = "right";
        sendData(1, 0)
    }

    if (keyIsDown(UP_ARROW)) { // Up
        playerObj.dir = "up";
        sendData(0, -1)
    }

    if (keyIsDown(DOWN_ARROW)) { // Down
        playerObj.dir = "down";
        sendData(0, 1)
    };

    // ========================================

    // COLLISION HANDLING

    // temporaryPlayers = []
    // for (i=0;i<players.length;i++) { // Making a temporary list for collision detection
    //     if (players[i].name != playerName) { // If it isn't you

    //     row = {
    //         "x": players[i].x,
    //         "y": players[i].y,
    //         "width": playerObj.width,
    //         "height": playerObj.height,
    //         "texture": "tempPlayer",
    //         "collision": true,
    //         "dir": playerObj.dir,
    //         "frame": playerObj.frame
    //     }

    //     temporaryPlayers.push(row)
    // };
    // }

    // if (playerObj.collision(playerObj.x+playerObj.horizontalVelocity, playerObj.y+playerObj.verticalVelocity, temporaryPlayers) == 0) { // If there isn't any collision because of the players

    //     if (playerObj.collision(playerObj.x+playerObj.horizontalVelocity, playerObj.y+playerObj.verticalVelocity, gameData).length == 0) { // Checking if the x + velocity && y + velocity is a - okay

    //         if (playerObj.horizontalVelocity != 0 || playerObj.verticalVelocity != 0) { // If there's a change in velocity
    //             sendData(); // Sending your data
    //             toggleWalk(); // Changing animation
    //         } else { // If you're idle
    //             if (playerObj.frame != 0) {
    //                 playerObj.frame = 0; // Set state to idle
    //                 sendData(); // Tell everyone you're an idle boi
    //             }
    //         }
    
    //         playerObj.x += playerObj.horizontalVelocity; // Making the changes
    //         playerObj.y += playerObj.verticalVelocity;
    
    //     };
    // }

    playerObj.scrollX = (playerObj.x - ((canvas_width/2)-(playerObj.width/2))) // Adjusting for scrolling
    playerObj.scrollY = (playerObj.y - ((canvas_height/2)-(playerObj.height/2)));

};