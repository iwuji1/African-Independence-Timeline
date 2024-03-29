/* Main navigation */
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)


// // Smooth Snap between full-screen sections
// gsap.utils.toArray(".full-screen").forEach((panel, i) => {
//   ScrollTrigger.create({
//     trigger: panel,
//     start: "top top",
//     pin: true,
//     pinSpacing: false
//   });
// });
//
//
// ScrollTrigger.create({
//   snap: 1 / 16 // snap whole page to the closest section!
// });

//Scroll trigger for chart animation
gsap.from("#bar_viz", {
  scrollTrigger: {
    trigger: ".viz-content",
    start: "top top"
  },
  x:-100,
  opacity: 0,
  duration: 0.3,
  ease: "expo"
});

gsap.from(
  ".map-content",{
    scrollTrigger: {
      trigger: "#map",
      scrub:true,
      pin:true,
      start: "top top",
      end: "+=10%"
    },
    y: 300,
    ease: "none",
    duration:3
  });



ScrollTrigger.create({
  trigger: "#info1",
  endTrigger: "#step-4",
  start: "center center",
  end: "center center",
  pin: true,
  pinSpacing: false,
});

//
// console.log(check)

// gsap.defaults({overwrite: 'auto'});
//
// gsap.set(".left-content > *", {xPercent: -50, yPercent: -50});
//
// // Set up our scroll trigger for timeline scrolly
// const ST = ScrollTrigger.create({
//   trigger: ".content-container",
//   start: "top top",
//   end: "bottom bottom",
//   onUpdate: getCurrentSection,
//   pin: ".left-content"
// });
//
// const contentMarkers = gsap.utils.toArray(".contentMarker");
//
// let check;
// let status;
// let stat2;
// let stat3;
//
// // Set up our content behaviors
// contentMarkers.forEach(marker => {
//   marker.content = document.querySelector(`#${marker.dataset.markerContent}`);
//   check = marker.content;
//
//   if(marker.content.tagName === "ARTICLE") {
//     gsap.set(marker.content, {transformOrigin: "center"});
//
//     marker.content.enter = function() {
//       gsap.fromTo(marker.content, {autoAlpha: 0, rotateY: -30}, {duration: 0.3, autoAlpha: 1, rotateY: 0})
//       status = "yes";
//     }
//   } else if(marker.content.tagName === "BLOCKQUOTE") {
//     gsap.set(marker.content, {transformOrigin: "left center"});
//
//     marker.content.enter = function() {
//       gsap.fromTo(marker.content, {autoAlpha: 0, rotateY: 50}, {duration: 0.3, autoAlpha: 1, rotateY: 0});
//     }
//   }
//
//   marker.content.leave = function() {
//     gsap.to(marker.content, {duration: 0.1, autoAlpha: 0});
//     status = "no";
//   }
//
// });
//
// // Handle the updated position
// let lastContent;
// function getCurrentSection() {
//   let newContent;
//   const currScroll = scrollY;
//
//   // Find the current section
//   contentMarkers.forEach(marker => {
//     if(currScroll > marker.offsetTop) {
//       newContent = marker.content;
//       stat2 = newContent;
//     }
//   });
//
//   // If the current section is different than that last, animate in
// //   if(newContent
// //   && (lastContent == null
// //      || !newContent.isSameNode(lastContent))) {
// //     // Fade out last section
// //
// //     if(lastContent) {
// //       lastContent.leave();
// //     }
// //
// //     // Animate in new section
// //     newContent.enter();
// //
// //     lastContent = newContent;
// //   }
// //
// // }
//
// // const media = window.matchMedia("screen and (max-width: 600px)");
// // ScrollTrigger.addEventListener("refreshInit", checkSTState);
// // checkSTState();
// //
// // function checkSTState() {
// //   if(media.matches) {
// //     ST.disable();
// //   } else {
// //     ST.enable();
// //   }
// // }
//
// console.log(check);
