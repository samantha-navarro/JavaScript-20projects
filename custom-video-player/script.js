// DOM ELEMENTS
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// EVENT LISTENERS
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
// updatePlayIcon will change once it gets clicked
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

// FUNCTIONS

// play and pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// update play/pause video icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// update progress and timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  // using value because it's has a percentage.
  // * 100 to get a percentage on the video player

  // get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  // get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;

  // console.log(video.currentTime) // will be able to see the video in itts currentTime when playing
}

// stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
  //  there is no .stop() so we use currentTime to start the video over and use the .pause()
}

// set video time to progress 'change'
function setVideoProgress() {
  video.currentTime = +progress.value * video.duration * 100;
}

// video and audio mdn
