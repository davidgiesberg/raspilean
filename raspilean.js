var formattedCurrentTrack = function (track) {
  return track.name + " by " + track.artists[0].name + " from " + track.album.name;
};

var getAndPrintCurrentTrack = function () {
  console.log ("Getting Current Track");
  mopidy.playback.getCurrentTrack().then( function (track) {
    console.log("Now Playing: ", formattedCurrentTrack(track));
  })
};

var updateNowPlaying = function () {
 // console.log ("Getting Current Track");
  mopidy.playback.getCurrentTrack().then( function (track) {
    document.getElementById("current_track").innerHTML = "Now Playing: " + formattedCurrentTrack(track);
  })
};

var mopidy = new Mopidy();             // Connect to server
mopidy.on("state:online", function() { updateNowPlaying() });
mopidy.on("event:trackPlaybackStarted", function() { updateNowPlaying() });
