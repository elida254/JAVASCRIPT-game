var Paddle = require("./paddle.js");
var InputHandler = require("./input");
var Ball = require("./ball");
var brick = require("./brick");
var AllLevels = require('./levels');

var buildlevel = AllLevels.buildlevel;
var level1 = AllLevels.level1;
var level2 = AllLevels.level2;

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}

class Game {

    constructor(gamewidth, gameheight) {
        this.gamewidth = gamewidth;

        this.gameheight = gameheight;

        this.gamestate = GAMESTATE.MENU; //2

        this.paddle = new Paddle(this);

        this.ball = new Ball(this);

        this.gameObjects = [];

        this.bricks = [];

        this.lives = 3;

        this.levels = [level1, level2];

        this.currentLevel = 0;

        new InputHandler(this.paddle, this);

    }

    start() {
        // let brick = new Brick(this, { x: 20, y: 20});

        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;

        this.bricks = buildlevel(this, this.levels[this.currentLevel]);
        this.ball.reset();

        this.gameObjects = [this.ball, this.paddle];

        this.gamestate = GAMESTATE.RUNNING;

    }

    update(deltaTime) {
        if (this.lives == 0) this.gamestate = GAMESTATE.GAMEOVER;
        if (this.gamestate == GAMESTATE.PAUSED || this.gamestate == GAMESTATE.MENU || this.gamestate == GAMESTATE.GAMEOVER) return;

        if (this.bricks.length === 0) {
            this.currentLevel++;

            this.gamestate = GAMESTATE.NEWLEVEL;

            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion)

    }

    draw(ctx) {

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(ctx));

        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gamewidth, this.gameheight);

            ctx.fillStyle = "rgba(0,0,0,0.5)";

            ctx.fill();

            ctx.font = "30px fantasy";

            ctx.fillStyle = "white";

            ctx.textAlign = "center";

            ctx.fillText("paused", this.gamewidth / 2, this.gameheight / 2);
        }

        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gamewidth, this.gameheight);

            ctx.fillStyle = "rgba(0,0,0,1)";

            ctx.fill();

            ctx.font = "30px fantasy";

            ctx.fillStyle = "white";

            ctx.textAlign = "center";

            ctx.fillText("press SPACEBAR to start", this.gamewidth / 2, this.gameheight / 2);
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gamewidth, this.gameheight);

            ctx.fillStyle = "rgba(0,0,0,1)";

            ctx.fill();

            ctx.font = "30px fantasy";

            ctx.fillStyle = "white";

            ctx.textAlign = "center";

            ctx.fillText("game over", this.gamewidth / 2, this.gameheight / 2);
        }

    }

    togglepause() {
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
};

module.exports = Game