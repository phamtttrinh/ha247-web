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
$(function () {
    setTimeout(() => {
        initAnimationSections();
    }, 200);
});