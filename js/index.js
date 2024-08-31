

function scrollFunction() {
    if ((document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) && (document.getElementById("full-screen-menu-container").style.opacity == 0)) {
        document.getElementById("navbar").style.background = 'rgba(1, 90, 70, 1)';
        document.getElementById("navbar").style.color = '#fff';
        document.getElementById("logo").src = "./images/ha247-logo-white.png";
        // document.getElementById("blog-post-title").style.opacity = 50 / document.documentElement.scrollTop;
    } else {
        document.getElementById("navbar").style.background = 'rgba(1, 90, 70, 0)';
        document.getElementById("navbar").style.color = 'rgba(1, 90, 70, 1)';
        document.getElementById("logo").src = "./images/ha247-logo.png";
        // document.getElementById("blog-post-title").style.opacity = 1;
    }
}


function hamburgerMenu(x) {
    x.classList.toggle("change");

    var menu = $('#full-screen-menu-container');
    var navbarMiddle = $('#navbar-middle');

    if (menu.css('opacity') === '0') {
        menu.css({
            'height': '100vh',
            'opacity': '1'
        });
        navbarMiddle.css({'color': '#fff'});

        document.getElementById("logo").src = "./images/ha247-logo-white.png";
    } else {
        menu.css({
            'height': '0',
            'opacity': '0'
        });

        if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
            document.getElementById("logo").src = "./images/ha247-logo-white.png";
        } else {
            document.getElementById("logo").src = "./images/ha247-logo.png";
        }
    }

    /* Remove navy background from menu if present */
    if ((document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) && (document.getElementById("full-screen-menu-container").style.opacity == 0)) {
        document.getElementById("navbar").style.background = 'rgba(1, 90, 70, 1)';
    } else {
        document.getElementById("navbar").style.background = 'rgba(1, 90, 70, 0)';
    }

}

function fullScreenMenuLinkMouseOver(x) {
    x.classList.toggle("underline");
}

function fullScreenMenuLinkMouseOut(x) {
    x.classList.toggle("underline");
}

function initHeader() {
    // When the user scrolls down 1px from the top of the document, change the navbar's background opacity and the swap the logo
    // Fade the post title as the user scrolls
    window.onscroll = function () { scrollFunction() };

    // Set year in fullscreen menu
    const d = new Date();
    let year = d.getFullYear();
    document.getElementById("current-year").innerHTML = year;
    $("body").on("click", "#close-btn", function () {
        $("#popup-overlay-div").remove();
        $("#hire-belay-pop").remove();
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

    //NEW TILES ANIMATION
    //Event Listener required to get this one to work
    $('#tiles_title .btn').click(function (event) {
        var $btn = $(event.target);
        var $btnParent = $btn.parent();
        var $parent = $btnParent.parent();

        var parent_id = $parent.attr('id');
        var parent_idNumber = parent_id.split('-')[1]

        var $collapsedDiv = $(`#collapse-${parent_idNumber}`);

        $($collapsedDiv).addClass('u-slide-up delay-8 js-scroll-trigger');
    });

    //FOUR UP BOXED ANIMATIONS
    $('.four-up-boxed h2').addClass('u-fade-type-static js-scroll-trigger');
    $('.four-up-boxed .boxed-column:nth-of-type(1)').addClass('u-fade-type-left delay-1 js-scroll-trigger');
    $('.four-up-boxed .boxed-column:nth-of-type(2)').addClass('u-fade-type-left delay-2 js-scroll-trigger');
    $('.four-up-boxed .boxed-column:nth-of-type(3)').addClass('u-fade-type-left delay-3 js-scroll-trigger');
    $('.four-up-boxed .boxed-column:nth-of-type(4)').addClass('u-fade-type-left delay-4 js-scroll-trigger');

    //CALL TO ACTION ROW ANIMATIONS
    $('.call-to-action-row').addClass('u-fade-type-down js-scroll-trigger');
    $('.full-banner-cta .btn').addClass('u-fade-type-down js-scroll-trigger');
    $('.talk-to-sales-banner .btn').addClass('u-fade-type-down js-scroll-trigger');

    //FULL BANNER LINKED ANIMATIONS
    $('.full-banner-linked .row').addClass('u-fade-type-static js-scroll-trigger');

    //FULL BANNER CTA ANIMATIONS
    $('.full-banner-cta h2').addClass('u-fade-type-static js-scroll-trigger');
    $('.full-banner-cta .banner-steps-content').addClass('u-fade-type-static js-scroll-trigger');

    //TESTIMONIALS BOXED ANIMATIONS
    $('.testimonials-boxed').addClass('u-fade-type-static js-scroll-trigger');
}

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

function scrollAnimation() {
    $(window).scroll(function () {
        $(".js-scroll-trigger").each(function () {
            let position = $(this).offset().top
                , scroll = $(window).scrollTop()
                , windowHeight = $(window).height();
            if (scroll > position - windowHeight + 80) {
                $(this).addClass('is-active');
            }
        });
    });
}

//////////////////////////////////////////
$(document).ready(function () {
    initHeader();

    initVideoPlayer();
    initTestimonialBoxedSection();
    initAnimationSections();

    // Make anchor links scroll
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
});

$(function () {
    $(document).ready(function () {
        $(".js-window-trigger").each(function () {
            $(this).addClass('is-active');
        });
    });
});
$(function () {
    if ($('.js-scroll-trigger').length) {
        scrollAnimation();
    }
    $(window).trigger('scroll');
});