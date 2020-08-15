var detectcollision = require('./collitiondetection')

class Brick {

    constructor(game, position) {
        this.image = document.getElementById("img_brick");

        this.game = game;

        this.position = position
        // {
        //     x: 10,
        //     y: 10
        // };

        this.width = 80;

        this.height = 24;

        this.markedForDeletion = false;
    }

    update() {
        if (detectcollision(this.game.ball, this)) {
            this.game.ball.speed.y + -this.game.ball.speed.y;

            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

module.exports = Brick;