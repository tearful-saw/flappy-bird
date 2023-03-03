const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = 'assets/sprite.png';

const bird = new Image();
bird.src = 'assets/bird.png';

const bg = new Image();
bg.src = 'assets/blue.jpg';

const pipeUp = new Image();
pipeUp.src = 'assets/pipeUp.png';

const pipeBottom = new Image();
pipeBottom.src = 'assets/pipeBottom.png';

const fg = new Image();
fg.src = 'assets/fg.png';

document.addEventListener('click', moveUp);

function moveUp() {
    posY -=25;   
}

let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0,
}

const SPEED = 3.1;
const sizeBird = [34, 26];
let index = 0;
let posX = 10;
let posY = 150;
let grav = 1.5;
let gap = 100;

const render = () => {

    index += 0.3;
  
    const backgroudX = -((index * SPEED) % canvas.width);

    ctx.drawImage(bg, 0, 0);
   

    const bgSource = {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
    };

    const bgPartOneResult = {
        x: backgroudX + canvas.width,
        y: 286,
        width: canvas.width,
        height: canvas.height,
    };

    const bgPartTwoResult = {
            x: backgroudX,
            y:286,
            width: canvas.width,
            height: canvas.height,
          }

    ctx.drawImage(
        img,
        
        bgSource.x,
        bgSource.y,
        bgSource.width,
        bgSource.height,
        
        bgPartOneResult.x,
        bgPartOneResult.y,
        bgPartOneResult.width,
        bgPartOneResult.height
    );

    ctx.drawImage(
        img,
        
        bgSource.x,
        bgSource.y,
        bgSource.width,
        bgSource.height,
        
        bgPartTwoResult.x,
        bgPartTwoResult.y,
        bgPartTwoResult.width,
        bgPartTwoResult.height
    );

    for( let i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        
        pipe[i].x --;


        if(pipe[i].x == 125) {
            pipe.push({
            x : canvas.width,
            y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        
        }
        ctx.drawImage(bird, posX, posY);
        ctx.drawImage(fg, 0, canvas.height - fg.height);
        

       

        if (posX + bird.width >= pipe[i].x && posX <= pipe[i].x + pipeUp.width && (posY <= pipe[i].y + pipeUp.height || posY + bird.height >= pipe[i].y + pipeUp.height + gap) ){
            location.reload();
        }
   };
  
        window.requestAnimationFrame(render);
};

pipeBottom.onload = render;