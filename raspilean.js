function formattedCurrentTrack(track) {
  return track.name + " by " + track.artists[0].name + " from " + track.album.name;
}

function updateNowPlaying() {
  mopidy.playback.getCurrentTrack().then( function (track) {
    document.getElementById("current_track").innerHTML = formattedCurrentTrack(track);
  });
}

function updatePlayerStatus(status) {
  document.getElementById("player_status").innerHTML = capitalizeFirstLetter(status);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function initDisplay(){
  mopidy.playback.getState().then( function (state) { updatePlayerStatus(state); });
  updateNowPlaying();
}

// Connect to server
var mopidy = new Mopidy();

// Mopidy monitoring events
mopidy.on("state:online", function() { initDisplay(); });
mopidy.on("event:trackPlaybackStarted", function() { updateNowPlaying(); });
mopidy.on("event:playbackStateChanged", function(states) { updatePlayerStatus(states.new_state); });

window.onload = function() {

  var play = document.getElementById("play");
  var pause = document.getElementById("pause");
  var previous = document.getElementById("previous");
  var next = document.getElementById("next");

  play.onclick = function() {
    mopidy.playback.play();
    return false;
  };
  pause.onclick = function() {
    mopidy.playback.pause();
    return false;
  };
  previous.onclick = function() {
    mopidy.playback.previous();
    return false;
  };
  next.onclick = function() {
    mopidy.playback.next();
    return false;
  };
};