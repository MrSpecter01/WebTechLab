// Get the canvas element and its 2D drawing context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 1. Filled Rectangle
// ctx.fillRect(x, y, width, height)
ctx.fillStyle = '#e74c3c'; 
ctx.fillRect(50, 140, 120, 70);

// 2. Filled Circle
// Math.PI * 2 creates a full 360-degree arc
ctx.beginPath();
ctx.arc(400, 175, 40, 0, Math.PI * 2); 
ctx.fillStyle = '#2ecc71';
ctx.fill();

// 3. Straight Line
ctx.beginPath();
ctx.moveTo(50, 80);  // Start position
ctx.lineTo(450, 80); // End position
ctx.strokeStyle = '#2c3e50';
ctx.lineWidth = 4;
ctx.stroke();

// 4. Text "HTML5 Canvas"
ctx.font = 'bold 32px Cascadia Mono';
ctx.fillStyle = '#3498db';
ctx.textAlign = 'center';
// Drawing the text at the horizontal center (250) and near the bottom (250)
ctx.fillText('HTML5 Canvas', canvas.width / 2, 50);
