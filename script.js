const songs = [{
        title: "Don't look",
        artist: "karan Aujla",
        src: "songs/Dont_look.mp3 ",
        cover: "images/dontlook.jpeg",
        playlist: "pop",
    },
    {
        title: "ko ko korina",
        artist: "Ahad raza and momina",
        src: "songs/ko_ko_korina.mp3",
        cover: "images/korina.jpg",
        playlist: "pop",
    },
    {
        title: "mexico",
        artist: "karan Aujla",
        src: "songs/Mexico.mp3",
        cover: "images/mexico.jpg",
        playlist: "pop",
    },
    {
        title: "Pasoori",
        artist: "Shae Gill and Ali Sethi",
        src: "songs/pasoori.mp3",
        cover: "images/pasoori.webp",
        playlist: "pop",
    },
    {
        title: "Yeah baby",
        artist: "Garry Sandhu",
        src: "songs/yeah_baby.mp3",
        cover: "images/yeah_baby.jpg",
        playlist: "pop",
    },
    {
        title: "Jad Mil ke Bethan gy",
        artist: "Amrinder Sing",
        src: "songs/milke.mp3",
        cover: "images/jad_mil_ke.jpg",
        playlist: "sad",
    },
    {
        title: "Husn",
        artist: "Anuv Jain",
        src: "songs/Husn.mp3",
        cover: "images/husn.jpg",
        playlist: "sad",
    },
    {
        title: "Faasle",
        artist: "Kaifi khalil",
        src: "songs/Faasle.mp3",
        cover: "images/faasle.jpg",
        playlist: "sad",
    },
    {
        title: "Shikayat",
        artist: "AUR(band)",
        src: "songs/shikayat.mp3",
        cover: "images/shikayat.jpeg",
        playlist: "sad",
    },
    {
        title: "December",
        artist: "Abrar ul Haq",
        src: "songs/December.mp3",
        cover: "images/december.jpeg",
        playlist: "sad",
    },
    {
        title: "Teri Ore",
        artist: "Rahat Fateh Ali khan and Shriya Goshal",
        src: "songs/TeriOre.mp3",
        cover: "images/teriore.jpeg",
        playlist: "love",
    },
    {
        title: "Varoon",
        artist: "Romy",
        src: "songs/Vaaroon.mp3",
        cover: "images/varoon.jpg",
        playlist: "love",
    },
    {
        title: "Tere Hawale krdiya",
        artist: "Arijit Singh and Shilpa Rao",
        src: "songs/TereHawale.mp3",
        cover: "images/terehawale.jpg",
        playlist: "love",
    },
    {
        title: "Shiddat",
        artist: "Manan Bhardwaj",
        src: "songs/Shiddat.mp3",
        cover: "images/shiddat.jpeg",
        playlist: "love",
    },
    {
        title: "Ankhon se Batana",
        artist: "Dikshant",
        src: "songs/Aankhon.mp3",
        cover: "images/ankhon.jpg",
        playlist: "love",
    },
    {
        title: "Kbhi main kbhi tum",
        artist: "AUR(band)",
        src: "songs/Kabhi.mp3",
        cover: "chaldiye.jpeg",
        playlist: "ost",
    },
    {
        title: "Ehd e wafa",
        artist: "Ali Zafar,Aima baig",
        src: "songs/Yariyaan.mp3",
        cover: "images/ehdewafa.jpeg",
        playlist: "ost",
    },
    {
        title: "Sadqy Tumhare",
        artist: "Rahat Fateh Ali Khan",
        src: "songs/SadqayTumhare.mp3",
        cover: "images/sadqy.jpg",
        playlist: "ost",
    },
    {
        title: "Diyar e Dil",
        artist: "Zebunnisa Bangash, Momina Durani",
        src: "songs/Diyar.mp3",
        cover: "images/diyar.jpg",
        playlist: "ost",
    },
    {
        title: "Suno Chanda",
        artist: "Farhan Saeed",
        src: "songs/SunoChanda.mp3",
        cover: "images/sunochanda.jpeg",
        playlist: "ost",
    },

];

let currentSongIndex = 0;
let audio = new Audio();
let likedSongs = [];

// elements
const songList = document.getElementById("song-list");
const playlists = document.querySelectorAll("#playlists li");
const playlistTitle = document.getElementById("playlist-title");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const muteBtn = document.getElementById("mute");
const likeBtn = document.getElementById("like");

function loadSongs(filter = "all") {
    songList.innerHTML = "";
    const filteredSongs =
        filter === "all" ?
        songs :
        filter === "liked" ?
        likedSongs :
        songs.filter((s) => s.playlist === filter);

    filteredSongs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        li.onclick = () => {
            currentSongIndex = songs.indexOf(song);
            loadSong(song);
            playSong();
        };
        songList.appendChild(li);
    });
    playlistTitle.textContent =
        filter === "liked" ? "Liked Songs" : filter.toUpperCase() + " Songs";
}

function loadSong(song) {
    audio.src = song.src;
    cover.src = song.cover;
    title.textContent = song.title;
    artist.textContent = song.artist;
    likeBtn.classList.toggle("liked", likedSongs.includes(song));
}

function playSong() {
    audio.play();
    playBtn.textContent = "⏸️";
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶️";
}

playBtn.onclick = () => {
    if (audio.paused) playSong();
    else pauseSong();
};

nextBtn.onclick = () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
};

prevBtn.onclick = () => {
    currentSongIndex =
        (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
};

audio.ontimeupdate = () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
};

progress.oninput = () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
};

volume.oninput = () => {
    audio.volume = volume.value;
};

muteBtn.onclick = () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔊" : "🔇";
};

likeBtn.onclick = () => {
    const song = songs[currentSongIndex];
    if (likedSongs.includes(song)) {
        likedSongs = likedSongs.filter((s) => s !== song);
    } else {
        likedSongs.push(song);
    }
    likeBtn.classList.toggle("liked", likedSongs.includes(song));
};

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
}

// init
loadSongs("all");

playlists.forEach((p) =>
    p.addEventListener("click", () => {
        playlists.forEach((el) => el.classList.remove("active"));
        p.classList.add("active");
        loadSongs(p.dataset.playlist);
    })
);
aylists.forEach((p) =>
    p.addEventListener("click", () => {
        playlists.forEach((el) => el.classList.remove("active"));
        p.classList.add("active");
        loadSongs(p.dataset.playlist);
    })
);