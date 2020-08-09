var _Game = require("./game");

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d"); // 2d means 2 dimension

const GAME_WIDTH = 900;

const GAME_HEIGHT = 600;

let game = new _Game(GAME_WIDTH, GAME_HEIGHT)

game.start()

let lasttime = 0;

function gameloop(timestamp) {
    let deltaTime = timestamp - lasttime;
    lasttime = timestamp;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);


    game.update(deltaTime);

    game.draw(ctx);

    requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);