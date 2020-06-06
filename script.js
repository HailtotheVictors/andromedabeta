window.onresize = setScroll;
var songIndex = 0;
var songQueue = [];
var currentPlaylist = 0;
var hasPlayed = false;
var playlistCovers = ["musica.png","imaginedragons.png","avicii.png","milkychance.jpg","elli.png"];
var playlistNames  = ["M&uacute;sica","Imagine Dragons","Avicii","Milky Chance","Elli"];
var progressUpdate = -1;
var playlists = [];

playlists[0] = []; //all songs
playlists[1] = [0,1,3,6,7,13,14,23,24,25,27,31,33,34,35,40,41,42,43,44,51,57,59,60,61,63]; //imagine dragons
playlists[2] = [8,17,19,23,28,30,47,48,49,55,56,62,65]; //avicii
playlists[3] = [4,11,12,16,18,45,46]; //milky chance
playlists[4] = [0,5,15,28,32,33,36,39,49,52,56]; //elli

function init() {
	setScroll();
	for (var i = 0; i < songList.length; i++){
		playlists[0].push(i);
	}
}

document.addEventListener('keyup', event => {
	if (event.code === 'Space') {
		playPause();
	}
})

//navigation
function expandNav() {
	var elem = document.getElementById("sideBar");
	var w = 60;
	var o = 0;
	var index = document.getElementsByClassName("navText");
	for (var i = 0; i < index.length; i++) {
		index[i].style.display = "block";
	}
	var animate = setInterval(function() {
		w += 5;
		o++;
		elem.style.width = w + "px";
		for (var i = 0; i < index.length; i++) {
			index[i].style.opacity = String(o / 36);
		}
		if (w == 240) {
			clearInterval(animate);
		}
	}, 5);
}

function collapseNav() {
	var elem = document.getElementById("sideBar");
	elem.style.width = "60px";
	var index = document.getElementsByClassName("navText");
	for (var i = 0; i < index.length; i++) {
		index[i].style.display = "none";
		index[i].style.opacity = "0";
	}
}

function goTo(page) {
	var index = document.getElementsByClassName("card");
	for (var i = 0; i < index.length; i++) {
		if (i == page) {
			index[i].style.display = "block";
		} else {
			index[i].style.display = "none";
		}
	}
}

//home page scrolling
function checkScroll(elem) {
	var kids = elem.children;
	kids[0].style.left = elem.scrollLeft + "px";
	kids[1].style.left = String(elem.scrollLeft + elem.offsetWidth - 50) + "px";
	if (Math.round(elem.scrollLeft) === (elem.scrollWidth - elem.offsetWidth) || Math.floor(elem.scrollLeft) === (elem.scrollWidth - elem.offsetWidth)) {
		kids[1].style.display = "none";
	} else if (elem.scrollLeft == 0) {
		kids[0].style.display = "none";
	} else {
		kids[0].style.display = "block";
		kids[1].style.display = "block";
	}
}

function setScroll() {
	var index = document.getElementsByClassName("carousel");
	for (var i = 0; i < index.length; i++) {
		var kids = index[i].children;
		var widthScroll = index[i].scrollWidth;
		var widthDisplay = index[i].offsetWidth;
		if (widthScroll == widthDisplay) {
			kids[0].style.display = "none";
			kids[1].style.display = "none";
		} else if (Math.round(index[i].scrollLeft)===(index[i].scrollWidth-index[i].offsetWidth)||Math.floor(index[i].scrollLeft)===(index[i].scrollWidth-index[i].offsetWidth)) {
			kids[1].style.display = "none";
			kids[0].style.display = "block";
		} else if (index[i].scrollLeft == 0) {
			kids[0].style.display = "none";
			kids[1].style.display = "block";
		} else {
			kids[0].style.display = "block";
			kids[1].style.display = "block";
		}
	}
}

function horizScroll(dir,elem) {
	var horizPos = elem.parentElement.scrollLeft;
	var i = 0;
	var animate = setInterval(function() {
		i++;
		elem.parentElement.scrollTo(horizPos + dir * i * 21,0);
		if (i == 12) {
			clearInterval(animate);
		}
	}, 5);
}

//song management
function addRandomSong() {
	var lim = 0;
	while (songQueue.length - songIndex < 5 && lim < 100) {
		lim++;
		var randomSong = Math.floor(Math.random() * playlists[currentPlaylist].length);
		var x = songQueue.length;
		if (randomSong !== songQueue[x-1] && randomSong !== songQueue[x-2] && randomSong !== songQueue[x-3] && randomSong !== songQueue[x-4] && randomSong !== songQueue[x-5]) {
			songQueue.push(playlists[currentPlaylist][randomSong]);
		}
	}
	lim = 0;
}

