const canvas = document.querySelector("canvas");
const main = document.querySelector("main");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "red";
ctx.fillRect(20, 20, 200, 200);
ctx.fillStyle = "blue";
ctx.fillRect(50, 50, 200, 200);

ctx.strokeStyle = "red"
ctx.beginPath();
ctx.moveTo(150, 150);
ctx.lineWidth = 5;
ctx.lineTo(300, 300);
ctx.lineTo(300, 200);
ctx.lineTo(300, 300);
ctx.lineTo(200, 300);

ctx.stroke();


let painting = false;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) {
        return;
    }
    ctx.lineWidth = 5;
    ctx.lineCap = "round";  
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
}


canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);