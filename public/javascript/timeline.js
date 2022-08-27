/* Main navigation */
// let panelsSection = document.querySelector("#panels"),
// 	panelsContainer = document.querySelector("#panels-container"),
// 	tween;
// document.querySelectorAll(".anchor").forEach(anchor => {
// 	anchor.addEventListener("click", function(e) {
// 		e.preventDefault();
// 		let targetElem = document.querySelector(e.target.getAttribute("href")),
// 			y = targetElem;
// 		if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
// 			let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
// 				totalMovement = (panels.length - 1) * targetElem.offsetWidth;
// 			y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
// 		}
// 		gsap.to(window, {
// 			scrollTo: {
// 				y: y,
// 				autoKill: false
// 			},
// 			duration: 1
// 		});
// 	});
// });
//
// /* Panels */
// const panels = gsap.utils.toArray("#panels-container .panel");
// tween = gsap.to(panels, {
// 	xPercent: -100 * ( panels.length - 1 ),
// 	ease: "none",
// 	scrollTrigger: {
// 		trigger: "#panels-container",
// 		pin: true,
// 		start: "top top",
// 		scrub: 1,
// 		snap: {
// 			snapTo: 1 / (panels.length - 1),
// 			inertia: false,
// 			duration: {min: 0.1, max: 0.1}
// 		},
// 		end: () =>  "+=" + (panelsContainer.offsetWidth - innerWidth)
// 	}
// });

// Set up our scroll trigger
const ST = ScrollTrigger.create({
  trigger: ".content-container",
  start: "top top",
  end: "bottom bottom",
  onUpdate: getCurrentSection,
  pin: ".left-content"
});

const contentMarkers = gsap.utils.toArray(".contentMarker");

// Set up our content behaviors
contentMarkers.forEach(marker => {
  marker.content = document.querySelector(`#${marker.dataset.markerContent}`);

  if(marker.content.tagName === "DIV") {
    gsap.set(marker.content, {transformOrigin: "center"});

    marker.content.enter = function() {
      gsap.fromTo(marker.content, {autoAlpha: 0, rotateY: -30}, {duration: 0.3, autoAlpha: 1, rotateY: 0});
    }
  } else if(marker.content.tagName === "BLOCKQUOTE") {
    gsap.set(marker.content, {transformOrigin: "left center"});

    marker.content.enter = function() {
      gsap.fromTo(marker.content, {autoAlpha: 0, rotateY: 50}, {duration: 0.3, autoAlpha: 1, rotateY: 0});
    }
  }

  marker.content.leave = function() {
    gsap.to(marker.content, {duration: 0.1, autoAlpha: 0});
  }

});

// Handle the updated position
let lastContent;
function getCurrentSection() {
  let newContent;
  const currScroll = scrollY;

  // Find the current section
  contentMarkers.forEach(marker => {
    if(currScroll > marker.offsetTop) {
      newContent = marker.content;
    }
  });

  // If the current section is different than that last, animate in
  if(newContent
  && (lastContent == null
     || !newContent.isSameNode(lastContent))) {
    // Fade out last section
    if(lastContent) {
      lastContent.leave();
    }

    // Animate in new section
    newContent.enter();

    lastContent = newContent;
  }

}

const media = window.matchMedia("screen and (max-width: 600px)");
ScrollTrigger.addEventListener("refreshInit", checkSTState);
checkSTState();

function checkSTState() {
  if(media.matches) {
    ST.disable();
  } else {
    ST.enable();
  }
}
