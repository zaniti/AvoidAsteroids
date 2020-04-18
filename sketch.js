var astronaut;
var asteroids = [];
var astro;
let asteroid;
let x = 1;
let y = 1;
let easing = 0.02;

function preload() {
    astro = loadImage('astronaut.png');
    asteroid = loadImage('story/asteroid.png');
  }

function setup() { 
  createCanvas(windowWidth, windowHeight);
  astronaut = new astronaut();
  for (var i = 0; i < 5; i++) {
  	asteroids.push(new Asteroid());
  }
} 

function draw() { 
  background(0);
  
  for (var i = 0; i < asteroids.length; i++) {
    if (astronaut.hits(asteroids[i])) {
      alert('u lost')
      
    }
    
    asteroids[i].render();
  	asteroids[i].update();
    asteroids[i].edges();
  }
  
  
  astronaut.render();
  astronaut.edges();
  
  
}

function astronaut() {
    this.pos = createVector(width/2, height/2);
    this.r = 65;

    this.hits = function(asteroid) {
        
      var d = dist(x, y, asteroid.pos.x, asteroid.pos.y);
      if (d < this.r + asteroid.r/2) {
        return true;
      } else {
        return false;
      }
    }

    
    this.render = function() {
      push();
      let targetX = mouseX
      let dx = targetX - x
      x += dx * easing

      let targetY = mouseY
        let dy = targetY - y
        y += dy * easing
        astro.resize(150,0)
    
      image(astro, x-70, y-70)
      translate(x , y)
      noFill()
      noStroke()
      triangle(-this.r, this.r, this.r, this.r, 20, -this.r)
      pop()
    }
    
    this.edges = function() {
      if (this.pos.x > width + this.r) {
        this.pos.x = -this.r;
      } else if (this.pos.x < -this.r) {
        this.pos.x = width + this.r;
      }
      if (this.pos.y > height + this.r) {
        this.pos.y = -this.r;
      } else if (this.pos.y < -this.r) {
        this.pos.y = height + this.r;
      }
    }

    
  }
  

  function Asteroid() {
         this.pos = createVector(random(width), random(height));
         this.r = 100;
         this.vel = p5.Vector.random2D();

    
    this.update = function() {
      this.pos.add(this.vel);
    }

    asteroid.resize(this.r,0);
    
    this.render = function(){
        image(asteroid, this.pos.x-(this.r/2), this.pos.y-(this.r/2));
        push();
        noStroke();
        noFill();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.r);
    
    
    
        pop();
      }
  
    
    this.edges = function() {
      if (this.pos.x > width + this.r) {
        this.pos.x = -this.r;
      } else if (this.pos.x < -this.r) {
        this.pos.x = width + this.r;
      }
      if (this.pos.y > height + this.r) {
        this.pos.y = -this.r;
      } else if (this.pos.y < -this.r) {
        this.pos.y = height + this.r;
      }
    }
    
  }
  


