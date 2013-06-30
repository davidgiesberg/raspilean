var printCurrentTrack = function (track) {
    if (track) {
        console.log("Currently playing:", track.name, "by",
            track.artists[0].name, "from", track.album.name);
    } else {
        console.log("No current track");
    }
};

var getAndPrintCurrentTrack = function () {
  console.log ("Getting Current Track")
  mopidy.playback.getCurrentTrack().then(
    printCurrentTrack, console.error.bind(console))
};

var mopidy = new Mopidy();             // Connect to server
mopidy.on("event:trackPlaybackStarted", function() { getAndPrintCurrentTrack() });