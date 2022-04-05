import Two from "two.js";

let arrow;
let two;

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
  arrow.position.set(two.width * 0.5, two.height * 0.5);
  // arrow.scale = 1;
}

init();

two.bind("update", update);
two.play();

function update(frameCount) {}
