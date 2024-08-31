


function isVisibleInViewport(elem) {
    var y = elem.offsetTop;
    var height = elem.offsetHeight;

    while (elem = elem.offsetParent)
        y += elem.offsetTop;

    var maxHeight = y + height;
    var isVisible = (y < (window.pageYOffset + window.innerHeight)) && (maxHeight >= window.pageYOffset);
    return isVisible;

}

function initVideoPlayer() {
    // This is the bare minimum JavaScript. You can opt to pass no arguments to setup.
    const player = new Plyr('#video-player');
    // Expose
    window.player = player;
    const videoPlayerEl = document.querySelector('#video-player');

    $(window).scroll(function () {
        const isVisible = isVisibleInViewport(videoPlayerEl);
        if (isVisible && !player.playing) {
            player.play();
        }
        if (!isVisible && player.playing) {
            player.pause();
        }
    });
}
function initTestimonialBoxedSection() {
    $('.testimonials-flexslider').flexslider({
        animation: "slide", //String: Select your animation type, "fade" or "slide"
        easing: "swing", //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
        direction: "horizontal", //String: Select the sliding direction, "horizontal" or "vertical"
        reverse: false, //{NEW} Boolean: Reverse the animation direction
        animationLoop: true, //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
        smoothHeight: false, //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode  
        startAt: 0, //Integer: The slide that the slider should start on. Array notation (0 = first slide)
        slideshow: true,
        // Usability features
        pauseOnAction: true, //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
        pauseOnHover: false, //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
        useCSS: true, //{NEW} Boolean: Slider will use CSS3 transitions if available
        touch: true, //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
        // Primary Controls
        itemWidth: 350,
    });
}

function initAnimationSections() {
    //CALL TO ACTION ROW ANIMATIONS
    $('.full-banner-cta-section .btn').addClass('u-fade-type-down js-scroll-trigger');
    $('.talk-to-sales-banner-section .btn').addClass('u-fade-type-down js-scroll-trigger');

    //FULL BANNER CTA ANIMATIONS
    $('.full-banner-cta-section h2').addClass('u-fade-type-static js-scroll-trigger');

    //TESTIMONIALS BOXED ANIMATIONS
    $('.testimonials-boxed-section').addClass('u-fade-type-static js-scroll-trigger');
}

//////////////////////////////////////////
$(document).ready(function () {
    initVideoPlayer();
    initTestimonialBoxedSection();
    initAnimationSections();
});