var context;
var audio;
var playButton;
var audioElement;
var bass = 10;
var treble = 5;
function conx() {
audio = new Audio();
	audio.src = 'https://hailtothevictors.github.io/andromeda/AndromedaX/bustthistown.mp3';
	document.body.appendChild(audio);
        //create context
	context = new AudioContext();
	var analyser = context.createAnalyser();
	
	//window.addEventListener('load', function(e) {
	  // Our <audio> element will be the audio source.
		var source = context.createMediaElementSource(audio);
		source.connect(analyser);
		analyser.connect(context.destination);
		gainNode = context.createGain();
		//??
		bassFilter = context.createBiquadFilter();
		bassFilter.type = "lowshelf"; 
		bassFilter.frequency.value = 200;  // switches to 400 in UI
		bassFilter.gain.value = bass;  // you'll need to hook this to UI too

		trebleFilter = context.createBiquadFilter();
		trebleFilter.type = "highshelf"; 
		trebleFilter.frequency.value = 2000;  // switches to 6000 in UI
		console.log(trebleFilter.frequency.value);
		trebleFilter.gain.value = treble;  // you'll need to hook this to UI too

		source.connect(bassFilter); 
		bassFilter.connect(trebleFilter); 
		trebleFilter.connect(context.destination);

	  // ...call requestAnimationFrame() and render the analyser's output to canvas.
	//}, false);
}
