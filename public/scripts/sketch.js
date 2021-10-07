
class Octava {
  constructor() {
    this.octava = []
    this.freq = []
    this.amp = []
    for(let i = 0; i < width;i + width/8){
      this.freq[i] = 40.45;
    }
  }
  sonar(nota, amplitud){
  
    for(let i = 0; i < 8; i++){
     if( nota == 1){
      oscillator.freq(freq[i], 0.1);
      oscilator.amp(amplitud, 0.1);
     }
    }
  }
}


class Particles {
  constructor( _x) {
    this.cantidad = 9
    this.initX = _x
    this.x = []
    this.y = []
    this.lastX
    this.tastY
    this.vel = 1
    this.tamX = []
    this.tamY = []
    this.group

    for (let i = 0; i < 3; i++) {
      this.x[i] = []
      this.y[i] = []
      this.tamX[i] = []
      this.tamY[i] = []
      for (let j = 0; j < 3; j++) {
        this.x[i][j] = random(_x  ,_x+width/8)
        this.y[i][j] = random(height,height+height/2)
        this.tamX[i][j] = random(2, 12)
        this.tamY[i][j] = random(height/3, height/2)
      }
    }
    this.initX = round(map(this.initX, 0, width, 0,7));
    this.actualizar(100,this.initX);
  }

  fade(velocidad) {
    background(0, 15);
    push()
    // fill(0, 0, 20, 20);
    //  rect(0, 0, width, height)
    pop()
  }
  mouseDetector( x,  y, ancho, alto, ID){
    if(mouseX > x && mouseX < x + ancho && mouseY > y && mouseY < y + alto){
      octava.sonar(ID)
    }
  }
  imagen(x,  y,  tamX,  tamY, velocidad, ID) {
    let from = color(204, 102, 0);
    let to = color(0, 102, 153);
    let strokeW;
    strokeW =velocidad/10
    if(strokeW > 1){
      strokeW = 1;
    }
    push()
    //this.mouseDetector(mouseX, mouseY, ID)
    stroke(255);
    //rect(x, y+velocidad,  this.lastX ,  this.lastY+velocidad)
    strokeWeight(strokeW);
    //rect(ID*width/8, 0, width/8, height+velocidad);
    line(x, y, this.lastX, this.lastY);
    circle(x, y, tamX)
    pop();
    this.lastX = x;
    this.lastY = y ;
  }
   actualizar( velocidad , ID, group) {
    let nX = ID * width/8;
    for (let i = 0; i < 3; i++) { 
      for (let j = 0; j < 3; j++) {
      this.y[i][j]-=random(velocidad*10,velocidad*20)
      if (this.y[i][j] < 0 - height ) {
         this.tamX[i][j]=random(2, 6)
         this.tamY[i][j]=random(height/2, height/3)
         this.x[i][j]= random(nX, nX + width / 8)
         this.y[i][j] = random(height, height * 2)
      }
      this.imagen(this.x[i][j], this.y[i][j], this.tamX[i][j], this.tamY[i][j], velocidad, ID);
     }
    }
    this.fade(velocidad);
  }
}  
  var box,width,height
  var particles, particles1,particles2,particles3, particles4, particles5,particles6,particles7;
  var octava;
  function setup() {
    smooth()
    background(0)
    frameRate(12)
  
    box = document.querySelector('html')

    var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

    if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
      width = box.clientWidth
      height = box.clientHeight / 1.45


     } else{
        width = box.clientWidth
        height = box.clientHeight

    }
    octava = new Octava();
    particles = new Particles(0)
    particles1 = new Particles(width/8)
    particles2 = new Particles(width/8 * 2)
    particles3 = new Particles(width/8 * 3)
    particles4 = new Particles(width/2)
    particles5 = new Particles(width/2 + width/8)
    particles6 = new Particles(width/2  + width/8 * 2)
    particles7 = new Particles(width/2 +  width/8 * 3)
    createCanvas(width, height)
  }
    function draw() {
    for(let i = 0; i < 8; i++){
      let valor = document.getElementById("valor"+i).innerHTML
      if(i == 0){
        particles.actualizar(valor, i)
      }else if(i == 1){
        particles1.actualizar(valor, i)
      }else if(i == 2){
        particles2.actualizar(valor, i)
      }else if(i == 3){
        particles3.actualizar(valor, i)
      }
      else if(i == 4){
        particles4.actualizar(valor, i)
      }
      else if(i == 5){
        particles5.actualizar(valor, i)
      }
      else if(i == 6){
        particles6.actualizar(valor, i)
      }
      else if(i == 7){
        particles7.actualizar(valor, i)
      }
    }
  }
  function mousePressed(){
    box = document.querySelector('html')
    width = box.clientWidth
    height = box.clientHeight
    for(let i = 0; i < width; i+width/8){
      if(mouseX > i && mouseX < i + width/8){
        octava.sonar(i)
      }
    }
    
  }
