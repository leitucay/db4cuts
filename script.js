const video = document.getElementById('camera');
const canvas = document.getElementById('final-strip');
const ctx = canvas.getContext('2d');
const snapBtn = document.getElementById('snap');
const downloadLink = document.getElementById('download-link');

// Load your vertical photostrip template (transparent PNG)
const stripTemplate = new Image();
stripTemplate.src = 'photobooth.png'; // replace with your template file

// Webcam access
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error(err));

let photoCount = 0; // count how many photos taken
const maxPhotos = 4;

// Predefined positions for each photo slot (adjust based on your template)
const photoPositions = [
  { x: 50, y: 50, width: 200, height: 200 },
  { x: 50, y: 325, width: 200, height: 200 },
  { x: 50, y: 600, width: 200, height: 200 },
  { x: 50, y: 875, width: 200, height: 200 }
];

snapBtn.addEventListener('click', () => {
  if(photoCount >= maxPhotos) {
    alert("You've already taken all 4 photos!");
    return;
  }

  // Draw template first
  ctx.drawImage(stripTemplate, 0, 0, canvas.width, canvas.height);

  // Draw each photo already taken
  for(let i = 0; i <= photoCount; i++){
    if(i < photoCount) continue; // skip unfilled slots
    const pos = photoPositions[i];
    ctx.drawImage(video, pos.x, pos.y, pos.width, pos.height);
  }

  photoCount++;

  // If all photos done, show download link
  if(photoCount === maxPhotos){
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Download Strip';
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = 'my-photostrip.png';
  }
});
