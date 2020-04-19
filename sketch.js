var astronaut
var asteroids = []
var astro
let asteroid
let bg
let party
let x = 1
let y = 1
let easing = 0.02
let font
let font1
let font2
let font3
let bg1
let storyImg
let music




// Preload function

function preload() {
    astro = loadImage('astronaut.png');
    asteroid = loadImage('story/asteroid.png');
    bg = loadImage('story/bg.png')
    font = loadFont('story/spaceage.ttf');
    font1 = loadFont('story/RetroGaming.ttf');
    font2 = loadFont('story/Aveny.ttf');
    font3 = loadFont('story/storyfont.ttf');

    bg1 = loadImage('story/bg1.png')
    storyImg = loadImage('story/storyimg.png')
    music = loadSound('story/music.mp3')

  }

// Setup function

function setup() {
  createCanvas(windowWidth, windowHeight);
  astronaut = new astronaut();
  music.setVolume(0.2)
  party = new Party()

  setTimeout(spawn, 1000);
}
function spawn() {
  asteroids.push(new Asteroid());
  setTimeout(spawn, 2000);
}


//Party
function Party(){
  this.inc = 0
}

//begin the party
function enter() {

  homePage()
  if (keyIsDown(83)) {
    party.inc=2



  }else if(keyIsDown(67)){
   party.inc=3


  }
}

// Draw function

function draw() {
  background(bg)

  switch(party.inc){
    case 0:
      enter()
      break
    case 1:
      {
      for (var i = 0; i < asteroids.length; i++) {
        if (astronaut.hits(asteroids[i])) {
          textFont(font, 100)
          textAlign(CENTER)
          fill(255)
          text('GAME OVER', width/2, height/2);
          textFont(font, 30)
          text('Please "Refresh" the page to play again', width/2, height/2+100);
          return

        }


        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
      }


      astronaut.render();
      astronaut.edges();

      break
    }
      case 2:
        story()
        if(keyIsDown(13)){
          party.inc=1
          music.play()

         }
        break
      case 3:
        credit()
        if(keyIsDown(8)){
          party.inc=0

         }
        break



  }


}

// Astronaut shape function

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

  // Asteraoid shape function

  function Asteroid() {
         this.pos = createVector(-(random(width)), -(random(height)));
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

  // Home page function

  function homePage(){

    background(bg)
    textFont(font, 70)
    textAlign(CENTER)
    fill(255)
    text('LONG LIVE THE ASTRONAUT', width/2, height/4);

    textFont(font1, 45)
    textAlign(CENTER)
    fill(255)
    text('Press "S" to Start' , width/2, height/2)
    textFont(font1, 30)
    textAlign(CENTER)
    fill(255)
    text('Press "C" for credits' , width/2, height/2+100)




  }

  function credit(){

    background(bg)
    textFont(font, 70)
    textAlign(CENTER)
    fill(255)
    text('CREDITS :', width/2, height/4);

    textFont(font2, 45)
    textAlign(CENTER)
    fill(255)
    text('This Game is the result of hard work and dedication of ' , width/2, height/2-100)
    textFont(font2, 45)
    textAlign(CENTER)
    fill(255)
    text('two very talented and handsome students of YouCode Safi' , width/2, height/2-40)
    textFont(font2, 45)
    textAlign(CENTER)
    fill(255)
    text('Anas Benziti - Abdellah Daif' , width/2, height/2+50)
    textFont(font2, 30)
    textAlign(CENTER)
    fill(255)
    text('1st Edition  of the Alan Turing Game Jam' , width/2, height/2+150)
    textFont(font2, 20)
    textAlign(CENTER)
    fill(255)
    text('17th-19th April 2020' , width/2, height/2+180)
    textFont(font2, 50)
    textAlign(CENTER)
    fill(255)
    text('Press "Backspace" to go back !' , width/2, height/2+280)

  }

  function story(){
    background(bg1)
    storyImg.resize(300,0)
    image(storyImg,width/2-150,50)

    textFont(font3, 35)
    textAlign(CENTER)
    fill(255)
    text('“3, 2, 1...” were the last words i remember before the crash of our ship ' , width/2, 400)
    text('am i the only survivor of the crew ? ' , width/2, 450)
    text('The only way for me to survive is to reach the emergency recovery kit' , width/2, 500)
    text('but first i need you to help me avoid those asteroids' , width/2, 550)
    text('I have two kids, and i will never forgive you if you let me die' , width/2, 600)
    textFont(font3, 30)
    text('Press "Enter" to continue ..' , width/2+500, 700)




  }
