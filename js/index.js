function initAnimationSections() {
    //CALL TO ACTION ROW ANIMATIONS
    $('.full-banner-cta-section .btn').addClass('u-fade-type-down js-scroll-trigger');
    $('.talk-to-sales-banner-section .btn').addClass('u-fade-type-down js-scroll-trigger');

    //FULL BANNER CTA ANIMATIONS
    $('.full-banner-cta-section h2').addClass('u-fade-type-static js-scroll-trigger');

    //TESTIMONIALS BOXED ANIMATIONS
    $('.testimonials-boxed-section').addClass('u-fade-type-static js-scroll-trigger');
}

function initTestimonialsSlider() {
    const itemCount = getGridSize();
    $('.testimonials-flexslider').flexslider({
        animation: "slide",
        // easing: "swing",
        direction: "horizontal",
        reverse: false,
        animationLoop: true,
        smoothHeight: false,
        startAt: 0,
        slideshow: true,
        pauseOnAction: true,
        pauseOnHover: false,
        useCSS: true,
        touch: true,
        itemWidth: 400,
        minItems: itemCount,
        maxItems: itemCount
    });
}
// store the slider in a local variable
var $window = $(window),
    flexslider = { vars: {} };

// tiny helper function to add breakpoints
function getGridSize() {
    if (window.innerWidth < 500) { return 1; }
    if (window.innerWidth < 1024) { return 2; }
    return 3;
}

//////////////////////////////////////////
$(function () {
    setTimeout(() => {
        initAnimationSections();
        initTestimonialsSlider(); 
        $window.resize(function () {
            var gridSize = getGridSize();
            flexslider.vars.minItems = gridSize;
            flexslider.vars.maxItems = gridSize;
        });
    }, 500);
});