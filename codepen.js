var dx=1.5, dy=-4, paletkaWi=60, paletkaHe=6, colorRect="seagreen", colorBall="gray", score=0, lives=2;
var c = document.getElementById("canvas");
var HEIGHT = c.height;
var WIDTH = c.width;
var r = 6;
var x = WIDTH/2;
var y = HEIGHT - paletkaHe - r;
var canvasXmin = c.getBoundingClientRect().left;
var canvasXmax = c.getBoundingClientRect().right;
var gameSpeed = 5;

var myInterval=0, leftDown=false, rightDown=false, clc=false;
var ctx, paletkaX, szerKolumny;


var level = 0;
var levels = [

  [[1,1,1,1,1,0,0], [1,0,1,1,1,1,1], [1,1,1,0,1,1,0], [1,0,1,1,1,1,1], [1,1,1,1,1,0,0]],

  [[0,1,1,1,1,1],[0,1,0,1,0,0],[0,0,1,0,1,1],[0,0,0,0,0,0], [0,0,1,1,1,0],[0,1,0,0,0,1],[0,0,1,1,1,0],[0,0,0,0,0,0],[0,1,1,1,1,1],[0,1,0,1,0,1],[0,0,1,0,1,0],[0,0,0,0,0,0],[0,0,1,1,1,1],[0,1,0,1,0,0],[0,0,1,1,1,1],[0,0,0,0,0,0],[0,1,1,1,1,1],[0,0,1,0,1,0],[0,1,0,0,0,1]],

  [[1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1], [1,1,1,1,1,0,1,1], [1,1,1,1,1,1,0,1], [1,1,0,0,0,0,1,1], [1,1,1,1,1,1,1,1], [1,1,1,0,1,1,0,1], [1,1,0,1,0,1,0,1], [1,1,0,1,1,0,1,1], [1,1,1,1,1,1,1,1]],

  [[0,1,0,1,0,1], [1,0,1,0,1,0], [0,1,0,1,0,1], [1,0,1,0,1,0],[0,1,0,1,0,1], [1,0,1,0,1,0], [0,1,0,1,0,1]],

[[0,0,0,1,0,0,0,0,0], [1,0,1,1,1,1,1,1,1], [0,0,0,0,0,0,1,0,0], [1,0,1,1,1,1,1,1,1], [0,0,0,1,0,0,0,0,0]]
];

var copy = JSON.parse(JSON.stringify(levels));
var iloscKolumna = levels[level].length;
var iloscRzad = levels[level][0].length;
var odstep = 2;
var wysKlocka = 15;
var koloryRzedow = [];
var koloryLevelow = [[0,68,20], [330,50,30], [43,89,38], [146,50,36], [216,100,40]];
function gradientBricks(num){
  var baseL = koloryLevelow[num][2];
  var H = koloryLevelow[num][0];
  var S = koloryLevelow[num][1];
  for (var i=0; i<iloscRzad; i++){
    var baseColor = "hsl(" + H + ", " + S + "%, " + baseL + "%)";
    koloryRzedow.push(baseColor);
    baseL += 6;
  }
}
gradientBricks(level);

function setthedown(e) {
if (e.which == 39 || e.keyCode == 39) rightDown = true;
else if (e.which == 37 || e.keyCode == 37) leftDown = true;
}

function settheup(e) {
if (e.which == 39 || e.keyCode == 39) rightDown = false;
else if (e.which == 37 || e.keyCode == 37) leftDown = false;
}
function mouseControl(e) {
  if (e.pageX > canvasXmin+r && e.pageX < canvasXmax-r) {
    paletkaX = e.pageX - canvasXmin - (paletkaWi/2)-1;
  }
}
function moveAfterClick(){
  clc = true;
}
function showHearts(num){
  var heart = "&#9829;";
  var output = "";
  for (var i = 0; i<num+1; i++){
    output+=heart;
  }
  return output;
}
document.addEventListener("keydown", setthedown, false);
document.addEventListener("keyup", settheup, false);
document.addEventListener("mousemove", mouseControl, false);
document.addEventListener("click", moveAfterClick, false);
document.getElementById("lives").innerHTML = showHearts(lives);

