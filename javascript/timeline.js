/* Main navigation */
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
//Smooth Snap between full-screen sections
// gsap.utils.toArray(".full-screen").forEach((panel, i) => {
//   ScrollTrigger.create({
//     trigger: panel,
//     start: "top top",
//     pin: true,
//     pinSpacing: false
//   });
// });


// ScrollTrigger.create({
//   snap: 1 / 16 // snap whole page to the closest section!
// });

//Scroll trigger for chart animation
gsap.from("#bar_viz", {
  scrollTrigger: {
    trigger: ".viz-content",
    start: "top top",
    end: "bottom",
  },

  x:-100,
  opacity: 0,
  duration: 0.5,
  ease: "power1.out"
});

gsap.defaults({overwrite: 'auto'});

gsap.set(".left-content > *", {xPercent: -50, yPercent: -50});

// Set up our scroll trigger for timeline scrolly
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

  if(marker.content.tagName === "ARTICLE") {
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
