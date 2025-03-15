const video = document.querySelector('.player__video');
const toggle = document.querySelector('.toggle');
const volume = document.querySelector('input[name="volume"]');
const playbackSpeed = document.querySelector('input[name="playbackSpeed"]');
const rewind = document.querySelector('.rewind');
const skip = document.querySelector('.skip');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update volume and playback speed
function handleVolume() {
  video.volume = volume.value;
}

function handleSpeed() {
  video.playbackRate = playbackSpeed.value;
}

// Rewind and skip
function handleRewind() {
  video.currentTime -= 10;
}

function handleSkip() {
  video.currentTime += 25;
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// Scrub through video
function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

volume.addEventListener('input', handleVolume);
playbackSpeed.addEventListener('input', handleSpeed);

rewind.addEventListener('click', handleRewind);
skip.addEventListener('click', handleSkip);

progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

