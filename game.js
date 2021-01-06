const canvas = document.querySelector('#pong');

const context = canvas.getContext('2d');

context.fillStyle="black"


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

function drawText(text,x,y,color){
    context.fillStyle = color;
    context.font = "75px fantasy";
    context.fillText(text,x,y)
}


let rectX = 0;


const user = {
    x: 0,
    y: canvas.height/2 - 50,
    width: 10,
    height:100,
    color: 'black',
    score: 0
}


const computer = {
    x: canvas.width - 10,
    y: canvas.height/2 - 50,
    width: 10,
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
    r:20,
    color: 'black',
    speed: 5,
    velocityX: 5,
    velocityY: 5,
}


function render(){

    drawRect(0,0,canvas.width,canvas.height, 'yellow');

    drawRect(user.x,user.y,user.width,user.height,user.color);

    drawRect(computer.x,user.y,computer.width,computer.height,computer.color);
    
    drawBall(ball.x, ball.y, ball.r, ball.color);
    
    drawNet()
    
    drawText(user.score, canvas.width/4, canvas.height/5, 'black')
    
    drawText(computer.score, 3 * canvas.width/4, canvas.height/5, 'black')

}

function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    let edgeOfBallBottom = ball.y + ball.r;

    let edgeOfBallTop = ball.y - ball.r;

    if(edgeOfBallBottom >canvas || edgeOfBallTop < 0){
        ball.velocityY = -ball.velocityY
    }

    let player = (ball.x < canvas.width/2) ? user : computer;

    if(collisionDetection(ball,player)){
        let collidePoint = ball.y - (user.y + user.height/2)/(user.height/2);

        let angleRad = collidePoint * Math.PI/4

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

    return theBall.right > player.left && theBall.top < player.bottom && theBall.left<player.right && theBall.bottom>player.bottom

}

function game(){
    update();
    render();
}

const framesPerSecond = 50;

//setInterval(game, 1000/framesPerSecond);