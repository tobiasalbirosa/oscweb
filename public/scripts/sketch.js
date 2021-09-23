class Particles {
  constructor( _x) {
    this.cantidad = 25;
    this.initX = _x;
    this.x = []
    this.y = []
    this.vel = 1
    this.tamX = []
    this.tamY = []
    for (let i = 0; i < 5; i++) {
      this.x[i] = []
      this.y[i] = []
      this.tamX[i] = []
      this.tamY[i] = []
      for (let j = 0; j < 5; j++) {
        this.x[i][j] = random(_x+width);
        this.y[i][j] = 0;
        this.tamX[i][j] = random(200/40, 200/60);
        this.tamY[i][j] = random(200/40, 200/20);
      }
    }
      this.actualizar(1);
  }

  fade( intensity) {
    background(0,1);
    push();
    fill(0, 0, 20, 20);
    rect(0, 0, width, height);
    pop();
  }
   imagen( x,  y,  tamX,  tamY, intensity) {
    push();
    fill(255, 0);
    stroke(255, intensity/2);
    //line(x, y, width/2, height/2);
    //line(x, y, 0, 0);
    //line(x, y, width, 0);
    noStroke();
    fill(255, 255, 255, intensity*2);
    rect(x, y, tamX/2, tamY);
    pop();
  }
   actualizar( velocidad) {
    velocidad = map(velocidad, 0, 10000, .001,25);
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
      this.y[i][j]-=velocidad
      this.x[i][j]+=sin(this.y[i][j])
      if (this.y[i][j] < 0) {
         this.y[i][j]=random(height, height*2);
         this.x[i][j]=random(width/4);
         this.tamX[i][j]=random(5, width/60);
         this.tamY[i][j]=random(width/5, width/10);
      }
      this.imagen(this.x[i][j]+this.initX, this.y[i][j], this.tamX[i][j], this.tamY[i][j], velocidad);
     }
    }
    this.fade(velocidad);
  }
}
  var particles, particles1,particles2,particles3;
  function setup() {
    smooth();
    background(0);
    var box,width,height;
    box = document.querySelector('html');
    width = box.clientWidth;
    height = box.clientHeight;
    particles = new Particles(0);
    particles1 = new Particles(width/4);
    particles2 = new Particles(width/2);
    particles3 = new Particles(width-width/4);
    createCanvas(width, height);
  }
    function draw() {
    for(let i = 0; i < 4; i++){
      let radio = document.getElementById("valor"+i).innerHTML
    
      if(i == 0){
        particles.actualizar(radio);
      }else if(i == 1){
        particles1.actualizar(radio);
      }else if(i == 2){
        particles2.actualizar(radio);
      }else if(i == 3){
        particles3.actualizar(radio);
      }
    }
  }
  function mousePressed(){
    box = document.querySelector('html');
    width = box.clientWidth;
    height = box.clientHeight;
    particles = new Particles(0);
    particles1 = new Particles(width/4);
    particles2 = new Particles(width/2);
    particles3 = new Particles(width-width/4);
  }