function viewPlaylist(num) {
	document.getElementById("libraryAlbum").src = "https://hailtothevictors.github.io/andromeda/playlists/" + playlistCovers[num];
	document.getElementById("libraryAlbum").setAttribute("data-list",num);
	document.getElementById("libraryAlbumName").innerHTML = decodeEntities(playlistNames[num]);
	const myNode = document.getElementById("librarySongsCont");
	while (myNode.lastElementChild) {
		myNode.removeChild(myNode.lastElementChild);
	}
	//make new rows
	var totalLength = 0;
	for (var i = 0; i < playlists[num].length; i++) {
		totalLength += songLengths[playlists[num][i]];

		var newRow = document.createElement("DIV");
		newRow.classList.add("librarySongRow");
		newRow.setAttribute("data-song",playlists[num][i]);
		
		newImage = document.createElement("img");
		newImage.src = "https://hailtothevictors.github.io/andromeda" + songList[playlists[num][i]][3];
		newRow.append(newImage);
		
		newTont = document.createElement("DIV");
		newTont.classList.add("libraryRowTont");
		
		newTitle = document.createElement("SPAN");
		newTitle.classList.add("librarySongName");
		newTitle.innerHTML = songList[playlists[num][i]][1];
		newTont.append(newTitle);
		
		newTont.append(document.createElement("BR"));
		
		newArtist = document.createElement("SPAN");
		newArtist.classList.add("libraryArtist");
		newArtist.innerHTML = songList[playlists[num][i]][2];
		newTont.append(newArtist);
		
		newRow.append(newTont);
		
		newPlay = document.createElementNS("http://www.w3.org/2000/svg","svg");
		newPlay.addEventListener("click",function() { playSongNow(this); });
		newPlay.setAttribute("viewBox","0 0 24 24");
		newPath = document.createElementNS("http://www.w3.org/2000/svg","path");
		newPath.setAttribute("d","M8,5.14V19.14L19,12.14L8,5.14Z");
		newPlay.append(newPath);
		newRow.append(newPlay);
		
		newList = document.createElementNS("http://www.w3.org/2000/svg","svg");
		newList.addEventListener("click",function() { addToQueueFromList(this); });
		newList.setAttribute("viewBox","0 0 24 24");
		newRoad = document.createElementNS("http://www.w3.org/2000/svg","path");
		newRoad.setAttribute("d","M2,16H10V14H2M18,14V10H16V14H12V16H16V20H18V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z");
		newList.append(newRoad);
		newRow.append(newList);
		
		myNode.append(newRow);
	}
	goTo(2);
	if (totalLength < 5460) {
		var mins = Math.floor(totalLength / 60);
		var secs = totalLength - mins * 60;
		document.getElementById("libraryAlbumText").innerHTML = playlists[num].length + " songs, " + mins + standardPlural(" minute",mins) + " " + secs + standardPlural(" second",mins);
	} else {
		var hours = Math.floor(totalLength / 3600);
		var mins = Math.round((totalLength - hours * 3600) / 60);
		document.getElementById("libraryAlbumText").innerHTML = playlists[num].length + " songs, " + hours +standardPlural(" hour",hours) + " " + mins + standardPlural(" minute",mins);
	}
	//document.getElementById("libraryAlbumText").innerHTML = playlists[num].length + " songs"
}

function shuffle() {
	if (Number(document.getElementById("libraryAlbum").getAttribute("data-list")) !== currentPlaylist) {
		songQueue.length = 0;
		currentPlaylist = Number(document.getElementById("libraryAlbum").getAttribute("data-list"));
		addRandomSong();
		if (hasPlayed == false) {
			conx('https://hailtothevictors.github.io/andromeda/AndromedaX/' + songList[songQueue[0]][0] + '.mp3');
			hasPlayed = true;
		} else {
			audio.src = 'https://hailtothevictors.github.io/andromeda/AndromedaX/' + songList[songQueue[0]][0] + '.mp3';
			audio.currentTime = 0;
		}
		playPause();
		updateProgress();
	}
}

function updateProgress() {
	if (progressUpdate == -1) {
		progressUpdate = setInterval(function() {
			document.getElementById("songProgress").innerHTML = toMins(Math.round(audio.currentTime)) + "/" + toMins(Math.round(audio.duration));
			document.getElementById("scrubBar").value = audio.currentTime / audio.duration;
			if (audio.currentTime == audio.duration) {
				console.log('Next Song');
				stopUpdate();
				nextSong();
			}
		}, 100);
	}
}

function nextSong() {
	songIndex++;
	audio.src = 'https://hailtothevictors.github.io/andromeda/AndromedaX/' + songList[songQueue[songIndex]][0] + '.mp3';
	audio.play();
}

function playPause() {
	var show;
	var hide;
	if (audio.paused == true) {
		audio.play();
		updateProgress();
		show = "pause";
		hide = "play";
	} else {
		audio.pause();
		stopUpdate();
		show = "play";
		hide = "pause";
	}
	var index = document.getElementsByClassName(hide);
	for (var i = 0; i < index.length; i++) {
		index[i].style.display = "none";
		document.getElementsByClassName(show).style.display = "block";
	}
}

function scrubSong() {
	var newVal = document.getElementById("scrubBar").value;
	audio.currentTime = newVal * audio.duration;
}

function stopUpdate() {
	clearInterval(progressUpdate);
	progressUpdate = -1;
}

function playSongNow(elem) {
	
}

function addToQueueFromList(elem) {
	console.log(elem.parentElement.getAttribute("data-song"));
}

function addToQueue(num) {
	songQueue.splice(songIndex + 1, 0, num);
}

//library page
function showPlaylist(num) {
	
}

//audio and eq stuff
function setEQ(elem) {
	document.getElementsByClassName("eqOutput")[elem.getAttribute("data-eqindex")].innerHTML = elem.value;
}

//resources
function standardPlural(str,num) {
	if (num == 1) {
		return str;
	} else {
		return str + "s";
	}
}

function toMins(num) {
	var secs = num % 60;
	var mins = (num - secs) / 60;
	if (secs < 10) {
		secs = "0" + secs;
	}
	return mins + ":" + secs;
}

var decodeEntities = (function() {
	var element = document.createElement('div');
	function decodeHTMLEntities (str) {
		if (str && typeof str === 'string') {
			str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
			str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
			element.innerHTML = str;
			str = element.textContent;
			element.textContent = '';
		}
		return str;
	}
	return decodeHTMLEntities;
})();
//decodeEntities("&amp;")
