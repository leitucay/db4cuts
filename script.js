const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const captureButton = document.getElementById('capture');

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error("Webcam error:", err));

// Capture photo
captureButton.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const img = document.createElement('img');
  img.src = canvas.toDataURL('image/png');
  photos.innerHTML = ""; // only one photo at a time
  photos.appendChild(img);
});
