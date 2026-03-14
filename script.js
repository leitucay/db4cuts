const video = document.getElementById('camera');
const canvas = document.getElementById('final-strip');
const ctx = canvas.getContext('2d');
const snapBtn = document.getElementById('snap');
const retakeBtn = document.getElementById('retake');
const downloadLink = document.getElementById('download-link');

const stripTemplate = new Image();
stripTemplate.src = 'photobooth.png'; // your photostrip file

// Draw template once loaded
stripTemplate.onload = () => {
  ctx.drawImage(stripTemplate, 0, 0, canvas.width, canvas.height);
}

// Webcam access
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error(err));

let photoCount = 0;
const maxPhotos = 4;
const photos = [];

// Photo positions
const photoPositions = [
  { x: 50, y: 200, width: 200, height: 200 },
  { x: 50, y: 425, width: 200, height: 200 },
  { x: 50, y: 650, width: 200, height: 200 },
  { x: 50, y: 875, width: 200, height: 200 }
];

// Take photo
snapBtn.addEventListener('click', () => {
  if(photoCount >= maxPhotos){
    alert("All 4 photos taken!");
    return;
  }

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;
  tempCanvas.getContext('2d').drawImage(video, 0, 0);

  const photoData = new Image();
  photoData.src = tempCanvas.toDataURL('image/png');

  photos.push(photoData);

  photoData.onload = () => {
    redrawStrip();
    photoCount++;

    if(photoCount < maxPhotos){
      retakeBtn.style.display = 'inline-block';
    } else {
      snapBtn.style.display = 'none';
      retakeBtn.style.display = 'none';
      downloadLink.style.display = 'inline-block';
      downloadLink.href = canvas.toDataURL('image/png');
      downloadLink.download = 'my-photostrip.png';
    }
  }
});

// Retake last photo
retakeBtn.addEventListener('click', () => {
  if(photoCount === 0) return;
  photos.pop(); // remove last photo
  photoCount--;
  redrawStrip();
  retakeBtn.style.display = 'none';
});

// Redraw canvas
function redrawStrip(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(stripTemplate, 0, 0, canvas.width, canvas.height);

  photos.forEach((p, i) => {
    const pos = photoPositions[i];
    ctx.drawImage(p, pos.x, pos.y, pos.width, pos.height);
  });
}
