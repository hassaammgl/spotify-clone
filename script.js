console.log("Welcome to Spotify");
// initialize the variables
let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')
let songitems = Array.from(document.getElementsByClassName('songitem'));
let songs = [
    {songName:"kavkaz", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"infinity", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"joker", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"jvla", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"lyrics", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"mi gna", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName:"ploua", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName:"rauf", filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    {songName:"rockstar", filePath:"songs/9.mp3", coverPath:"covers/9.jpg"},
    {songName:"sym", filePath:"songs/10.mp3", coverPath:"covers/10.jpg"}
]

songitems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play()

// handle play/pause song
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0;
    }
})
// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.add('fa-play-circle')
        element.classList.remove('fa-pause-circle')
    })

}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        gif.style.opacity = 1;
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songindex}.mp3`;
        masterSongName.innerHTML = songs[songindex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=10){
        songindex = 0;
    }
    else{
        songindex += 1;
    }
    audioElement.src = `songs/${songindex}.mp3`;
    masterSongName.innerHTML = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=1){
        songindex = 0;
    }
    else{
        songindex -= 1;
    }
    audioElement.src = `songs/${songindex}.mp3`;
    masterSongName.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})