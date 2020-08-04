var _Game = require("./game");

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d"); // 2d means 2 dimension
ctx.fillStyle = "#f00";

// ctx.clearRect(0, 0, 900, 600);

// ctx.fillRect(20, 20, 100, 100);

// ctx.fillStyle = "#00f";

// ctx.fillRect(370, 260, 50, 50);
const GAME_WIDTH = 900;

const GAME_HEIGHT = 550;
let game = new _Game(GAME_WIDTH, GAME_HEIGHT)
// let _paddle = new _Paddle(game);
// _paddle.draw(ctx);
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