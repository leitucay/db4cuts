const startButton = document.getElementById('startButton');
const takeButton = document.getElementById('takeButton');
const retakeButton = document.getElementById('retakeButton');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const downloadLink = document.getElementById('downloadLink');
const sticker = document.getElementById('sticker');

let stream;
let photos = [];
let currentPhoto = 0;

// Stickers for each frame
const stickers = ['sticker1.png', 'sticker2.png', 'sticker3.png', 'sticker4.png'];

// Start Camera
startButton.addEventListener('click', async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    startButton.style.display = 'none';
  } catch (err) {
    console.error('Cannot access webcam:', err);
    alert('Please allow camera access.');
  }
});

// Take Photo
takeButton.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');

  // Capture current frame
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = 400;
  tempCanvas.height = 300;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(video, 0, 0, 400, 300);
  
  const img = new Image();
  img.src = stickers[currentPhoto];
  img.onload = () => {
    tempCtx.drawImage(img, 0, 0, 400, 300);
    photos.push(tempCanvas);
    currentPhoto++;

    if (currentPhoto < 4) {
      sticker.src = stickers[currentPhoto]; // Next sticker
    } else {
      createPhotostrip();
    }
  }
});

function createPhotostrip() {
  const ctx = canvas.getContext('2d');

  // Load your photostrip design
  const design = new Image();
  design.src = 'photostrip_template.png'; // your photostrip design
  design.onload = () => {
    // Make canvas same size as design
    canvas.width = design.width;
    canvas.height = design.height;

    // Draw the background design first
    ctx.drawImage(design, 0, 0, canvas.width, canvas.height);

    // Draw each captured photo onto the design
    // Here we assume photos should be positioned at y = 0, 300, 600, 900
    photos.forEach((photoCanvas, index) => {
      const x = 0; // adjust if you want margin from left
      const y = index * 300; // adjust according to your design
      ctx.drawImage(photoCanvas, x, y, 400, 300);
    });

    // Show canvas & download
    canvas.style.display = 'block';
    takeButton.style.display = 'none';
    retakeButton.style.display = 'inline-block';
    downloadLink.style.display = 'inline-block';
    downloadLink.href = canvas.toDataURL('image/png');
  }
}

// Retake option
retakeButton.addEventListener('click', () => {
  photos = [];
  currentPhoto = 0;
  canvas.style.display = 'none';
  takeButton.style.display = 'inline-block';
  retakeButton.style.display = 'none';
  downloadLink.style.display = 'none';
  sticker.src = stickers[0];
});
