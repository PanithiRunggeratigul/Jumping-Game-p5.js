let dir = 400;
let player_x = 70;
let player_y = 250;
var score = 0;

let obstacle_w = 30;
let obstacle_h = 60;

var intro = true;
var game_start = false;
var game_over = false;

var gravity = -5;
var jump_force = 10;
var is_ground = true;
var finish_jumping = false;
var is_jumping = false;
var can_jump = true;

let pwalk = [];
var frame = 0;
var time = 0;
var down;
var jump;

function preload() {
    pwalk[0] = loadImage("images/player_walk/walk1.png");
    pwalk[1] = loadImage("images/player_walk/walk2.png");
    pdown = loadImage("images/down.png");
    pjump = loadImage("images/jump.png");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
    if (intro) {
        Intro();
    }
    if (game_start) {
        GameStart();
    }
    else if (game_over) {
        GameOver();
    }
}
function jump() {
    circle(random(width), random(height), 7)
    image(pjump, player_x, player_y);
    can_jump = false;
    finish_jumping = false;
    player_y -= jump_force;
}

function keyPressed() {
    if (keyCode == UP_ARROW && can_jump) {
        is_jumping = true;
        is_ground = false;
        finish_jumping = false;
    }
}
function GameStart() {
    game_start = true;
    game_over = false;
    background(250);
    fill(162, 118, 14);
    rect(width-400, height-100, width, height);
    fill('rgba(0,255,0, 0.25)');
    rect(width-400, height-100, width, height/40);
    fill(0, 0, 0);
    text("score = " + score, 90, 40);
    image(pwalk[frame], player_x, player_y);
    if (time > 10) {
        frame += 1;
        if (frame >= pwalk.length) {
          frame = 0;
        }
        time = 0;
      }
      time++;

    if (is_jumping && !is_ground && !finish_jumping) {
        fill(random(225), random(225), random(225), 500);
        jump();
    }
    if(player_y < 120) {
        finish_jumping = true;
    }
    if (finish_jumping && player_y < 250) {
        image(pdown, player_x, player_y);
        player_y -= gravity;
    }
    if (player_y == 250) {
        is_ground = true;
        can_jump = true;
        fill(random(225), random(225), random(225), 500);
    }

    rect(dir, 240, obstacle_w, obstacle_h);
    dir-=random(1,10);
    if (dir < -20) {
        dir = width;
        score = score+1
    }

    if (player_x+25 > dir-15 && player_x-25 < dir+15 && player_y > 190) {
        game_over = true;
        game_start = false;
        dir = width;
        GameOver();
    }
}

function GameOver() {
    fill(random(225), random(225), random(225), 500);
    background(0)
    textAlign(CENTER);
    circle(random(width), random(height), 5)
    fill(random(225), random(225), random(225), 500);
    text('GAME OVER', width / 2, height / 2);
    text("Score = " + score, width / 2, height / 2 + 45)
    text('Click to Play Again', width / 2, height / 2 + 90);
}

function Intro() {
    background(0)
    circle(random(width), random(height),5)
    textAlign(CENTER);
    textSize(32);
    text('Welcome to qwerty', width / 2, height / 2);
    //fill(225, 0, 0);
    fill(random(225), random(225), random(225), 500);
    text('Click to Start!!!', width / 2, height / 2+50);
    fill(0, 250, 0);
}

function mousePressed(){
    if(game_over){
        game_start = true;
        game_over = false;
        score = 0;
    }
    else if (intro) {
        game_start = true;
    }
}

