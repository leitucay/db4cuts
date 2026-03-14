const video = document.getElementById('camera');
const canvas = document.getElementById('final-strip');
const ctx = canvas.getContext('2d');
const snapBtn = document.getElementById('snap');
const downloadLink = document.getElementById('download-link');

// Load photostrip template
const stripTemplate = new Image();
stripTemplate.src = 'photobooth.png'; // <-- your file

// Draw template once loaded
stripTemplate.onload = () => {
  ctx.drawImage(stripTemplate, 0, 0, canvas.width, canvas.height);
}

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error(err));

let photoCount = 0;
const maxPhotos = 4;
const photos = [];

// Photo positions (adjust y-values to match your template)
const photoPositions = [
  { x: 50, y: 200, width: 200, height: 200 }, // 1st photo (centered)
  { x: 50, y: 425, width: 200, height: 200 },
  { x: 50, y: 650, width: 200, height: 200 },
  { x: 50, y: 875, width: 200, height: 200 }
];

snapBtn.addEventListener('click', () => {
  if(photoCount >= maxPhotos){
    alert("You've taken all 4 photos!");
    return;
  }

  // Capture current video frame
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;
  tempCanvas.getContext('2d').drawImage(video, 0, 0);
  const photoData = new Image();
  photoData.src = tempCanvas.toDataURL('image/png');
  photos.push(photoData);

  photoData.onload = () => {
    // Clear canvas and redraw template
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(stripTemplate, 0, 0, canvas.width, canvas.height);

    // Draw all captured photos
    photos.forEach((p, i) => {
      const pos = photoPositions[i];
      ctx.drawImage(p, pos.x, pos.y, pos.width, pos.height);
    });

    photoCount++;

    if(photoCount === maxPhotos){
      downloadLink.style.display = 'inline-block';
      downloadLink.href = canvas.toDataURL('image/png');
      downloadLink.download = 'my-photostrip.png';
    }
  }
});
