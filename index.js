/* eslint-env browser, es6 */
/* global require */
require("headjs/dist/1.0.0/head.load.min.js");
require("./index.scss");
const Reveal = require("reveal.js");
window.Reveal = Reveal;
const tmpl = require("./index.pug");

const hljs = require("highlight.js");
hljs.initHighlightingOnLoad();

document.body.innerHTML = tmpl();
window.onload = run;

function run() {
  Reveal.initialize({
    controls: true,
    controlsTutorial: false,
    // Determines where controls appear, "edges" or "bottom-right"
    controlsLayout: "bottom-right",
    controlsBackArrows: "faded",
    progress: true,
    defaultTiming: 120,
    slideNumber: false,
    // Push each slide change to the browser history
    history: true,
    // Enable keyboard shortcuts for navigation
    keyboard: true,
    // Enable the slide overview mode
    overview: true,
    // Vertical centering of slides
    center: true,
    // Enables touch navigation on devices with touch input
    touch: true,
    loop: false,
    // Randomizes the order of slides each time the presentation loads
    shuffle: false,
    // Turns fragments on and off globally
    fragments: true,
    // Flags if the presentation is running in an embedded mode,
    // i.e. contained within a limited portion of the screen
    embedded: false,
    // Flags if we should show a help overlay when the questionmark
    // key is pressed
    help: true,
    // Flags if speaker notes should be visible to all viewers
    showNotes: false,
    // Global override for autoplaying embedded media (video/audio/iframe)
    // - null: Media will only autoplay if data-autoplay is present
    // - true: All media will autoplay, regardless of individual setting
    // - false: No media will autoplay, regardless of individual setting
    autoPlayMedia: null,
    // Number of milliseconds between automatically proceeding to the
    // next slide, disabled when set to 0, this value can be overwritten
    // by using a data-autoslide attribute on your slides
    autoSlide: 0,
    // Stop auto-sliding after user input
    autoSlideStoppable: true,
    // Use this method for navigation when auto-sliding
    autoSlideMethod: Reveal.navigateNext,
    // Enable slide navigation via mouse wheel
    mouseWheel: true,
    // Hides the address bar on mobile devices
    hideAddressBar: true,
    // Opens links in an iframe preview overlay
    previewLinks: false,
    // Transition style
    transition: "fade", // none/fade/slide/convex/concave/zoom
    // Transition speed
    transitionSpeed: "fast", // default/fast/slow
    // Transition style for full page slide backgrounds
    backgroundTransition: "fade", // none/fade/slide/convex/concave/zoom
    // Number of slides away from the current that are visible
    viewDistance: 3,
    // The display mode that will be used to show slides
    display: "block",
    dependencies: [{ src: "js/notes-plugin/notes.js", async: true }]
  });
}
