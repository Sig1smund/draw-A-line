const canvas = document.getElementById("blank");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let colors = document.querySelectorAll(".color");
colors = Array.from(colors);

const context = canvas.getContext("2d");
context.lineWidth = 5;

colors.forEach((color) => {
  color.addEventListener("click", () => {
    context.strokeStyle = color.dataset.color;
  });
});

const destroyer = document.querySelector(".destroyIt");
destroyer.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

const saver = document.querySelector(".saveIt");
saver.addEventListener("click", () => {
  let data = canvas.toDataURL("image/png");
  let link = document.createElement("a");
  link.href = data;
  link.download = "name.png";
  link.click();
});

let previousY = null;
let previousX = null;

let doIt = false;

window.addEventListener("mousedown", (event) => (doIt = true));

window.addEventListener("mouseup", (event) => (doIt = false));

window.addEventListener("mousemove", (event) => {
  if (previousX == null || previousY == null || !doIt) {
    previousX = event.clientX;
    previousY = event.clientY;
    return;
  }

  let currentX = event.clientX;
  let currentY = event.clientY;

  context.beginPath();
  context.moveTo(previousX, previousY);
  context.lineTo(currentX, currentY);
  context.stroke();

  previousY = currentY;
  previousX = currentX;
  console.log(event);
});
