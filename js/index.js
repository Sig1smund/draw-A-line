const canvas = document.getElementById("blank");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const colors = document.querySelectorAll(".color");
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
    previousY = event.clientY;
    previousX = event.clientX;
    return;
  }

  let currentY = event.clientY;
  let currentX = event.clientX;

  context.beginPath();
  context.moveTo(previousY, previousX);
  context.lineTo(currentX, currentY);
  context.stroke();

  previousY = currentY;
  previousX = currentX;
});
