var Game = require("./game");

let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d"); // 2d means 2 dimension

const GAME_WIDTH = 900;

const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT)


game.start()

document.getElementById('clickbutton').onclick= function startOver() {
    game.randomStart();
    requestAnimationFrame(gameloop);
}
let lastTime = 0;

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;

    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.draw(ctx);

    game.update(deltaTime);


    requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);