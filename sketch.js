
let x = 1;
let y = 1;
let easing = 0.02;
let astro;
var asteroids = [];

function preload() {
  astro = loadImage('astronaut.png');
}
function setup() {
  createCanvas(displayWidth, displayHeight);
  noStroke();

  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }

}

function draw() {
  background(0, 0, 0);
  astronaut();

  for (var i = 0; i < asteroids.length; i++) {
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
}

function astronaut(){
  astro.resize(150,0);
  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;

  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;

  image(astro, x-80, y-70);
}

function Asteroid() {
  this.pos = createVector(random(width), random(height));
  this.vel = p5.Vector.random2D();
  this.r = random(15,75);
  this.total = floor(random(5, 15));
  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-15, 15);
  }

  this.update = function(){
    this.pos.add(this.vel);
  }

  this.render = function(){
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
    //ellipse(0, 0, this.r*2);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);

    pop();
  }

  this.edges = function() {
    if (this.pos.x > width + this.r){
      this.pos.x = -this.r;
    }else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r
    }

    if (this.pos.y > height + this.r){
      this.pos.y = -this.r;
    }else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r
    }
  }
}
