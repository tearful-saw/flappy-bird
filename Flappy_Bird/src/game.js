// class Game {
//     constructor(){
//         this._config = new Config();

//         this._canvas = document.getElementById(this._config.canvas.id);
//         this._canvas.width = this._config.canvas.width;
//         this._canvas.height = this._config.canvas.height;

//         this.width = this._config.canvas.width;
//         this.height = this._config.canvas.height;

//         this._drawEngine = new CanvasDrawEngine({canvas: this._canvas});
//         this._physicEngine = new PhysicEngine({gravity: this._config.gravity});
//         this._resourceLoader = new ResourceLoader();
//         this._inputHandler = new MouseInputHandler({
//             left: ({x, y}) => {
//                 this._bird.flap();
//             }
//         });

// }

// async prepare() {
//     this._spriteSheet = this._resourceLoader.load({
//         type: RESOURCE_TYPE.IMAGE,
//         src: this._config.spriteSheet.src,
//         width: this._config.spriteSheet.width,
//         height: this._config.spriteSheet.height,

//     })
// }

// reset() {
//     this._score = 0,
//     this._bird = new Bird(x, y, width, height, frames, spriteSheet, flapSpeed, physicEngine, drawEngine, game, {
//         x: this._config.bird.x,
//         y: this._config.bird.y,
//         width: this._config.bird.width,
//         height: this._config.bird.height,
//         frames: confthis._configig.bird.frames,
//         spriteSheet: this._spriteSheet,
//         flapSpeed: this._config.bird.flapSpeed,
//         physicEngine: this._physicEngine, 
//         drawEngine: this._drawEngine,
//         game: this,
        
//     })
// }

// update(delta) {
//     this._bird.update(delta);
// }

// draw() {
//     this._bird.draw();
// }

// _loop() {
//     const now = Date.now();
//     const delta = this._lastUpdate - now;

//     //this.reset();
//     this.update(delta / 1000.0);
//     this._drawEngine.clear();
//     this.draw();

//     this._lastUpdate = now;

//     requestAnimationFrame(this.start().bind(this));
// }

// start() {
//     this._inputHandler.subscribe();
//     this._lastUpdate = Date.now();
//     this._loop();
// }


// gameOver() {
//     alert(`Game Over: ${this._score}`);
// }
// }



// Начало работы с игрой - код с классом ES6

class Game {
    constructor(canvas, ctx, bird, bg, fg, pipeUp, pipeBottom, backgroudX, gap, i, birdSource, birdResult, sizeBird, posX, posY, grav, degrees, myReq, endGame, tableScore, buttonStart, fly, score_audio, score, end_audio, scoreRec, mouseX, mouseY, birdD, rotation){
        this.canvas = canvas;
        this.ctx = ctx;
        this.bg = bg;
        this.bird = bird;
        this.fg = fg;
        this.pipeUp = pipeUp;
        this.pipeBottom = pipeBottom;
        this.speedBack = 3.1;
        this.index = 0;
        this.backgroudX = backgroudX;
        this.gap = gap;
        this.pipe = [];
        this.i = i;
        this.birdSource = birdSource;
        this.birdResult = birdResult;
        this.sizeBird = sizeBird;
        this.posX = posX;
        this.posY = posY;
        this.grav = grav;
        this.rotation = rotation;
        this.myReq = myReq;
        this.endGame = endGame;
        this.tableScore = tableScore;
        this.buttonStart = buttonStart;
        this.fly = fly;
        this.score_audio = score_audio;
        this.score = score;
        this.end_audio = end_audio;
        this.scoreRec = scoreRec;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.birdD = birdD;
    }

canvasGame() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.birdD = new Image();
    this.birdD.src = "assets/bird.png"

    this.bird = new Image();
    this.bird.src = "assets/sprite.png";

    this.bg = new Image();
    this.bg.src = "assets/bg.png";

    this.fg = new Image();
    this.fg.src = "assets/fg.png";

    this.pipeUp = new Image();
    this.pipeUp.src = "assets/pipeUp.png";

    this.pipeBottom = new Image();
    this.pipeBottom.src = "assets/pipeBottom.png";

    this.endGame = new Image();
    this.endGame.src = "assets/sprite.png";

    this.tableScore = new Image();
    this.tableScore.src = "assets/sprite.png";

    this.buttonStart = new Image();
    this.buttonStart.src = "assets/sprite.png";

    this.fly = new Audio();
    this.fly.src = "audio/fly.mp3";

    this.score_audio = new Audio();
    this.score_audio.src = "audio/score.mp3";

    this.end_audio = new Audio();;
    this.end_audio.src = "audio/gameover.mp3";

    this.pipe[0] = {
        x: this.canvas.width,
        y: 0,
    };

