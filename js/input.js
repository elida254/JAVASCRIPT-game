// "use strict";
// exports.__esModule = true;
class InputHandler {
    constructor(paddle , game)
    {
        document.addEventListener("keydown", event => 
        {
            // alert(event.keyCode);
            switch (event.keyCode) {
                case 37:
                    // alert("move left")
                    paddle.moveleft();

                    break;

                    case 39:
                    // alert("move right")
                    paddle.moveright();

                    break;
                
                case 27: 
                    
                    game.togglepause();

                    break;

                case 32:
                
                    game.state();

                    break;
                default:
                    break;
            }
        });
        document.addEventListener("keyup", event => 
        {
            // alert(event.keyCode);
            switch (event.keyCode) {
                case 37:
                    // alert("move left")
                  if(Paddle.speed < 0)  paddle.stop();
                    break;
                    case 39:
                    // alert("move right")
                   if(Paddle.speed > 0) paddle.stop();
                    break;
            
                default:
                    break;
            }
        });
    }
}
module.exports = InputHandler;

