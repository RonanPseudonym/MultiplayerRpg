const connection = new WebSocket("ws://PublicServer.ronanpseudonym.repl.co"); // Logging on

var players = [];
var playerData = [];
var gameData = [];

function send(txt) {
    connection.send(JSON.stringify(txt)); // A function to send (stringified) stuff
}

connection.onopen = function() {
    playerName = prompt("Please enter your name"); // Defining a player name
    console.log("Connected "+playerName) // On opening of connection
    
    send({"type":"player.new","name":playerName})
};

connection.onerror = function(error) {
    console.error("WebSocket Error " + error); // If there's an error
};

connection.onmessage = function(msg) {

    msg = JSON.parse(msg.data); // Converting msg back

    if (msg.type == "player.data") { // If the type of message is the location of all the players
        players = JSON.parse(msg["data"]); // Define players as data
        for(i=0;i<players.length;i++) {
            if(players[i].name == playerName) {
                playerObj.x = players[i].x;
                playerObj.y = players[i].y;
                playerObj.health = players[i].health;
            }
        }
    } else if (msg.type == "game.data") { // If the message is for defining the board
        gameData = [];
        for(i=0;i<msg.data.length;i++) {
            gameData.push(msg.data[i]);
        }
    // } else if (msg.type == "force.data") { // Yeets you back in bounds if you decide to be a tricky boi
    //     playerObj.x = msg.x;
    //     playerObj.y = msg.y;
    }

}

function sendData(x, y) {
    if (connection.readyState === WebSocket.OPEN) { // If the socket's open
        // updatePlayerData()
        send({"type":"player.loc","x":x,"y":y,"frame": playerObj.frame, "dir": playerObj.dir, "name": playerName}); // Send it
    }
}