let backgroundColor, frog
let car1
let lives, gameIsOver, score

function setup() {
  createCanvas(500, 500)
  colorMode(HSB, 360, 100, 100)
  backgroundColor = 95
  frog = { x: 250, y: 450 }
  car1 = { x: -30, y: 100, v: 2 }
  lives = 3
  gameIsOver = false
  score = 0
}

function draw() {
  background(backgroundColor)

  // Draw the destination
  fill(60, 80, 80)
  rect(0, 0, width, 50)

  // Draw the frog
  fill(120, 80, 80)
  ellipse(frog.x, frog.y, 20)

  //drawCars()
  fill(0, 80, 80)
  rect(car1.x, car1.y, 40, 30)

  moveCars()
  checkCollisions()
  checkWin()
  displayInfo()
}

function keyPressed() {
  if (gameIsOver) {
    console.log("Game over - user input ignored.")
  } else if (keyCode === UP_ARROW) {
    frog.y -= 10
  } else if (keyCode === LEFT_ARROW) {
    frog.x -= 10
  } else if (keyCode === RIGHT_ARROW) {
    frog.x += 10
  } else if (keyCode === DOWN_ARROW) {
    frog.y += 10
  }
}

function moveCars() {
  car1.x += car1.v
  if (car1.x >= width) {
    car1.x = -30
    car1.y = random(100, 400)
  }
}

// make sure that collide library loaded!
function checkCollisions() {
  if (collideRectCircle(car1.x, car1.y, 40, 30, frog.x, frog.y, 20)) {
    console.log("collided with Car 1")
    frog.y = 450
    lives -= 1
  }
  if (lives <= 0) {
    gameIsOver = true
  }
}

function displayInfo() {
  textSize(12)
  fill(0)
  text("Lives: " + lives, 10, 20)
  if (gameIsOver) {
    textSize(60)
    if (lives >= 1) {
      text("YOU WIN!", 110, height / 2)
    } else {
      text("GAME OVER", 70, height / 2)
    }
  }
}

function checkWin() {
  if (frog.y <= 50) {
    score += 1
    frog.y = 450
    // Make the car faster each time you score (increasing difficulty per level)
    car1.v += 2
  }
  if (score === 5) {
    gameIsOver = true
  }
}
