const startButton = document.getElementById('startButton');
const takeButton = document.getElementById('takeButton');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const downloadLink = document.getElementById('downloadLink');
const sticker = document.getElementById('sticker');

let stream;

// Start Camera
startButton.addEventListener('click', async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error('Cannot access webcam:', err);
    alert('Please allow camera access.');
  }
});

// Take Photo
takeButton.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // draw video
  ctx.drawImage(sticker, 0, 0, canvas.width, canvas.height); // draw sticker
  canvas.style.display = 'block';
  const dataURL = canvas.toDataURL('image/png');
  downloadLink.href = dataURL;
});
