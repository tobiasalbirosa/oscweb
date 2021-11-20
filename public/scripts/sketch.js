'use strict'
class Particle {

  constructor(ID, cant, range) {
    this.ID = ID;
    this.cant = cant
    this.range = range
    this.particleX = []
    this.particleY = []
    this.x = ID * width / 6
    this.tam = []
    this.lastX
    this.lastY

    for (let i = 0; i < this.cant; i++) {
      this.particleX[i] = random(this.x, this.x + this.range)
      this.particleY[i] = random(height, height * 2)
      this.tam[i] = random(1, 3)
      this.lastX = this.x
      this.lastY = height
    }

  }

  actualizar(velocidad, ID) {
    push()

    for (let i = 0; i < this.cant; i++) {
      this.particleY[i] -= ((velocidad / 10) + 2)
    
      strokeWeight((velocidad / 10) + .3)

      if (this.particleY[i] <= 0) {
        this.particleY[i] = random(height, height * 2);
        this.particleX[i] = random(this.x, this.x + this.range)
      }
      if (this.x <= width / 2 - 20) {
        stroke(255,0,0, velocidad + 60)
        fill(255, 0, 0, velocidad + 120)
      } else {
        stroke(255,255,0, velocidad + 60)
        fill(255, 255, 0, velocidad + 120)
      }
      if(ID % 2 == 0){
        line(this.particleX[i], this.particleY[i], this.lastX, this.lastY)
        this.lastX = this.particleX[i]
        this.lastY = this.particleY[i]
      }else{
        ellipse(this.particleX[i], this.particleY[i], (velocidad / 100) + 0.5, (velocidad / 100) + 0.8)
      }

    }


    pop()
  }

}

var samples = []
var particles = []

function preload() {
  for (let i = 0; i < 6; i++) {
    samples[i] = loadSound('../public/assets/' + i + '.wav')
  }
}

var fullHtml
function setup() {
  noStroke()
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
  for (let i = 0; i < 6; i++) {
    particles[i] = new Particle(i, 50, width / 6)
    samples[i].play()
    samples[i].loop()
  }
  getAudioContext().suspend()
}
let firstPressed = false
function mouseIsPressed() {
  if (firstPressed == false) {
    userStartAudio()
    getAudioContext().resume()
    firstPressed = true
  }
}
function touchStarted() {
  if (firstPressed == false) {
    userStartAudio()
    getAudioContext().resume()
    firstPressed = true
  }
}
let valor
function draw() {
  background(0, 120)
  for (let i = 0; i < 6; i++) {
    valor = document.getElementById("valor" + i).innerHTML
    push()
    particles[i].actualizar(valor, i)
    pop()

    push()
    noStroke()
    if (i * width / 6 + width / 12 <= width / 2) {
      fill(255, 255, 0, valor)

    } else {
      fill(255, 0, 0, valor)

    }
    ellipse(i * width / 6 + width / 12, height / 2, valor, valor)
    pop()
    valor = map(valor, 0, 127, 0, .5)
    samples[i].amp(constrain(valor, 0, .5))
  }
}