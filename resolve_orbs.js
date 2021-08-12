// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//const width = canvas.width = "100";
//const height = canvas.height = "100";
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


const img = new Image();
img.src="resolve.jpg";

dDown = false;


// key down event
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if(e.which  == 82) {
      //https://keycode.info/
      // turn on or off
        dDown = !dDown;
    }
}


// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define Ball constructor

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
 ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size ) {
        //balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
       //balls[j].fillStyle  = this.fillStyle = "red";
       ctx.font = '50px serif';
       ctx.textAlign = "center";
       ctx.fillStyle = 'white';    
       ctx.fillText("Resolve",this.x, this.y, this.size );   
       //ctx.strokeText("Resolve",this.x, this.y, this.size);
       
      // ctx.font = '50px serif';
      //ctx.stroke()
      //ctx.strokestyle = 'orange';
        //ctx.fill();
      }
    }
  }
};

// define array to store balls and populate it

let balls = [];

while(balls.length < 50) {
  const size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-.1,.1),
    random(-.1,.1),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );
  balls.push(ball);
}

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
  if (dDown == true){
    ctx.drawImage(img, 0,0,width,height);
  }
  
  
  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
