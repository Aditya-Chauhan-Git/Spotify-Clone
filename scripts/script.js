
//Time from seconds to minute

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);  // Get the full minutes
    const remainingSeconds = Math.floor(seconds % 60);  // Get the remaining seconds
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;  // Format with leading zero if needed
}

const hamCross = () => {
    let root = document.documentElement
    let ham = document.querySelector('.ham')
    ham.addEventListener('click', () => {
        root.style.setProperty('--left', '0%')

    })
    let cross = document.querySelector('.cross')
    cross.addEventListener('click', () => {
        root.style.setProperty('--left', '-100%')

    })
}

hamCross()

const upDown = () => {
    let root = document.documentElement;
    let arrow = document.querySelector('.dArrow'); // Start with the down arrow

    arrow.addEventListener('click', function handleClick() {
        if (arrow.classList.contains('dArrow')) {
            // Move element up
            root.style.setProperty('--bottom', '-67px');
            arrow.src = '../SVG/up_arrow.svg';
            arrow.classList = 'filter upArrow'; // Change the class to upArrow
            arrow = document.querySelector('.upArrow');
        } else {
            // Move element down
            root.style.setProperty('--bottom', '0px');
            arrow.src = '../SVG/down_arrow.svg';
            arrow.classList = 'filter dArrow'; // Change the class back to dArrow
            arrow = document.querySelector('.dArrow');
        }
    });
};

upDown();

const playPause = () => {
    Btn = document.querySelector('.pauseBtn2');

    Btn.addEventListener('click', function handleClick() {
        if (Btn.classList.contains('pauseBtn2')) {
            Btn.src = '../SVG/play.svg';
            Btn.classList = 'filter songBarBtn playBtn2';
            Btn = document.querySelector('.playBtn2');
            currentAudio.pause()
        } else {
            Btn.src = '../SVG/pause.svg';
            Btn.classList = 'filter songBarBtn pauseBtn2';
            Btn = document.querySelector('.pauseBtn2');
            currentAudio.play()
        }
    });
};

playPause();


//Fetching album of the song

const getData = async (title) => {
    url = `http://127.0.0.1:3000/Albums/${title}%20Album/`
    let response = await fetch(url)
    let text = await response.text()
    // console.log(text); 
    let div = document.createElement('div')
    div.innerHTML = text
    let a = div.getElementsByTagName('a')
    songCards = []
    songList = []
    songUnList = []
    for (let i = 0; i < a.length; i++) {
        const element = a[i];
        if (a[i].href.endsWith('.mp3')) {
            song = element.innerHTML
            song1 = element.innerHTML
            if (song[0] == '_') {
                song = song.replace('_', '')
            }
            if (song.endsWith('.mp3')) {
                song = song.replace('.mp3', '')
            }
            song = song.split('_')[0]
            songCard = `<div class="songCard">
                        <img src="../SVG/music.svg"  class="filter musicIcon" alt="music" srcset="">
                        <div style="flex-direction: column;">
                            <li class="songName">${song}</li>
                        </div>
                        <div class="playBtn">
                            <span>Play</span><img src="../SVG/play.svg" alt="play" class="filter">
                        </div>
                    </div>`

            songCards.push(songCard)
            let cards = songCards.join('\n')
            document.querySelector('.songList').firstElementChild.innerHTML = cards
            songList.push(song)
            songUnList.push(song1)


        }

    }


}

