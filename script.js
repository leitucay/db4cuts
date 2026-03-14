const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const sticker = document.getElementById('sticker');
const startBtn = document.getElementById('startBtn');
const intervalSelect = document.getElementById('interval');
const downloadLink = document.getElementById('downloadLink');

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => { video.srcObject = stream; })
  .catch(err => console.error(err));

startBtn.addEventListener('click', () => {
  const interval = parseInt(intervalSelect.value);
  capturePhoto();
  setTimeout(capturePhoto, interval);
});

function capturePhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');

  // Draw video
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Draw sticker
  ctx.drawImage(sticker, 0, 0, sticker.width, sticker.height);

  // Update download link
  downloadLink.href = canvas.toDataURL('image/png');
}
