var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var x = canvas.width / 2;
var y = canvas.height - 30;
var idy = 1;
var iy = canvas.height - 30,
    dx = 2,
    dy = -2,
    ballRadius = 10,
    paddleHeight = 10,
    paddleWidth = 75,
    paddleX = (canvas.width - paddleWidth) / 2,
    rightPressed = false,
    leftPressed = false;

var brickRowCount = 4;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0,
    lives = 3,
    level = 1,
    speed = 1;
// 添加音频素材
var bgm = new Audio('resources/Tetris Theme - Korobeiniki [Piano Tutorial] (Synthesia).mp3');
var ballHitBeep = new Audio('resources/ball-origin-beep.ogg');
var hitWallBeep = new Audio('resources/wall-beep.ogg');
var hitPaddleBeep = new Audio('resources/paddle-beep.ogg');
var blueBeep = new Audio('resources/blue-beep.ogg');
// 控制音频
var pause = document.getElementById('pause')
window.onload = function () {
    bgm.play()
}
pause.onclick = function () {
    bgm.pause()
}

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        if (c % 2 == 0 && r %2== 1) {
            bricks[c][r] = {
                x: 0,
                y: 0,
                status: 2
            }
        } else {
            bricks[c][r] = {
                x: 0,
                y: 0,
                status: 1
            }
        }
    }
}

function drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = "#0095DD";
    ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

function drawLevels() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Level: ' + level, (canvas.width - paddleWidth) / 2, 20);
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            } else if (bricks[c][r].status == 2) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "orange";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);


function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    pause.click();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function reset() {
    for ( c = 0; c < brickColumnCount; c++) {
        for ( r = 0; r < brickRowCount; r++) {
            var d = bricks[c][r];
            if (c%2==0&&r%2==1) {d.status==2}
                else{d.status==1}
        }
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status > 0) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    if (b.status == 2) {
                        blueBeep.play()
                    } else {
                        ballHitBeep.play()
                    }
                    dy = -dy;
                    b.status--;
                    score++;
                    if (score == brickRowCount * brickColumnCount * level) {
                        alert("YOU WIN");
                        reset();
                        draw();
                        level++;
                    }
                }
            }

        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("Score: " + score, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(), drawPaddle(), drawBricks();
    collisionDetection(), drawScore(), drawLives(), drawLevels();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        hitWallBeep.play();
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        hitWallBeep.play();
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            hitPaddleBeep.play();
        } else {
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                lives--;
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }

    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx * speed;
    y += dy * speed;
    requestAnimationFrame(draw);
}

//添加按键控制以及开始画面
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        draw();
        pause.click();
    }
});
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 27) {
        document.location.reload();
    }
});


//添加可爱小猫
function initdraw() {
    ctx.clearRect(0, 200, canvas.width, canvas.height);
    ctx.font = 'bold 26px Arial';
    ctx.fillStyle = "#0095DD";
    ctx.fillText('Cats and balls', 140, 200);
    var img = new Image();
    img.src = 'resources/logo.gif';
    ctx.drawImage(img, x, iy);

    if (iy + dy > canvas.height + 15) {
        idy = -idy
    }
    if (iy + dy < canvas.height - 45) {
        idy = -idy
    }
    iy += idy;
    requestAnimationFrame(initdraw);
}
initdraw()