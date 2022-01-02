var dateDisplay = document.getElementById("dateDisplay");
var haveAGoodDisplay = document.getElementById("haveAGood");
const date = new Date();
var started = 0;
const fireworks = [];
const particles = [];
const colors4Particles = ['#FF0000', '#FF5349', '#FFA500', '#FFAE42', '#FFFF00', '#9ACD32', '#00FF00', '#0D98BA', '#0000FF', '#8A2BE2', '#8F00FF', '#953553'];

//The function to be executed
function dateNormalization() {
    month = (date.getMonth() + 1).toString();
    day = (date.getDate()).toString();
    if(month.length <2){
        month = '0' + month
    }
    if(day.length <2){
        day = '0' + day
    }
  return date.getFullYear() + '/' + month + '/' + day;
}

function displayDate() {
    dateDisplay.innerHTML = dateNormalization();
}

function timeToHex(){
    var hours = (date.getHours() % 24).toString();
    var minutes = date.getMinutes().toString();
    var seconds = date.getSeconds().toString();
    
    if (hours.length < 2) {
        hours = '0' + hours;
    }
    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
        seconds = '0' + seconds;
    }

    return '#' + hours + minutes + seconds;
}

class Particle {
    constructor() {
      this.x = 0;
      this.y = 0;
  
      this.speed = Math.random() * 1 +1;
      this.angle = Math.random() * Math.PI * 2; //Angle between 0-360
      this.vx = Math.cos(this.angle) * this.speed; // X = cos
      this.vy = -Math.sin(this.angle) * this.speed; // Y = sin
      this.el = document.createElement("div");
      this.el.className = "particle";
      this.el.style.left = this.x + "px";
      this.el.style.top = this.y + "px";
      this.el.style.backgroundColor = colors4Particles[Math.floor(Math.random() * colors4Particles.length)];
      document.body.appendChild(this.el);
  
      setTimeout(() =>{
          this.el.remove();//Remove the element from the page
          particles.splice(particles.indexOf(this), 1);//Remove from the array
      }, 300);
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
        this.el.style.left = this.x + "px";
        this.el.style.top = this.y + "px";
    }

    update() {
        this.setPosition(this.vx + this.x, this.vy + this.y);
        this.vy += 0.01;
      }
}

//Class firework
class Firework {
  constructor() {
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight - 10;

    this.speed = 5;
    this.angle = (Math.random() * Math.PI) / 2 + Math.PI / 4; //Angle between 45-135
    this.vx = Math.cos(this.angle) * this.speed; // X = cos
    this.vy = -Math.sin(this.angle) * this.speed; // Y = sin

    this.el = document.createElement("div");
    this.el.className = "firework";
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
    this.el.style.backgroundColor = timeToHex();
    document.body.appendChild(this.el);

    setTimeout(() =>{
        this.el.remove();//Remove the element from the page
        fireworks.splice(fireworks.indexOf(this), 1);//Remove from the array
        this.explode()
    }, 1300);
  }

  explode(){
      for(let i = 0; i < 50; i++){
        const particle = new Particle();
        particle.setPosition(this.x, this.y);
        particles.push(particle);
      }
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
    this.vy += 0.02
  }
}

function fireworkStart(){
    if(started == 0){
        setInterval(() => {
        fireworks.forEach(firework => firework.update());
        particles.forEach(particle => particle.update());
        }, 5);

        setInterval(() => {
        var firework = new Firework();
        fireworks.push(firework);
        }, 200);
        started++;
    }
    
}

function changeBackground(){
    
}

//Interval to check if its time to fireworks
setInterval(()=>{
    if(dateNormalization() == '2022/01/02' && started == 0){
        fireworkStart();
        started++;
    }
}, 1000);

setInterval(() =>{
    hours = date.getHours();
    hours = 15;
    if (hours < 10) {
        haveAGoodDisplay.innerHTML = 'Have a good morning!';
        document.body.style.background = 'radial-gradient(circle at center, #EBEEAE 0%, #94BBE9 100%)';
    } else if (hours < 20) {
        haveAGoodDisplay.innerHTML = 'Have a good evening!';
        document.body.style.background = 'radial-gradient(circle at center, #FFBB32 0%, #0070FF 100%)';
    } else {
        haveAGoodDisplay.innerHTML ='Have a good night!';
        document.body.style.background = 'radial-gradient(circle at center, #001153 0%, #000419 100%)';
    }
}, 1000)

//To execute the function we want once the page is loaded
window.onload = displayDate();
