window.onresize = setScroll;
function init() {
	setScroll();
}

var songIndex = 0;
var songQueue = [];
var currentPlaylist = 0;
var hasPlayed = false;
var playlistCovers = ["musica.png","imaginedragons.png","avicii.png","milkychance.jpg","elli.png"];
var playlistNames  = ["M&uacute;sica","Imagine Dragons","Avicii","Milky Chance","Elli"];
var playlists = [];
playlists[0] = songList.slice(0); //all songs
playlists[1] = [0,5,6,8,9,10,11,12,15,23,27,29,30,31,32,37,40,41,42,43,45,47,48]; //imagine dragons
playlists[2] = [1,4,7,16,17,26,28]; //milky chance
playlists[3] = [3,11,19,22,24,33,35]; //avicii
playlists[4] = [0,2,9,13,14,19,22,33,34,39,44]; //elli

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
	while (songQueue.length - songIndex < 5 && lim < 10) {
		lim++;
		var randomSong = Math.floor(Math.random() * playlists[currentPlaylist].length);
		if (randomSong !== songQueue[-1] && randomSong !== songQueue[-2] && randomSong !== songQueue[-3] && randomSong !== songQueue[-4] && randomSong !== songQueue[-5]) {
			songQueue.push(playlist[currentPlaylist][randomSong]);
		}
	}
	lim = 0;
}

function viewPlaylist(num) {
	document.getElementById("libraryAlbum").src = "https://hailtothevictors.github.io/andromeda/playlists/" + playlistCovers[num];
	document.getElementById("libraryAlbumName").innerHTML = decodeEntities(playlistNames[num]);
	goTo(2);
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

//playlist management
function shuffle() {
	
}

//audio and eq stuff
function setEQ(elem) {
	document.getElementsByClassName("eqOutput")[elem.getAttribute("data-eqindex")].innerHTML = elem.value;
}

//resources
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
	//console.log(str);
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
