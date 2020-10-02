objects = []

options = [
    "New",
    "Edit",
    "Delete",
    "Resize",
    "Duplicate",
    "Save",
    "Load",
]

selected = undefined;
dragX = 0; // Making it nicer
dragY = 0;

xScroll = 0;
yScroll = 0;

menuX = undefined;
menuY = undefined;

menuOpen = false;

resizeMode = false;
doubleClick = false;

function preload() {
    slimeImg = loadImage('assets/slime.png')
    tileImg = loadImage('assets/tile.png')
}

// ====================== popup menu

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault()
        console.log("Right click")
        menuOpen = true;
    }, false);
}

// =================================

function copyToClipboard(text) { // Thanks https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function setup() {
    createCanvas(1000, 1000);
}

function scroll() { // Scrolling
    if (keyIsDown(LEFT_ARROW)) {
        xScroll += 20;
        if (dragX != undefined) {
            dragX -= 20;
        };
      };
    
      if (keyIsDown(RIGHT_ARROW)) {
        xScroll -= 20;
        if (dragX != undefined) {
            dragX += 20;
        };
      }
    
      if (keyIsDown(UP_ARROW)) {
        yScroll += 20;
        if (dragY != undefined) {
            dragY -= 20;
        };
      }
    
      if (keyIsDown(DOWN_ARROW)) {
        yScroll -= 20;
        if (dragY != undefined) {
            dragY += 20;
        };
      }
}

function checkDrag() {
    if(menuX == undefined) {
        xPos = mouseX;
        yPos = mouseY;
    } else {
        xPos = menuX;
        yPos = menuY;
    }

    for(i=0;i<objects.length;i++) { // Basically collision detection hyefwui ive done this so many times
        if(xPos-xScroll >= objects[i].x && xPos-xScroll <= objects[i].x+objects[i].width && yPos-yScroll >= objects[i].y && yPos-yScroll <= objects[i].y+objects[i].height) {
            selected = i;
                dragX = objects[i].x-mouseX;
                dragY = objects[i].y-mouseY;
        };
    };
};

function dragObjects() { // Dragging stuff)
    console.log(resizeMode)
    if(mouseIsPressed) {
        if(menuOpen == false) {
            if(selected==undefined) { // If there's nothing selected
            checkDrag();
            } else {
                if(resizeMode == false) {
                    objects[selected].x = mouseX+dragX;
                    objects[selected].y = mouseY+dragY;
                } else if (resizeMode == true) {
                    objects[selected].width = mouseX - objects[selected].x + scrollX;
                    objects[selected].height = mouseY - objects[selected].y + scrollY;
                }
            }

        } else {
            selected = undefined
        }
    } else if (doubleClick == false){
        selected = undefined;
        resizeMode = false;
    }
}

function createObject(imp) {
    movementPattern = "none";
    awake = false;
    lock = "none";
    width = 50;
    height = 50;
    objTexture = "test";
    collision = true;
    moving = false;
    sincount = 0;
    damage = 0;
    movementExist = false;

    if(imp == "test") {
        // Nothing here
    } else if (imp == "slime") {
        movementPattern = "follow"
        lock = 0;
        damage = 1;
        objTexture = "slime";
        movementExist = true;

    } else if (imp == "tile") { 
        objTexture = "tile";
    } else {
        console.log(imp)
    }

    objects.push({
        "x": mouseX-xScroll-(width/2),
        "y": mouseY-yScroll-(height/2),
        "width": width,
        "height": height,
        "texture": objTexture,
        "collision": collision,
        "damage": damage,
        "type": movementPattern,
        "moving": movementExist,
        "awake": awake,
        "sincount": sincount,
        "lock": lock,
        "originalx": mouseX-xScroll-(width/2),
        "originaly": mouseY-yScroll-(height/2),
    });
}

function drawObjects() { // Drawing everything to the screen
    for(i=0;i<objects.length;i++) {
        if(i==selected) {
            strokeWeight(5);
            stroke(255, 0, 0);
            noFill()
            rect(objects[i].x+xScroll, objects[i].y+yScroll, objects[i].width, objects[i].height)
        }
        noStroke();
        if(objects[i].texture == "test") {
            fill(0);
            rect(objects[i].x+xScroll, objects[i].y+yScroll, objects[i].width, objects[i].height);
        } else if (objects[i].texture == "slime") {
            image(slimeImg, objects[i].x+xScroll, objects[i].y+yScroll, objects[i].width, objects[i].height)
        } else if (objects[i].texture == "tile") {
            image(tileImg, objects[i].x+xScroll, objects[i].y+yScroll, objects[i].width, objects[i].height)
        }
    }
}

function drawMenu() {

    if(menuOpen == true) {
        if(menuX == undefined && menuY == undefined) {
            menuX = mouseX;
            menuY = mouseY;
        }
        fill(0, 0, 0, 220)
        rect(menuX, menuY-35, 150, options.length*35+15, 20)
        textSize(25);
        textFont('futura')
        fill(255)
        for(i=0;i<options.length;i++) {
            text(options[i], menuX+20, menuY+(i*35))
        };
    };
};

function closeMenu() {
    menuX = undefined;
    menuY = undefined;
    menuOpen = false;
}

function mouseClicked() {
    console.log("Click")
    doubleClick = false;
    if(menuOpen == true) {
        if(mouseX>=menuX && mouseX <= menuX+150 && mouseY+30>=menuY && mouseY+30 <= menuY+options.length*35) {
            selection = ""
            for(i=0;i<options.length;i++) { // Checking what option you clicked on
                if((mouseY+35)>menuY+(i*35) && (mouseY+35)<menuY+((i+1)*35)) {
                    selection  = options[i];
                }
            }

            if(selection == "New") { // Doing all the menu options
                createObject(prompt("Enter name"));

            } else if (selection == "Save") {
                drawData();

            } else if (selection == "Delete") {
                checkDrag();
                if(selected!=undefined) {
                    objects.splice(selected, 1)
                }

            } else if (selection == "Resize") {
                checkDrag();
                console.log(selected)
                resizeMode = true;
                doubleClick = true;

            } else if (selection == "Duplicate") {
                checkDrag();
                if(selected!=undefined) {
                    console.log(objects);
                    objects.push(JSON.parse(JSON.stringify(objects[selected])));
                    objects[objects.length-1].x += 20;
                    objects[objects.length-1].y += 20;
                }

            } else if (selection == "Edit") {
                checkDrag();
                if(selected!=undefined) {
                    newData = prompt("Please input updated code", JSON.stringify(objects[selected]));
                    objects[selected] = JSON.parse(newData);
                }

            } else if (selection == "Load") {
                    newData = prompt("Please input updated code");
                    objects = JSON.parse(newData);
            }

            if(selection != undefined) {
                closeMenu();
            };

        } else {
            closeMenu();
        }
    }
}

function drawData() {
    copyToClipboard(JSON.stringify(objects))
};

function draw() {

    background(255);

    scroll();
    dragObjects();

    drawObjects();
    drawMenu();
};