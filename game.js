const canvas = document.querySelector('#pong');

const context = canvas.getContext('2d');

context.fillStyle="black";

/* context.beginPath();
context.moveTo(100,200);
context.arcTo(0,200,0,0,20);
context.arcTo(0,0,100,0,20);
context.arcTo(100,0,100,200,20);
context.arcTo(100,200,0,200,20);
context.fill(); */

canvas.addEventListener('mousemove', movePaddle);


function movePaddle(e){

    let rect = canvas.getBoundingClientRect();

    user.y = e.clientY - rect.top - user.height/2
}


function drawRect(x,y,w,h,color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h)
}

function drawBall(x,y,r,color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0, Math.PI*2,false);
    context.closePath();
    context.fill();
}

function drawNet(){
    for(let i = 0; i<= canvas.height; i+=15){
        drawRect(net.x,net.y+i,net.width, net.height,net.color)
    }
}

function drawText(text,x,y,color,font){
    context.fillStyle = color;
    context.font = font;
    context.fillText(text,x,y)
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 7;
    ball.velocityX = -ball.velocityX
}


const user = {
    x: 0,
    y: canvas.height/2 - 50,
    width: 20,
    height:100,
    color: 'black',
    score: 0
}


const computer = {
    x: canvas.width - 20,
    y: canvas.height/2 - 50,
    width: 20,
    height:100,
    color: 'black',
    score: 0
}


const net = {
    x: canvas.width/2-1,
    y: 0,
    width:2,
    height:10,
    color:'black'
}

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    r:15,
    color: 'black',
    speed: 7,
    velocityX: 5,
    velocityY: 5,
}

function render(){
    
    drawRect(0,0,canvas.width,canvas.height, 'yellow');

    drawRect(user.x,user.y,user.width,user.height,user.color);

    drawRect(computer.x,computer.y,computer.width,computer.height,computer.color);
    
    drawBall(ball.x, ball.y, ball.r, ball.color);
    
    drawNet()
    
    drawText(user.score, canvas.width/4, canvas.height/5, 'black',"75px fantasy")
    
    drawText(computer.score, 3 * canvas.width/4, canvas.height/5, 'black')

}

function display(){
    if(screen.width>1000){
        render()
    }else{
        drawRect(0,0,canvas.width,canvas.height, 'yellow');
        drawText('Use a laptop/desktop to enjoy the gaming experience', canvas.width/3, canvas.height/2, 'black',"15px fantasy")
    }
}



function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;


    //computer ai
    let computerLevel  = 0.1
    computer.y += (ball.y - (computer.y + computer.height /2)) * computerLevel


    let edgeOfBallBottom = ball.y + ball.r;

    let edgeOfBallTop = ball.y - ball.r;

    if(edgeOfBallBottom >canvas.height || edgeOfBallTop < 0){
        ball.velocityY = -ball.velocityY
    }

    let player = (ball.x < canvas.width/2) ? user : computer;

    if(collisionDetection(player,ball)){
        let collidePoint = ball.y - (player.y + player.height/2);
        collidePoint = collidePoint/(player.height/2)

        let angleRad = collidePoint * Math.PI/4;

        let direction = (ball.x < canvas.width/2) ? 1 : -1

       

        ball.velocityX = direction * ball.speed * Math.cos(angleRad);

        ball.velocityY =             ball.speed * Math.sin(angleRad)

        ball.speed += 0.1

    }

     if(ball.x - ball.r < 0){
        computer.score++;
        resetBall();
    }else if(ball.x + ball.r > canvas.width) {
        user.score++;
        resetBall()
    } 
}

function collisionDetection(player,theBall){
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    theBall.top = theBall.y - theBall.r;
    theBall.bottom = theBall.y + theBall.r;
    theBall.left = theBall.x - theBall.r;
    theBall.right = theBall.x + theBall.r;

           return theBall.right > player.left && theBall.bottom > player.top && theBall.left < player.right && theBall.top < player.bottom
}

function game(){
    update();
    display();
}

const framesPerSecond = 50;

setInterval(game, 1000/framesPerSecond);
 