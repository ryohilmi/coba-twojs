import Two from "two.js";
import svg from "../pisang.svg";

let arrow;
let two;

let leftDown = false;
let rightDown = false;
let forwardDown = false;
let backwardDown = false;

function createRobot(two, number, x, y, insideColor, outsideColor) {
  const circle1Radius = 50;

  const outerCircle = two.makeCircle(x, y, circle1Radius + 8);
  outerCircle.fill = outsideColor;
  outerCircle.linewidth = 0;

  const tusuk = two.makePolygon(0, 0, 40, 3);
  tusuk.fill = outsideColor;
  tusuk.linewidth = 0;
  tusuk.position.x = x;
  tusuk.position.y = y - 60;

  const baseX = x;
  const baseY = y - 100;

  const rightLine = two.makeLine(baseX, baseY + 10, baseX + 80, baseY + 110);
  rightLine.stroke = outsideColor;
  rightLine.linewidth = 10;

  const leftLine = two.makeLine(baseX, baseY + 10, baseX - 80, baseY + 110);
  leftLine.stroke = outsideColor;
  leftLine.linewidth = 10;

  const innerCircle = two.makeCircle(x, y, circle1Radius);
  innerCircle.fill = insideColor;
  innerCircle.linewidth = 0;

  const id = two.makeText(number, baseX, baseY + 105, {
    size: 40,
    fill: "#ffffff",
    weight: 600,
  });

  const robot = two.makeGroup(
    outerCircle,
    tusuk,
    leftLine,
    rightLine,
    innerCircle,
    id
  );

  return robot;
}

function init() {
  let params = {
    fullscreen: true,
  };

  const elem = document.body;
  two = new Two(params).appendTo(elem);

  const robot = createRobot(two, 1, 400, 300, "#dd0000", "#ff0000");
  const robot2 = createRobot(two, 2, 700, 300, "#00cc00", "#00ff00");

  const circleRadius = 50;
  const circle = two.makeCircle(0, 0, circleRadius);

  circle.fill = "#FF8000";
  circle.linewidth = 0;

  const triangle = two.makePolygon(30, 50, 30, 3);

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
