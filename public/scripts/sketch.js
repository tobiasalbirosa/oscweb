'use strict'
class Octava {
  constructor() {
    this.freqs = []
    this.sine = []
    this.poly = []
    this.sineDB = []
    this.pressed = []
    this.channelActivity = []
    this.relativeValue = []
    if (width > 600) {

      this.freqs[0] = 'C4'
      this.freqs[1] = 'E4'
      this.freqs[2] = 'F4'
      this.freqs[3] = 'A4'
      this.freqs[4] = 'G4'
      this.freqs[5] = 'A4'
      this.freqs[6] = 'G4'
      this.freqs[7] = 'C4'
    } else {
      this.freqs[0] = 'C5'
      this.freqs[1] = 'E5'
      this.freqs[2] = 'F5'
      this.freqs[3] = 'A5'
      this.freqs[4] = 'G5'
      this.freqs[5] = 'A5'
      this.freqs[6] = 'G5'
      this.freqs[7] = 'C5'
    }


    this.isPlaying = []
    this.samples = []
    this.lastRelativeAmplitude = []
    this.lowPass = new p5.LowPass()
    this.highPass = new p5.HighPass()

    for (let i = 0; i < 8; i++) {
      this.poly[i] = new p5.PolySynth()
      this.sineDB[i] = 0
      this.relativeValue[i] = 0
      this.isPlaying[i] = false
      this.channelActivity[i] = 0
      this.poly[i].connect(this.lowPass)
      this.pressed[i] = false
    }
  }
  relativeAmplitudeDetector(relativeAmplitude, ID) {
    if (relativeAmplitude < .3) {
      relativeAmplitude = 0;
    }
    if (this.poly[ID] != undefined && this.isPlaying[ID] == false && firstPressed && true && relativeAmplitude >= .3) {
      relativeAmplitude = map(relativeAmplitude, 1, 1, .1, .4)
      this.poly[ID].setADSR(1, .8, .8, 1)
      this.poly[ID].play(this.freqs[ID], relativeAmplitude, 0, .9)
      this.isPlaying[ID] = true
    }

    if (relativeAmplitude == 0) {
      this.channelActivity[ID] = false
    }
    if (this.isPlaying[ID] == true) {
      this.channelActivity[ID]++
    }
    if (this.channelActivity[ID] > 10) {
      this.channelActivity[ID] = 0
      this.isPlaying[ID] = false
    }
  }
}
var fullHtml, octava
class Particles {
  constructor(_x) {
    if (width < 500 || height < 500) {
      this.cantidad = 2
    } else {
      this.cantidad = 4
    }
    this.initX = _x
    this.x = []
    this.y = []
    this.lastX = []
    this.lastY = []
    this.vel = 1
    this.tamX = []
    this.tamY = []
    this.lastYParticle = 0
    this.lastXParticle = 0
    //this.palabras = ["digo", "tierra", "playa", "árboles", "suelo", "ojos", "casa", "fuerte"]

    for (let i = 0; i < this.cantidad; i++) {
      this.x[i] = []
      this.y[i] = []
      this.lastX[i] = []
      this.lastY[i] = []
      this.tamX[i] = []
      this.tamY[i] = []
      for (let j = 0; j < this.cantidad; j++) {
        this.lastX[i][j] = random(this.initX, this.initX + width / 8)
        this.lastY[i][j] = random(height, height + height / 2)
        this.x[i][j] = random(this.initX, this.initX + width / 8)
        this.y[i][j] = random(height, height * 2)
        this.tamX[i][j] = random(1, 2)
        this.tamY[i][j] = random(height / 3, height / 2)
      }
    }
    this.initX = round(map(this.initX, 0, width, 0, 7))
    this.actualizar(100, this.initX)
  }
  actualizar(velocidad, ID) {
    let aument = 0
    if (velocidad > .3 && firstPressed == true) {
      if (mouseIsPressed && mouseX > ID * width / 8 && mouseX < ID * width / 8 + width / 8) {
        octava.pressed[ID] = !octava.pressed[ID]
        console.log("octava pressed", octava.pressed[ID])
        velocidad = velocidad * 1.2
        if (octava.pressed[ID] == true) {
          octava.relativeAmplitudeDetector(0, ID)
        }
      } else if (octava.pressed[ID] == false) {
        octava.relativeAmplitudeDetector(velocidad, ID)
      }
      aument = 2
    } else {
      velocidad = .4
      aument = .25
    }
    let nX = ID * width / 8;
    for (let i = 0; i < this.cantidad; i++) {
      for (let j = 0; j < this.cantidad; j++) {
        this.y[i][j] -= velocidad * 5 * + aument
        if (this.y[i][j] < 0 - height / 3) {
          this.tamX[i][j] = random(.1, 2)
          this.tamY[i][j] = random(.1, 2)
          this.x[i][j] = random(nX, nX + width / 8)
          this.y[i][j] = random(height, height * 2)
        }
        this.imagen(this.x[i][j], this.y[i][j], this.tamX[i][j], velocidad, ID)
        this.lastX[i][j] = this.x[i][j]
        this.lastY[i][j] = this.y[i][j]
      }
    }

    this.fade(velocidad, nX, ID)
  }
  fade(velocidad, nX, ID) {
    push()
    if (firstPressed && octava.pressed[ID] == true) {
      fill(255, 255 * velocidad / 5)
      rect(nX, 0, width / 8, height);
    } else {
      fill(0,0,10 ,255 * velocidad / 10)
      rect(nX, 0, width / 8, height);
    }
    pop()
    push()
    if (mouseX > nX && mouseX < nX + width / 8) {
      fill(255, velocidad / 100)
      if (mouseIsPressed) {
        fill(255, velocidad / 100)
      }
    } else {
      fill(255, velocidad / 100)
    }
    rect(nX, 0, width / 8, height)
    pop()
  }
  imagen(x, y, tamX, velocidad, ID) {

    let strokeW = map(velocidad, .2, 1, .01, .3)
    if (strokeW > .3) {
      strokeW = .3
    }
    push()
    if (firstPressed) {
      fill(10,10,27 ,255 * velocidad / 10)
      rect(ID *  width / 8, 0, width / 8, height);
      if(frameCount % 60 < 30){


      fill(255, 255 * velocidad)
      if (frameCount % 3 == 0) {
        stroke(120, 50, 50, 255 * velocidad)
      } else if (frameCount % 3 == 1) {
        stroke(0, 120, 120, 255 * velocidad)
      } else {
        stroke(255, 255 * velocidad)
      }

    }else{

      fill(255, 255 * velocidad)
      if (frameCount % 3 == 0) {
        stroke(0, 0, 50, 255 * velocidad)
      } else if (frameCount % 3 == 1) {
        stroke(0, 0, 120, 255 * velocidad)
      } else {
        stroke(0, 0, 80,255 * velocidad)
      }

    }
    
      strokeWeight(strokeW)

      if (octava.pressed[ID] == true) {

        stroke(10, 255 * velocidad)
        fill(0, 255 * velocidad)

      }

      line(x, y, this.lastXParticle, this.lastYParticle)
      circle(x, y, tamX)
      this.lastXParticle = x
      this.lastYParticle = y
      if(x > ID*width/8){
        x = width/8-20
      }
   //   text(this.palabras[ID], this.lastXParticle, this.lastYParticle)
  
      pop()

    }

  }

}
let capture
var particles, particles1, particles2, particles3, particles4, particles5, particles6, particles7
var oscArray = []
function setup() {
  
  textAlign(CENTER);
  getAudioContext().suspend()
  smooth()
  background(255)
  frameRate(12)
  fullHtml = document.querySelector('html')
  var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation
  if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
    width = fullHtml.clientWidth
    height = fullHtml.clientHeight / 1.45
  } else {
    width = fullHtml.clientWidth
    height = fullHtml.clientHeight
  }
  createCanvas(width, height)
  capture= createCapture(VIDEO);
  capture.size(width,height);
  capture.hide();
  particles = new Particles(0)
  particles1 = new Particles(width / 8)
  particles2 = new Particles(width / 8 * 2)
  particles3 = new Particles(width / 8 * 3)
  particles4 = new Particles(width / 2)
  particles5 = new Particles((width / 2) + width / 8)
  particles6 = new Particles((width / 2) + (width / 8) * 2)
  particles7 = new Particles((width / 2) + (width / 8) * 3)
}
let valor
let firstPressed = false
function mouseIsPressed() {
  if (firstPressed == false) {
    userStartAudio()
    getAudioContext().resume()
    octava = new Octava()
    firstPressed = true
  }
}
function touchStarted() {
  if (firstPressed == false) {
    userStartAudio()
    getAudioContext().resume()
    octava = new Octava()
    firstPressed = true
  }
}
function draw() {
  capture.loadPixels();
  tint(0,0,255,9);
  image(capture,0,0,width,height)
  noStroke();

  for (let y = 0; y < capture.height; y += 30) {
  for (let x = 0; x < capture.width; x += 30) {
    let offset = ((y*capture.width)+x)*4;
    fill(255, capture.pixels[offset+1]/8);
    square(x, y,10 * (capture.pixels[offset+1]/64));
  }
}
  for (let i = 0; i < 8; i++) {
    valor = document.getElementById("valor" + i).innerHTML
    if (i == 0) {
      particles.actualizar(valor, i)
    } else if (i == 1) {
      particles1.actualizar(valor, i)
    } else if (i == 2) {
      particles2.actualizar(valor, i)
    } else if (i == 3) {
      particles3.actualizar(valor, i)
    }
    else if (i == 4) {
      particles4.actualizar(valor, i)
    }
    else if (i == 5) {
      particles5.actualizar(valor, i)
    }
    else if (i == 6) {
      particles6.actualizar(valor, i)
    }
    else if (i == 7) {
      particles7.actualizar(valor, i)
    }
  }
  push()
  for (let nX = 0; nX < width; nX += width / 8) { 
    for (let i = 0; i < height; i += height / 15) {
      let iY = map(i, 0, height, .9, 0)
     stroke(lerpColor(color(0), color(200, 200, 255), iY))
      line(nX, i, nX, i + height / 15)
    }
  }
  pop()
}
