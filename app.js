// Минималистичный плеер с 12 треками
const tracks = [
  { src: "audio/01.mp3", title: "01" },
  { src: "audio/02.mp3", title: "02" },
  { src: "audio/03.mp3", title: "03" },
  { src: "audio/04.mp3", title: "04" },
  { src: "audio/05.mp3", title: "05" },
  { src: "audio/06.mp3", title: "06" },
  { src: "audio/07.mp3", title: "07" },
  { src: "audio/08.mp3", title: "08" },
  { src: "audio/09.mp3", title: "09" },
  { src: "audio/10.mp3", title: "10" },
  { src: "audio/11.mp3", title: "11" },
  { src: "audio/12.mp3", title: "12" },
];

const audio = new Audio();
let idx = 0;
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playlistEl = document.getElementById('playlist');
const titleEl = document.getElementById('title');
const timeEl = document.getElementById('time');
const progress = document.getElementById('progress');

function buildPlaylist(){
  tracks.forEach((t, i)=>{
    const li = document.createElement('li');
    li.textContent = t.title;
    li.dataset.index = i;
    li.addEventListener('click', ()=>{
      loadTrack(i);
      play();
    });
    playlistEl.appendChild(li);
  });
  refreshActive();
}

function loadTrack(i){
  idx = (i + tracks.length) % tracks.length;
  audio.src = tracks[idx].src;
  titleEl.textContent = tracks[idx].title;
  refreshActive();
}

function refreshActive(){
  [...playlistEl.children].forEach((li, i)=>
    li.classList.toggle('active', i === idx)
  );
}

function play(){
  audio.play();
  playBtn.textContent = '⏸';
}
function pause(){
  audio.pause();
  playBtn.textContent = '▶';
}

playBtn.addEventListener('click', ()=>{
  if(audio.paused) play(); else pause();
});
prevBtn.addEventListener('click', ()=>{
  loadTrack(idx - 1);
  play();
});
nextBtn.addEventListener('click', ()=>{
  loadTrack(idx + 1);
  play();
});

audio.addEventListener('timeupdate', ()=>{
  if(audio.duration){
    const pct = (audio.currentTime / audio.duration) * 100;
    progress.value = pct;
    timeEl.textContent =
      formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
  }
});
audio.addEventListener('ended', ()=>{
  loadTrack(idx + 1);
  play();
});

progress.addEventListener('input', ()=>{
  if(audio.duration)
    audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(sec){
  if(!sec || isNaN(sec)) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

window.addEventListener('load', ()=>{
  buildPlaylist();
  loadTrack(0);
});
