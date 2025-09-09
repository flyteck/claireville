//*********************** global variables

var main = document.getElementById("main");
const windowsHeight = window.innerHeight;

//*********************** /global variables
const bottom = main.getBoundingClientRect().bottom;

if (windowsHeight >= bottom) {
	main.classList.add("top");
} 

//*********************** scroll for the main body to fade in/out
function menuScroll() {
	var main = document.getElementById("main"); //this has to be defined here idk why

	if (!main.classList.contains("scrolling")) {
	    //If the user is not at the top of the page;
	    if (window.scrollY !== 0) {
	      main.classList.add("scrolled");
	    } 

	    //If the user is at the top of the page;
	    if (window.scrollY === 0) {
	      main.classList.remove("scrolled");
	    }
	}
}

addEventListener("scrollend", menuScroll);
addEventListener("touchend", menuScroll);
//*********************** /scroll for the main body to fade in/out

//** Auto scroll PLEASE **//

var topEdge = main.getBoundingClientRect().top;

function autoScroll() {
	var topEdge = main.getBoundingClientRect().top;
	var scrollTo = document.getElementById("scroll-to");

	if ((topEdge < 200) && (topEdge !== -0.5) && (topEdge !== 0)) {
		//Check scroll direction;

		if(this.oldScroll < this.scrollY) {
			//scrolling down
			scrollTo.scrollIntoView({ behavior: "smooth", block: "start" });
			main.classList.add("scrolling");
			classList.add("top");
		}

		//set previous scroll location
		this.oldScroll = this.scrollY;
		}
}

addEventListener("touchend", autoScroll);
addEventListener("scrollend", autoScroll);
addEventListener("resize", autoScroll);

//** /Auto scroll PLEASE **//

//*********************** make the main body scroll inside itself when it's in the main frame
 function bodyLock() {
	var main = document.getElementById("main"); //this has to be defined here idk why
	const bottom = main.getBoundingClientRect().bottom;
	  
	if (windowsHeight >= bottom) {
	   main.classList.add("top");
	   main.classList.remove("scrolling");
	} else {
	  	if(main.classList.contains("top")) {
	    	main.classList.remove("top");
		}
	}
}

addEventListener("scroll", bodyLock);
addEventListener("touchstart", bodyLock);
//*********************** /make the main body scroll inside itself when it's in the main frame


//after short delay, add smooth scroll to the body to prevent links w ids from jumping on load
 document.addEventListener("DOMContentLoaded", function(e) {
    setTimeout(() => {
    	document.documentElement.style.scrollBehavior = "smooth";
    }, "200");
 });


 //*********************** Menu

 var menuButton = document.getElementById("menu-button");

 if (menuButton != null) {
 	menuButton.addEventListener("click", menuToggle);
 }

 function menuToggle() {

 	var container = this.parentNode

 	if (container.classList.contains("open")) {
 		container.classList.remove("open");
 	} else {
 		container.classList.add("open");
 	}
 }


 //********************************************** MODAL

 //Event listeners for all keypress functions

document.addEventListener("keydown", keyPress);

function keyPress (e) {
  if(e.key === "Escape") {
    escapeClose();
  }

  if(e.key === "ArrowLeft") {
    tabLeft();
  }

  if(e.key === "ArrowRight") {
    tabRight();
  }
}

//Actual modal functions

var galleryContainer = document.getElementById("gallery-container");
var image = document.querySelectorAll(".item");

//add listeners to all of the icons
for (i = 0; i < image.length; i++) {
  image[i].addEventListener('click', modalOpen);
}

function modalOpen() {
	if(!event.target.classList.contains("next") && !event.target.classList.contains("previous")) {
		if(!this.parentNode.classList.contains("open")) {
	    	this.parentNode.classList.add("open");
	    	this.closest(".item").classList.add("open");
	  	} else {
	    	this.parentNode.classList.remove("open");
	    	this.closest(".item").classList.remove("open");
	  	}
	}
}

//This lets you close them with escape

function escapeClose (e) {
    var openModal = document.querySelectorAll(".open");
    if(openModal.length !== 0) {
    	for (i = 0; i < openModal.length; i++) {
		  openModal[i].classList.remove("open");
		}
    }
}

//And THIS lets you close them with an x button inside
var closeButtons = document.querySelectorAll(".close-button");

for (i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", buttonClose);
}

function buttonClose() {
  var openModal = this.closest(".open");
  openModal.classList.remove("open");
  galleryContainer.classList.remove("open");

}

//This lets you tab left & right
var image = document.querySelectorAll(".previous");
//add listeners to all of the icons
for (i = 0; i < image.length; i++) {
  image[i].addEventListener('click', tabLeft);
}

//This lets all display images open to a modal view
var image = document.querySelectorAll(".next");
//add listeners to all of the icons
for (i = 0; i < image.length; i++) {
  image[i].addEventListener('click', tabRight);
}

function tabLeft() {
  var openModal = document.querySelectorAll(".item.open");
  if(openModal.length > 0) {
    openModal[0].classList.remove("open");

    if(openModal[0].previousElementSibling !== null && openModal[0].previousElementSibling.classList.contains("item")) {
      openModal[0].previousElementSibling.classList.add("open");
      galleryContainer.classList.add("open");
    } else {
      openModal[0].closest("#gallery-container").scrollIntoView();
      galleryContainer.classList.remove("open");
    }
  }
}

function tabRight() {
  var openModal = document.querySelectorAll(".item.open");
  if(openModal.length > 0) {
    openModal[0].classList.remove("open");

    if(openModal[0].nextElementSibling !== null && openModal[0].nextElementSibling.classList.contains("item")) {
      openModal[0].nextElementSibling.classList.add("open");
    } else {
      openModal[0].closest("#gallery-container").scrollIntoView({block: "end"});
      galleryContainer.classList.remove("open");
    }
  }
}