var context;
var audio;
var bass = 0;
var treble = 0;
function conx(url) {
	audio = new Audio();
	audio.src = url;
	audio.style.display = "none";
	audio.addEventListener("canplay",audioVerified);
	document.body.appendChild(audio);

	context = new AudioContext();
	var analyser = context.createAnalyser();

	// Wait for window.onload to fire. See crbug.com/112368
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
		trebleFilter.gain.value = treble;  // you'll need to hook this to UI too

		source.connect(bassFilter); 
		bassFilter.connect(trebleFilter); 
		trebleFilter.connect(context.destination);

	  // ...call requestAnimationFrame() and render the analyser's output to canvas.
	//}, false);
}
