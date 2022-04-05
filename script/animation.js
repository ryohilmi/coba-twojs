import Two from "two.js";

let arrow;
let two;

let leftDown = false;
let rightDown = false;
let forwardDown = false;
let backwardDown = false;

function init() {
  let params = {
    fullscreen: true,
  };

  const elem = document.body;
  two = new Two(params).appendTo(elem);

  const circleRadius = 50;
  const circle = two.makeCircle(0, 0, circleRadius);

  circle.fill = "#FF8000";
  circle.linewidth = 0;

  const triangle = two.makePolygon(0, 0, 50, 3);

  triangle.fill = "#FF8000";
  triangle.linewidth = 0;

  triangle.position.x = 0;
  triangle.position.y = -50;

  arrow = two.makeGroup(circle, triangle);
  arrow.linewidth = 5;
  arrow.position.set(two.width * 0.5, two.height * 0.5);
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

init();

two.bind("update", update);
two.play();

function update(frameCount) {
  if (leftDown) {
    arrow.rotation -= 0.1;
  }

  if (rightDown) {
    arrow.rotation += 0.1;
  }

  if (forwardDown) {
    arrow.position.x += Math.sin(arrow.rotation) * 10;
    arrow.position.y -= Math.cos(arrow.rotation) * 10;
  }
  if (backwardDown) {
    arrow.position.x -= Math.sin(arrow.rotation) * 10;
    arrow.position.y += Math.cos(arrow.rotation) * 10;
  }

  if (arrow.position.x < 0) {
    arrow.position.x = 0;
  } else if (arrow.position.x > two.width) {
    arrow.position.x = two.width;
  }

  if (arrow.position.y < 0) {
    arrow.position.y = 0;
  } else if (arrow.position.y > two.height) {
    arrow.position.y = two.height;
  }

  arrow.rotation %= Math.PI * 2;
}

function handleKeyDown(e) {
  switch (e.key) {
    case "ArrowLeft":
      leftDown = true;
      break;
    case "ArrowRight":
      rightDown = true;
      break;
    case "ArrowUp":
      forwardDown = true;
      break;
    case "ArrowDown":
      backwardDown = true;
      break;
  }
}

function handleKeyUp(e) {
  switch (e.key) {
    case "ArrowLeft":
      leftDown = false;
      break;
    case "ArrowRight":
      rightDown = false;
      break;
    case "ArrowUp":
      forwardDown = false;
      break;
    case "ArrowDown":
      backwardDown = false;
      break;
  }
}
