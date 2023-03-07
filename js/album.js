let container=document.querySelector(`.album`);
let search = new URLSearchParams(window.location.search);
let body=document.body;

let i = search.get(`i`);

// готово! i это нужное нам число
let album=albums[i];
if (!album){
  container.innerHTML=`ОШИБКА`;
} else {
  body.style.backgroundImage=`url(${album.bg})`;
container.innerHTML=`
	<div class="card mb-3 ">
          <div class="row">
            <div class="col-4">
              <img src="${album.img}" alt="" class="img-fluid rounded-start object-fit-cover">
            </div>
            <div class="col-8">
              <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text">${album.descripton}</p>
                <p class="card-text"><small class="text-muted">${album.year}</small></p>
              </div>
            </div>
          </div>
        </div>
`

let playlist=document.querySelector(`.play-list`);
let tracks=album.tracks
for (let j=0;j<tracks.length;j++){
	let track=tracks[j];
	playlist.innerHTML+=`
	<li class="track list-group-item d-flex align-items-center ">
            <img src="assets/play-playlist.png" alt="" class="img-pause me-3" height="30px">
            <img src="assets/play-stop.jpg" alt="" class="img-play me-3 d-none" height="30px">
            <div class="name-track">
              <div>${track.name}</div>
              <div class="text-secondary">${track.author}</div>
            </div>
            <div class="progress" >
              <div class="progress-bar" role="progressbar"style="width:0%;"></div>
            </div>
            <div class="time ms-auto">${track.time}</div>
            <audio class="audio" src="${track.src}" ></audio>
          </li>
	`
}

function setupAudio(){
  let trackNode = document.querySelectorAll(`.track`);
for (let i=0;i<trackNode.length;i++){
  let node=trackNode[i];
  let timeNode=node.querySelector(`.time`);
  let imgPause=node.querySelector(`.img-pause`);
  let imgPlay=node.querySelector(`.img-play`);
  let audio=node.querySelector(`.audio`);
  let progressBar=node.querySelector(`.progress-bar`);
  let isPlaying = false;
  node.addEventListener(`click`, function () {
    // Если трек сейчас играет...
    if (isPlaying) {
        isPlaying = false;
        // Поставить на паузу
        audio.pause();
        imgPause.classList.remove(`d-none`);
        imgPlay.classList.add(`d-none`);

    // Если трек сейчас не играет...
    } else {
        isPlaying = true;
        // Включить проигрывание
        audio.play();
        imgPlay.classList.remove(`d-none`);
        imgPause.classList.add(`d-none`);
        updateProgress()
    }
});
  function updateProgress() {
  // Нарисовать актуальное время
    let time =getTime(audio.currentTime);
    if (timeNode.innerHTML!=time){
      timeNode.innerHTML = time;
      progressBar.style.width = audio.currentTime*100/audio.duration +`%`;
    }
  // Нужно ли вызвать её ещё раз?
    if (isPlaying) {
        requestAnimationFrame(updateProgress);
  }
  
}
  
}
}


setupAudio()   
function getTime(time){
  let currentSeconds= Math.floor(time);
  let seconds= Math.floor(currentSeconds%60);
  if (seconds < 10){
    seconds=`0`+seconds;
  }

  return `${Math.floor(currentSeconds/60)}:${seconds}`
}
}