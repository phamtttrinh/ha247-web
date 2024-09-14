function initAnimationSections() {
    //CALL TO ACTION ROW ANIMATIONS
    $('.full-banner-cta-section .btn').addClass('u-fade-type-down js-scroll-trigger');
    $('.talk-to-sales-banner-section .btn').addClass('u-fade-type-down js-scroll-trigger');

    //FULL BANNER CTA ANIMATIONS
    $('.full-banner-cta-section h2').addClass('u-fade-type-static js-scroll-trigger');

    //TESTIMONIALS BOXED ANIMATIONS
    $('.testimonials-boxed-section').addClass('u-fade-type-static js-scroll-trigger');
}

function initCustomerSlider() {
    $('.flexslider').flexslider({
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
        itemWidth: 400,
    });
}

//////////////////////////////////////////
$(function () {
    setTimeout(() => {
        initAnimationSections();
        initCustomerSlider();
    }, 200);
});