    this.score = 0;
    this.sizeBird = [34, 26];
    this.posX = 100;
    this.posY = 150;
    this.grav = 1.5; 
};

drawBack() {
    this.index += 0.3;

    this.backgroudX = -((this.index * this.speedBack) % this.canvas.width);

    this.ctx.drawImage(this.bg, this.backgroudX + this.canvas.width, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.bg, this.backgroudX, 0, this.canvas.width, this.canvas.height);
}

drawBird() {
        this.birdSource = {
                x: 276,
                y: 114 + (Math.floor((this.index % 9) / 3) * this.sizeBird[1]),
                width: this.sizeBird[0],
                height: this.sizeBird[1],
              };
            
        this.birdResult = {
                x: this.posX,
                y: this.posY,
                width: this.sizeBird[0],
                height: this.sizeBird[1],
              };
              
              this.ctx.drawImage(
                this.bird,
            
                this.birdSource.x,
                this.birdSource.y,
                this.birdSource.width,
                this.birdSource.height,
            
                this.birdResult.x,
                this.birdResult.y,
                this.birdResult.width,
                this.birdResult.height
              );

              this.posY += this.grav;

              if(this.posY + this.sizeBird[1] <= this.canvas.height - 512){
                
                this.posY += 10;
              }

              this.ctx.fillStyle = "#000";
              this.ctx.font = "24px Verdana";
              this.ctx.fillText("Score: " + this.score, 10, this.canvas.height - 20);
    }

drawPipe() {
    this.gap = 100;
    
    for( this.i = 0; this.i < this.pipe.length; this.i++) {
        this.ctx.drawImage(this.pipeUp, this.pipe[this.i].x, this.pipe[this.i].y);
        this.ctx.drawImage(this.pipeBottom, this.pipe[this.i].x, this.pipe[this.i].y + this.pipeUp.height + this.gap);
          
        this.pipe[this.i].x--;
        
        if(this.pipe[this.i].x == 100) {
        this.pipe.push({
        x : this.canvas.width,
        y : Math.floor(Math.random() * this.pipeUp.height) - this.pipeUp.height
        });
    }
        this.deadBird();
        this.currentScore();
}
}

drawGround() {
     this.ctx.drawImage(this.fg, 0, this.canvas.height - this.fg.height);
}

loadResources() {
    window.onload = (event) => {
        this.drawBack();
        this.drawPipe();
        this.drawGround();
        this.drawBird();
      };
 };

 control() {
    game.canvas.onclick = function() {
        game.posY -=50;  
        game.fly.play();
    }

     window.addEventListener("keydown" ,moveUp);
      function moveUp() {
        game.posY -=50;  
        game.fly.play();
    }
 }

 currentScore() {
        localStorage.getItem('record') > 0 ? this.scoreRec = localStorage.getItem('record') : this.scoreRec = 0;

    if(this.pipe[this.i].x == 80) {
        localStorage.getItem('record') > 0 ? this.scoreRec = localStorage.getItem('record') : this.scoreRec = 0;
        this.scoreRec;
        this.score++;

        this.score_audio.play();
        }

        if (this.score > localStorage.getItem('record')){
            this.scoreRec++;
            this.scoreRec = this.score;
            localStorage.setItem('record', this.scoreRec);
        }
 }

deadBird() {
    if(this.posX + this.sizeBird[0] >= this.pipe[this.i].x
        && this.posX <= this.pipe[this.i].x + this.pipeUp.width
        && (this.posY <= this.pipe[this.i].y + this.pipeUp.height
        || this.posY + this.sizeBird[1] >= this.pipe[this.i].y + this.pipeUp.height + this.gap) || this.posY + this.sizeBird[1] >= this.canvas.height - this.fg.height) {
    
        this.textGameOver();
        this.tabScore();
        this.butStart();
        this.drawGround();

        this.end_audio.play();

        this.ctx.font = "bold 22px Verdana";
        this.ctx.fillStyle = "#000";

        this.ctx.fillText(this.score, 200, this.canvas.height - 282);
        this.ctx.fillText(this.scoreRec, 200, this.canvas.height - 241);

        window.cancelAnimationFrame(this.myReq.bind(this));
        }
}

