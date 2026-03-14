const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const finalStrip = document.getElementById('final-strip');
const captureButton = document.getElementById('capture');

// Load photostrip template
const template = new Image();
template.src = 'photostrip-template.png'; // your template with transparent area

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error("Webcam error:", err));

// Capture photo and put on template
captureButton.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  
  // Set canvas to template size
  canvas.width = template.width;
  canvas.height = template.height;

  // Draw template first
  context.drawImage(template, 0, 0);

  // Draw webcam photo onto template
  // Adjust x, y, width, height to match transparent area
  const photoX = 50; // example: left padding
  const photoY = 50; // example: top padding
  const photoWidth = 200;
  const photoHeight = 200;

  context.drawImage(video, photoX, photoY, photoWidth, photoHeight);

  // Show final image
  const finalImg = new Image();
  finalImg.src = canvas.toDataURL('image/png');
  finalStrip.innerHTML = "";
  finalStrip.appendChild(finalImg);
});
