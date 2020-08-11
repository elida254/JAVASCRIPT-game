var detectcollision = require('./collitiondetection')

class Ball {
    constructor(game) {
        this.image = document.getElementById("img_ball");

        this.gamewidth = game.gamewidth;

        this.gameheight = game.gameheight;

        this.game = game;

        this.size = 20;

        this.reset();
    }

    reset() {
        this.speed = {
            x: 2,
            y: -2
        };

        this.position = {
            x: 10,
            y: 200
        };
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);

    }

    update(deltatime) {
        this.position.x += this.speed.x;

        this.position.y += this.speed.y;

        if (this.position.x + this.size > this.gamewidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        if ( //this.position.y + this.size > this.gameheight || 
            this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        if (this.position.y + this.size > this.gameheight) {
            this.game.lives--;

            this.reset();
        }

        if (detectcollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;

            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}
module.exports = Ball;