let backFor = (songList, song) => {
    forre = document.querySelectorAll('.forre');
    forre.forEach((element) => {
        element.addEventListener('click', () => {
            i = songList.indexOf(song)
            if (element.classList.contains('reverse')) {
                if (i != 0) {
                    currentAudio.pause()
                    song = songList[i - 1]
                    songUnList.forEach((s) => {
                        s1 = s
                        // console.log(s1);
                        if (s[0] == '_') {
                            s = s.replace('_', '')
                        }
                        if (s.endsWith('.mp3')) {
                            s = s.replace('.mp3', '')
                        }
                        s = s.split('_')[0]
                        // console.log(s);
                        if (song == s) {
                            url = `http://127.0.0.1:3000/Albums/${t}%20Album/${s1}`
                            url = url.replaceAll(' ', '%20')
                            currentAudio = new Audio(url)
                            if (Btn.src = '../SVG/pause.svg') {
                                currentAudio.play()
                            }
                            else if (Btn.src = '../SVG/play.svg') {
                                currentAudio.pause()
                            }
                            document.querySelector(".songBarName").innerHTML = song
                            document.querySelector(".songBarArtist").innerHTML = t

                            currentAudio.addEventListener('timeupdate', () => {
                                currentTimeInMin = formatTime(currentAudio.currentTime)
                                currentDurationInMin = formatTime(currentAudio.duration)
                                ratio = currentAudio.currentTime / currentAudio.duration
                                document.querySelector(".slider").style.setProperty('width', `${ratio * 100}%`)
                                document.querySelector(".songDuration").innerHTML = `${currentTimeInMin} / ${currentDurationInMin}`


                            })
                        }

                    })
                }
            }
            else if (element.classList.contains('forward')) {
                if (i != (songList.length - 1)) {
                    currentAudio.pause()
                    song = songList[i + 1]
                    songUnList.forEach((s) => {
                        s1 = s
                        // console.log(s1);
                        if (s[0] == '_') {
                            s = s.replace('_', '')
                        }
                        if (s.endsWith('.mp3')) {
                            s = s.replace('.mp3', '')
                        }
                        s = s.split('_')[0]
                        // console.log(s);
                        if (song == s) {
                            url = `http://127.0.0.1:3000/Albums/${t}%20Album/${s1}`
                            url = url.replaceAll(' ', '%20')
                            currentAudio = new Audio(url)
                            if (Btn.src = '../SVG/pause.svg') {
                                currentAudio.play()
                            }
                            else if (Btn.src = '../SVG/play.svg') {
                                currentAudio.pause()
                            }
                            document.querySelector(".songBarName").innerHTML = song
                            document.querySelector(".songBarArtist").innerHTML = t


                            currentAudio.addEventListener('timeupdate', () => {
                                currentTimeInMin = formatTime(currentAudio.currentTime)
                                currentDurationInMin = formatTime(currentAudio.duration)
                                ratio = currentAudio.currentTime / currentAudio.duration
                                document.querySelector(".slider").style.setProperty('width', `${ratio * 100}%`)
                                document.querySelector(".songDuration").innerHTML = `${currentTimeInMin} / ${currentDurationInMin}`

                            })
                        }

                    })
                }
            }
        });
    });
}

currentAudio = null
let getSong = async (clickedSongName, t) => {
    url = `http://127.0.0.1:3000/Albums/${t}%20Album/`
    let response = await fetch(url)
    let text = await response.text()
    let div = document.createElement('div')
    div.innerHTML = text
    let a = div.getElementsByTagName('a')
    for (let i = 0; i < a.length; i++) {
        const element = a[i];
        if (a[i].href.endsWith('.mp3')) {
            song1 = element.innerHTML
            song = element.innerHTML
            if (song[0] == '_') {
                song = song.replace('_', '')
            }
            if (song.endsWith('.mp3')) {
                song = song.replace('.mp3', '')
            }
            song = song.split('_')[0]
            if (song == clickedSongName) {
                newUrl = `http://127.0.0.1:3000/Albums/${t}%20Album/${song1}`
                // songUrl=newUrl
                if (currentAudio) {
                    currentAudio.pause()
                    currentAudio.currentTime = 0;

                }
                currentAudio = new Audio(newUrl);
                currentAudio.play();
                backFor(songList, song)

                document.querySelector(".songBarName").innerHTML = song
                document.querySelector(".songBarArtist").innerHTML = t

                currentAudio.addEventListener('timeupdate', () => {
                    currentTimeInMin = formatTime(currentAudio.currentTime)
                    currentDurationInMin = formatTime(currentAudio.duration)
                    ratio = currentAudio.currentTime / currentAudio.duration
                    document.querySelector(".slider").style.setProperty('width', `${ratio * 100}%`)
                    document.querySelector(".songDuration").innerHTML = `${currentTimeInMin} / ${currentDurationInMin}`

                })

                break;

            }
        }
    }
}