function init(){
  ctx = c.getContext("2d");
  paletkaX = WIDTH/2-(paletkaWi/2);
  myInterval = setInterval(draw, gameSpeed);
}
function drawBall(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}
function drawRect(x, y, wi, he, color){
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(x,y,wi,he);
  ctx.closePath();
  ctx.fill();
}
function drawNapis(text, numWers){
  ctx.font = "22px Arial";
  ctx.fillStyle = "coral";
  ctx.textAlign = "center";
  var wysokoscNapisu = 0;
  if (numWers == 1) {
    wysokoscNapisu = 0.6;
  } else {
    wysokoscNapisu = 0.7;
  }
  ctx.fillText(text, WIDTH/2, wysokoscNapisu*HEIGHT);
}
function clear(){
  ctx.clearRect(0,0,WIDTH,HEIGHT);
}
function randomize(arr){
  var pick = Math.floor(Math.random()*arr.length);
  return arr[pick];
}

function draw(){
  clear();
  if (rightDown && paletkaX < (WIDTH - paletkaWi)) paletkaX += 5;
  else if (leftDown && paletkaX > 0) paletkaX -= 5;
  drawRect(paletkaX,HEIGHT-paletkaHe,paletkaWi,paletkaHe,colorRect);
  szerKolumny = (WIDTH - (iloscKolumna*odstep+odstep)) / iloscKolumna;
  drawKlocki();
  if (clc==false){
    y = HEIGHT - paletkaHe - r;
    x = paletkaX + (paletkaWi/2);
    drawNapis("Level " + (level+1), 1)
    drawNapis("click to play", 2);
  } else{
    ballMove();
  }
  drawBall(x,y,r,"#5F5F5F");
}

function ballMove(){
  var rzadWys = odstep+wysKlocka;
  var kolSzer = szerKolumny + odstep;
  var row = Math.floor(y/rzadWys);
  var col = Math.floor(x/kolSzer);
  y += dy;
  x += dx;
    if (y<(iloscRzad*rzadWys)+r+odstep && row >= 0 && col >= 0 && levels[level][col][row] == 1){
    dy = -dy;
    score+=10 + Math.abs(row-(iloscRzad-1));
    document.getElementById("score").innerHTML = score;
    levels[level][col][row] = 0;

  } else if (y<r){
      dy = -dy;
  } else if (y>(HEIGHT-r-paletkaHe)){
      if (x>paletkaX && x<(paletkaX+paletkaWi)){
        dx = 8 * ((x-(paletkaX+paletkaWi/2))/paletkaWi);
        dy = -dy;

      } else {
        if (y>(HEIGHT-r) && lives==0){

          clearInterval(myInterval);
          //drawBall(x,y,r,"#FF0000")
          drawNapis("GAME OVER", 1);
          document.getElementById("lives").innerHTML = " ";
          document.getElementById("playAgain").style.visibility = "visible";
        }
        if (y>(HEIGHT-r) && lives>0){
          lives--;
          document.getElementById("lives").innerHTML = showHearts(lives);
          dx=randomize([-2,-1.5,-1,1.5,2,2.5]); dy=-4;
          clc = false;
        }
      }
  }
  if (x>(WIDTH-r) || x<r){
    dx = -dx;
  }
}

function drawKlocki() {
  var iloscKlockow=0;
  for (var i=0; i<iloscKolumna; i++) {
    for (var j=0; j<iloscRzad; j++) {
      if (levels[level][i][j] == 1){
        drawRect(odstep+(i*odstep) + (i*szerKolumny),
                odstep+(j*odstep) + (j*wysKlocka), szerKolumny, wysKlocka, koloryRzedow[j]);
        iloscKlockow++;
      }
    }
  }
  if (iloscKlockow == 0 && level < levels.length-1){
    level++;
    iloscKolumna = levels[level].length;
    iloscRzad = levels[level][0].length;
    koloryRzedow = [];
    gradientBricks(level);
    clc=false;
  } else if (iloscKlockow == 0 && level == levels.length-1){
    clearInterval(myInterval);
    drawRect(0,0,WIDTH,HEIGHT,"#fff7cc")
    drawNapis("Congratulations!", 1);
    drawNapis("You finished the game!", 2);
    document.getElementById("playAgain").style.visibility = "visible";
  }
}

function reset(){
  score = 0;
  document.getElementById("score").innerHTML = score;
  lives = 3;
  level=0;
  levels = copy.slice(0);
  iloscKolumna = levels[level].length;
  iloscRzad = levels[level][0].length;
  koloryRzedow = [];
  gradientBricks(level)
  copy = JSON.parse(JSON.stringify(levels));
  myInterval = setInterval(draw, gameSpeed);
  document.getElementById("playAgain").style.visibility = "hidden";
  clc = false;
}
init();