update() {
    this.drawBack();
    this.drawPipe();
    this.drawGround();
    this.drawBird();
    this.rotateBird();
    
    this.myReq = window.requestAnimationFrame(this.update.bind(this));
 }

 rotateBird() {
        this.ctx.save();
        this.ctx.translate(this.x + this.birdD.width / 2, this.y + this.birdD.height / 2);
        this.ctx.rotate(this.rotation * Math.PI / 180);
        this.ctx.drawImage(this.birdD, -this.birdD.width / 2, -this.birdD.height / 2);
        this.ctx.restore();
    };
 
 textGameOver() {
    this.endGameSource = {
        x: 194,
        y: 229,
        width: 184,
        height: 34,
      };
    
    this.endGameResult = {
        x: 45,
        y: 140,
        width: 184,
        height: 34,
      };
      
      this.ctx.drawImage(
        this.endGame,
    
        this.endGameSource.x,
        this.endGameSource.y,
        this.endGameSource.width,
        this.endGameSource.height,
    
        this.endGameResult.x,
        this.endGameResult.y,
        this.endGameResult.width,
        this.endGameResult.height
      );
      }

    tabScore() {
      this.tableScoreSource = {
        x: 175,
        y: 273,
        width: 227,
        height: 117,
      };
    
     this.tableScoreResult = {
        x: 25,
        y: 180,
        width: 227,
        height: 117,
      };
      
      this.ctx.drawImage(
        this.tableScore,
    
        this.tableScoreSource.x,
        this.tableScoreSource.y,
        this.tableScoreSource.width,
        this.tableScoreSource.height,
    
        this.tableScoreResult.x,
        this.tableScoreResult.y,
        this.tableScoreResult.width,
        this.tableScoreResult.height
      );
      } 

      butStart() {

      this.buttonStartSource = {
        x: 246,
        y: 400,
        width: 82,
        height: 29,
      };
    
     this.buttonStartResult = {
        x: 100,
        y: 310,
        width: 82,
        height: 29,
      };
      
      this.ctx.drawImage(
        this.buttonStart,
    
        this.buttonStartSource.x,
        this.buttonStartSource.y,
        this.buttonStartSource.width,
        this.buttonStartSource.height,
    
        this.buttonStartResult.x,
        this.buttonStartResult.y,
        this.buttonStartResult.width,
        this.buttonStartResult.height
      );  

      game.canvas.onmousemove = function(event) {
        game.mouseX = event.offsetX;
         game.mouseY = event.offsetY;

          if (game.mouseX >= game.buttonStartResult.x && game.mouseX <= (game.buttonStartResult.x + game.buttonStartResult.width) && game.mouseY >= game.buttonStartResult.y && game.mouseY <= (game.buttonStartResult.y + game.buttonStartResult.height)) {
            
            game.canvas.onclick = function() {
              location.reload();
           }
          } else {
            game.canvas.onclick = null;
         }
        }
 }
}

let game = new Game();
game.canvasGame();
game.drawBack();
game.drawPipe();
game.drawGround();
game.drawBird();
game.loadResources();
game.control();
game.update();








//рабочий код


// let cvs = document.getElementById("canvas");
// let ctx = cvs.getContext("2d");

// let bird = new Image();
// let bg = new Image();
// let fg = new Image();
// let pipeUp = new Image();
// let pipeBottom = new Image();

// bird.src = "assets/bird.png";
// bg.src = "assets/bg.png";
// fg.src = "assets/fg.png";
// pipeUp.src = "assets/pipeUp.png";
// pipeBottom.src = "assets/pipeBottom.png";

// // Звуковые файлы
// // let fly = new Audio();
// // let score_audio = new Audio();

// // fly.src = "audio/fly.mp3";
// // score_audio.src = "audio/score.mp3";

// let gap = 90;

// // При нажатии на какую-либо кнопку
// document.addEventListener("click", moveUp);

// function moveUp() {
//  yPos -= 25;
//  //fly.play();
// }

// // Создание блоков
// let pipe = [];

// pipe[0] = {
//  x : cvs.width,
//  y : 0
// }

// let score = 0;
// // Позиция птички
// let xPos = 10;
// let yPos = 150;
// let grav = 1.5;

// function draw() {
//  ctx.drawImage(bg, 0, 0);

//  for(var i = 0; i < pipe.length; i++) {
//  ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
//  ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

//  pipe[i].x--;

//  if(pipe[i].x == 125) {
//  pipe.push({
//  x : cvs.width,
//  y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
//  });
//  }

//  // Отслеживание прикосновений
//  if(xPos + bird.width >= pipe[i].x
//  && xPos <= pipe[i].x + pipeUp.width
//  && (yPos <= pipe[i].y + pipeUp.height
//  || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
//  location.reload(); // Перезагрузка страницы
//  }

//  if(pipe[i].x == 5) {
//  score++;
//  //score_audio.play();
//  }
//  }

//  ctx.drawImage(fg, 0, cvs.height - fg.height);
//  ctx.drawImage(bird, xPos, yPos);

//  yPos += grav;

//  ctx.fillStyle = "#000";
//  ctx.font = "24px Verdana";
//  ctx.fillText("Счет: " + score, 10, cvs.height - 20);

//  requestAnimationFrame(draw);
// }

// pipeBottom.onload = draw;
