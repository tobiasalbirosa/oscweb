'use strict'
class Octava {
  constructor() {
    userStartAudio()
    this.freqs = []
    this.sine = []
    this.poly = []
    this.sineDB = []
    this.channelActivity = []
    this.relativeValue = []
    this.freqs[0] = 'C3'
    this.freqs[1] = 'F3'
    this.freqs[2] = 'G3'
    this.freqs[3] = 'A3'
    this.freqs[4] = 'C4'
    this.freqs[5] = 'F4'
    this.freqs[6] = 'G3'
    this.freqs[7] = 'A3'
    this.isPlaying = []
    this.samples = []
    this.lastRelativeAmplitude = []
    this.lowPass = new p5.LowPass()
    for (let i = 0; i < 8; i++) {
      this.poly[i] = new p5.PolySynth()
      this.sineDB[i] = 0
      this.relativeValue[i] = 0
      this.isPlaying[i] = false
      this.channelActivity[i] = 0
      this.poly[i].disconnect()
     this.poly[i].connect(this.lowPass)

    }

  }


  relativeAmplitudeDetector(relativeAmplitude, ID) {


    if (relativeAmplitude < .3) {
      relativeAmplitude = 0;
    }

    if (this.poly[ID] != undefined && this.isPlaying[ID] == false && relativeAmplitude >= .3) {
    relativeAmplitude = map(relativeAmplitude, .3, 1, 0, .2)


      this.poly[ID].setADSR(1, .8, 0.1, 0.1)


      this.poly[ID].play(this.freqs[ID], relativeAmplitude, 0, .9)

      this.isPlaying[ID] = true
    }
    if (this.isPlaying[ID] == true) {
      this.channelActivity[ID]++
      console.log("!!", this.channelActivity[ID])

    }
    if (this.channelActivity[ID] > 11) {
      console.log("10 change!!", this.channelActivity[ID])
      this.channelActivity[ID] = 0
      this.isPlaying[ID] = false
      // this.poly[ID].play(this.freqs[ID],1, 0, .9)

    }

  }

}

var fullHtml, octava

class Particles {
  constructor(_x) {
    if (width < 500 || height < 500) {
      this.cantidad = 5
    } else {
      this.cantidad = 10
    }
    this.initX = _x
    this.x = []
    this.y = []
    this.lastX = []
    this.lastY = []
    this.vel = 1
    this.tamX = []
    this.tamY = []
    for (let i = 0; i < this.cantidad; i++) {
      this.x[i] = []
      this.y[i] = []
      this.lastX[i] = []
      this.lastY[i] = []
      this.tamX[i] = []
      this.tamY[i] = []
      for (let j = 0; j < this.cantidad; j++) {
        this.lastX[i][j] = random(_x, _x + width / 8)
        this.lastY[i][j] = random(height, height + height / 2)
        this.x[i][j] = random(_x, _x + width / 8)
        this.y[i][j] = random(height, height * 2)
        this.tamX[i][j] = random(2, 12)
        this.tamY[i][j] = random(height / 3, height / 2)
      }
    }
    this.initX = round(map(this.initX, 0, width, 0, 7))
    this.actualizar(100, this.initX)
  }
  fade(velocidad, nX) {
    background(0, 0, 30, 15);
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
  imagen(x, y, tamX, velocidad) {
    let strokeW
    strokeW = velocidad
    if (strokeW > 1) {
      strokeW = 1
    }
    push()
    stroke(255, velocidad)
    strokeWeight(strokeW / 10)
    line(x, y, this.lastXParticle, this.lastYParticle)
    fill(255, velocidad)
    circle(x, y, tamX)
    pop()
    this.lastXParticle = x
    this.lastYParticle = y
  }
  actualizar(velocidad, ID) {
    let aument = 0
    if(velocidad > .3){
      octava.relativeAmplitudeDetector(velocidad, ID)
      aument=2

      }
      
    let nX = ID * width / 8;
    for (let i = 0; i < this.cantidad; i++) {
      for (let j = 0; j < this.cantidad; j++) {
        this.y[i][j] -= velocidad * 10 * aument
        if (this.y[i][j] < 0 - height / 3) {
          this.tamX[i][j] = random(1, 3)
          this.tamY[i][j] = random(1, 3)
          this.x[i][j] = random(nX, nX + width / 8)
          this.y[i][j] = random(height, height * 2)
        }
        this.imagen(this.x[i][j], this.y[i][j], this.tamX[i][j], velocidad  + aument/2)
        this.lastX[i][j] = this.x[i][j]
        this.lastY[i][j] = this.y[i][j]
        }
    }    
    this.fade(velocidad, ID)
  }
}
var particles, particles1, particles2, particles3, particles4, particles5, particles6, particles7
var oscArray = []
function setup() {
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
  octava = new Octava()
  getAudioContext().resume()

  particles = new Particles(0)
  particles1 = new Particles(width / 8)
  particles2 = new Particles(width / 8 * 2)
  particles3 = new Particles(width / 8 * 3)
  particles4 = new Particles(width / 2)
  particles5 = new Particles(width / 2 + width / 8)
  particles6 = new Particles(width / 2 + width / 8 * 2)
  particles7 = new Particles(width / 2 + width / 8 * 3)
  createCanvas(width, height)
}
let valor
function draw() {
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
    for (let i = 0; i < height; i += height / 30) {
      let iY = map(i, 0, height, .9, 0)
      stroke(lerpColor(color(0), color(200, 200, 255), iY))
      line(nX, i, nX, i + height / 30)
    }
  }
  pop()
}
