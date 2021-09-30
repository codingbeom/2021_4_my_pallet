const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const DEFAULT_COLOR = "2c2c2c";
canvas.width = 1000;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.0;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function sizeRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function modeChange(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
}
function canvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function clickCM(event) {
  event.preventDefault();
}

function savePallet() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Mypainting";
  link.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", canvasClick);
  canvas.addEventListener("contextmenu", clickCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);
if (range) {
  range.addEventListener("input", sizeRange);
}
if (mode) {
  mode.addEventListener("click", modeChange);
}
if (save) {
  save.addEventListener("click", savePallet);
}
