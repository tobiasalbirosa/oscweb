class Particles {
  constructor( _x) {
    this.cantidad = 25
    this.initX = _x
    this.x = []
    this.y = []
    this.lastX
    this.tastY
    this.vel = 1
    this.tamX = []
    this.tamY = []
    for (let i = 0; i < 4; i++) {
      this.x[i] = []
      this.y[i] = []
      this.tamX[i] = []
      this.tamY[i] = []
      for (let j = 0; j < 4; j++) {
        this.x[i][j] = random(_x  ,_x+width/8)
        this.y[i][j] = random(height, height*3)
        this.tamX[i][j] = random(2, 12)
        this.tamY[i][j] = random(height/3, height/2)
      }
    }
    this.initX = round(map(this.initX, 0, width, 0,7));
    this.actualizar(this.vel,this.initX);
  }

  fade(velocidad) {
      background(0, 15);
    push()
   // fill(0, 0, 20, 20);
   //  rect(0, 0, width, height)
    pop()
  }



  imagen(x,  y,  tamX,  tamY, velocidad, ID) {
    let from = color(204, 102, 0);
    let to = color(0, 102, 153);


    push()
 
    stroke(255);
    //rect(x, y+velocidad,  this.lastX ,  this.lastY+velocidad)
    strokeWeight(velocidad/10);

    //rect(ID*width/8, 0, width/8, height+velocidad);
    
    line(x, y, this.lastX, this.lastY);

    //noStroke()
    circle(x, y, tamX)
    pop();
    this.lastX = x;
    this.lastY = y ;
  }
   actualizar( velocidad , ID) {
    let nX = ID * width/8;
    for (let i = 0; i < 4; i++) { 
      for (let j = 0; j < 4; j++) {
      this.y[i][j]-=velocidad*20
      if (this.y[i][j] < 0 - height ) {
         this.x[i][j]=random( nX,  nX + width/8)
         this.tamX[i][j]=random(2, 6)
         this.tamY[i][j]=random(height/2, height/3 )
         this.y[i][j] = random(height, height+height);
      }
      this.imagen(this.x[i][j], this.y[i][j], this.tamX[i][j], this.tamY[i][j], velocidad, ID);
     }
    }
    this.fade(velocidad);
  }
}
  var particles, particles1,particles2,particles3;
  function setup() {
    smooth()
    background(0)
    frameRate(12)
    var box,width,height
    box = document.querySelector('html')
    width = box.clientWidth
    height = box.clientHeight
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
      let radio = document.getElementById("valor"+i).innerHTML
      if(i == 0){
        particles.actualizar(radio, i)
      }else if(i == 1){
        particles1.actualizar(radio, i)
      }else if(i == 2){
        particles2.actualizar(radio, i)
      }else if(i == 3){
        particles3.actualizar(radio, i)
      }
      else if(i == 4){
        particles4.actualizar(radio, i)
      }
      else if(i == 5){
        particles5.actualizar(radio, i)
      }
      else if(i == 6){
        particles6.actualizar(radio, i)
      }
      else if(i == 7){
        particles7.actualizar(radio, i)
      }
    }
  }
  function mousePressed(){
    box = document.querySelector('html')
    width = box.clientWidth
    height = box.clientHeight
    particles = new Particles(0)
    particles1 = new Particles(width/8)
    particles2 = new Particles(width/8 * 2)
    particles3 = new Particles(width/8 * 3)
    particles4 = new Particles(width/2)
    particles5 = new Particles(width/2 + width/8)
    particles6 = new Particles(width/2  + width/8 * 2)
    particles7 = new Particles(width/2 +  width/8 * 3)
  }