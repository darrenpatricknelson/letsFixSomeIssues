// GLOBAL VARIABLES
// Session varaibles
var containerSession = document.getElementById('containerSession');
containerSession.style.visibility = 'hidden';
// => row in container
var rowSession = document.getElementById('sessionRow');

// local variables
var containerLocal = document.getElementById('containerLocal');
containerLocal.style.visibility = 'hidden';
// => row in container
var rowLocal = document.getElementById('localRow');

// CREATE MUSIC ARRAY
var musicArraySession = [];
var musicArrayLocal = [];

// ONLOAD FUNCTION
function storageCheck() {
  // check for session storage
  if (sessionStorage.getItem('hasCodeRunBefore') === null) {
    //   create session variables
    sessionStorage.setItem('sessionMusic', JSON.stringify(musicArraySession));
    sessionStorage.setItem('hasCodeRunBefore', true);
  } else {
    musicArraySession = JSON.parse(sessionStorage.getItem('sessionMusic'));
    displayMusicSession();

    let i = 0;
    for (music in musicArraySession) {
      i = i + 1;
    }

    if (i > 0) {
      containerSession.style.visibility = 'visible';
    }
  }

  // check for local storage
  if (localStorage.getItem('hasCodeRunBefore') === null) {
    //   create session variables
    localStorage.setItem('localMusic', JSON.stringify(musicArrayLocal));
    localStorage.setItem('hasCodeRunBefore', true);
  } else {
    musicArrayLocal = JSON.parse(localStorage.getItem('localMusic'));
    displayMusicLocal();

    let i = 0;
    for (music in musicArrayLocal) {
      i = i + 1;
    }

    if (i > 0) {
      containerLocal.style.visibility = 'visible';
    }
  }
}

// constructor function
function Music(artist, song, album, genre) {
  this.artist = artist;
  this.song = song;
  this.album = album;
  this.genre = genre;
}

// add music to the session storage
function addNewMusicSession() {
  musicArraySession = JSON.parse(sessionStorage.getItem('sessionMusic'));

  let newMusic = new Music(
    document.getElementById('artistTitle').value,
    document.getElementById('songTitle').value,
    document.getElementById('albumTitle').value,
    document.getElementById('genreTitle').value
  );
  musicArraySession.push(newMusic);
  sessionStorage.setItem('sessionMusic', JSON.stringify(musicArraySession));
}

// add music to the local storage
function addNewMusicLocal() {
  musicArrayLocal = JSON.parse(localStorage.getItem('localMusic'));

  let newMusic = new Music(
    document.getElementById('artistTitle').value,
    document.getElementById('songTitle').value,
    document.getElementById('albumTitle').value,
    document.getElementById('genreTitle').value
  );
  musicArrayLocal.push(newMusic);
  localStorage.setItem('localMusic', JSON.stringify(musicArrayLocal));
}

// Display locally saved music
function displayMusicSession() {
  // parse the JSON object
  musicArraySession = JSON.parse(sessionStorage.getItem('sessionMusic'));

  for (let music in musicArraySession) {
    var pararaph = document.createElement('p');
    pararaph.classList.add('musicOutput');

    pararaph.innerHTML +=
      '<span>Song name</span>: ' +
      musicArraySession[music].song +
      '<br> <span>Artist Name</span>: ' +
      musicArraySession[music].artist +
      '<br> <span>Album name</span>: ' +
      musicArraySession[music].album +
      '<br> <span>Genre name</span>: ' +
      musicArraySession[music].genre +
      '<br><br>';

    //   add the delete button
    let buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = 'Delete Entry';
    buttonDelete.onclick = function () {
      console.log(musicArraySession[music]);
      delete musicArraySession[music];

      rowSession.removeChild(pararaph).removeChild(buttonDelete);
    };

    rowSession.appendChild(pararaph).appendChild(buttonDelete);
    containerSession.appendChild(rowSession);
  }
}

// Display locally saved music
function displayMusicLocal() {
  // parse the JSON object
  musicArrayLocal = JSON.parse(localStorage.getItem('localMusic'));

  for (let music in musicArrayLocal) {
    var pararaph = document.createElement('p');
    pararaph.classList.add('musicOutput');

    pararaph.innerHTML +=
      '<span>Song name</span>: ' +
      musicArrayLocal[music].song +
      '<br> <span>Artist Name</span>: ' +
      musicArrayLocal[music].artist +
      '<br> <span>Album name</span>: ' +
      musicArrayLocal[music].album +
      '<br> <span>Genre name</span>: ' +
      musicArrayLocal[music].genre;

    //   add the delete button
    // let buttonDelete = document.createElement('button');
    // buttonDelete.innerHTML = 'Delete Entry';
    // buttonDelete.onclick = deletLocalStorage();

    rowLocal.appendChild(pararaph);
    containerLocal.appendChild(rowLocal);
  }
}