let clickable = document.querySelectorAll('.card');
let t = null;
let firstRunCompleted = false; // This flag will track if the first event listener has run

clickable.forEach((element) => {
    element.addEventListener('click', (event) => {
        let clickedCard = event.currentTarget; // This will always refer to the .card element
        let title = clickedCard.querySelector('.title').innerHTML;
        let root = document.documentElement
        root.style.setProperty('--left', '0%')
        t = title;
        getData(t)
        firstRunCompleted = true; // Set the flag to true when the first listener runs
    });
});

document.addEventListener('click', (event) => {
    // Check if the first event has run
    if (firstRunCompleted) {
        // Check if the clicked element or any of its parents have the .songCard class
        let clickedSong = event.target.closest('.songCard');

        if (clickedSong) {
            let clickedSongName = clickedSong.children[1].firstElementChild.innerHTML;
            getSong(clickedSongName, t)
            let root = document.documentElement
            root.style.setProperty('--left', '-100%')
            root.style.setProperty('--songBarDisplay', 'flex')
            let Btn = document.querySelector('.playBtn2');
            if (Btn) {
                Btn.src = '../SVG/pause.svg';
                Btn.classList = 'filter songBarBtn pauseBtn2';

            }
        }
    }
});

//SlideBar clicked

slideBar = document.querySelector('.slideBar')

slideBar.addEventListener('click', (e) => {
    if (e.target.classList == 'slider pointer' || e.target.classList == 'ball pointer') {
        let width = slideBar.getBoundingClientRect().width
        let xPos = e.clientX
        let lenghtClicked = (xPos - slideBar.getBoundingClientRect().x)
        document.querySelector('.slider').style.width = (lenghtClicked / width) * 100 + '%'
        currentAudio.currentTime = (lenghtClicked / width) * currentAudio.duration

    }
    else {
        let width = e.target.getBoundingClientRect().width
        let xPos = e.clientX
        let lenghtClicked = (xPos - e.target.getBoundingClientRect().x)
        document.querySelector('.slider').style.width = (lenghtClicked / width) * 100 + '%'
        currentAudio.currentTime = (lenghtClicked / width) * currentAudio.duration

    }
})


level = document.querySelector('.level');
//Mute Unmute
const volMut = () => {
    seekbar = document.querySelector('.seek');
    level.addEventListener('click', function handleClick() {
        if (level.classList.contains('vol')) {
            prev=currentAudio.volume
            level.src = '../SVG/muted_volume.svg';
            level.classList = 'mutedVol level';
            level = document.querySelector('.mutedVol');
            currentAudio.volume = 0;
            seekbar.value = 0
        } else {
            level.src = '../SVG/volume.svg';
            level.classList = 'vol level';
            level = document.querySelector('.vol');
            currentAudio.volume = prev
            seekbar.value = prev*100
        }
    });
};

volMut()

//Add Volume

volume = document.querySelector('.seek')
volume.addEventListener('change', (e) => {
    currentAudio.volume = (e.target.value) / 100
    if (currentAudio.volume === 0) {
        level.src = '../SVG/muted_volume.svg';
        level.classList = 'mutedVol level';
        level = document.querySelector('.mutedVol');
    }
    else if (currentAudio.volume != 0) {
        level.src = '../SVG/volume.svg';
        level.classList = 'vol level';
        level = document.querySelector('.vol');
    }
})



