
var styleConfig = {

    compayLogoWhite: "./images/logo/ha247-logo-white.png",
    companyLogo: "./images/logo/ha247-logo.png",

    darkGreenColor: 'rgba(1, 90, 70, 1)',
    darkGreenTransparent: 'rgba(1, 90, 70, 0)',
    whiteColor: '#fff'
};

function scrollFunction() {
    var fullMenuEl = document.getElementById("full-screen-menu-container");
    var isShowNormalMenu = fullMenuEl.style.opacity === '0';
    if (!isShowNormalMenu || (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1)) {
        document.getElementById("navbar").style.background = styleConfig.darkGreenColor;
        document.getElementById("navbar").style.color = styleConfig.whiteColor;
        document.getElementById("logo").src = styleConfig.compayLogoWhite;
        document.getElementById("hamburger").classList.remove("hover");
    } else {
        document.getElementById("navbar").style.background = styleConfig.darkGreenTransparent;
        document.getElementById("navbar").style.color = styleConfig.darkGreenColor;
        document.getElementById("logo").src = styleConfig.companyLogo;
        document.getElementById("hamburger").classList.add("hover");
    }


    scrollShowFloatingScrollTop();
    scrollAutoPlayVideo();
}

function scrollShowFloatingScrollTop() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        $('#floating-action-scroll-top').addClass('show');
    } else {
        $('#floating-action-scroll-top').removeClass('show');
    }
    $('#floating-action-scroll-top').on('click', function () {
        document.documentElement.scrollTop = 0;
    });
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

function scrollAutoPlayVideo() {
    $('video').each(function () {
        const videoPlayerEl = $(this)[0];
        const isVisible = isVisibleInViewport(videoPlayerEl);
        if (isVisible && !videoPlayerEl.playing) {
            videoPlayerEl.play();
        }
        if (!isVisible && videoPlayerEl.playing) {
            videoPlayerEl.pause();
        }
    });
}

function hamburgerMenu(x) {
    x.classList.toggle("change");

    var fullMenuEl = $('#full-screen-menu-container');
    if (fullMenuEl.css('opacity') === '0') {
        fullMenuEl.css({
            'height': '100vh',
            'opacity': '1'
        });
    } else {
        fullMenuEl.css({
            'height': '0',
            'opacity': '0'
        });
    }
    scrollFunction();
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

    var currentYearEl = $("#current-year");
    if (currentYearEl) {
        // Set year in footer
        const d = new Date();
        let year = d.getFullYear();
        currentYearEl.innerHTML = year;
    }
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

function onDashboardRegisContact() {
    $("form#dashboard-customer-contact-form").submit(function (formData) {
        console.log(formData)
    });
}

function initLangSwitcher() {
    $('#language-switcher').selectpicker();
    $('#language-switcher').on('change', function () {
        localStorage.setItem('lang', this.value);
        loadLanguage(this.value);
    });
}

function loadLanguage(lang) {
    $.getJSON('i18n/' + lang + '.json', function (translations) {
        $('[data-translate]').each(function () {
            var key = $(this).data('translate');
            $(this).html(translations[key] || 'Missing translation');
            if (this.type === 'submit') {
                this.value = translations[key] || 'Missing translation';
            }
        });
    });
}

function includePartialHtml() {
    $("div[data-includeHTML]").each(function () {
        $(this).load($(this).attr("data-includeHTML"));
    });
}

function triggerScrollWhenRefresh() {

    $(".js-window-trigger").each(function () {
        $(this).addClass('is-active');
    });

    if ($('.js-scroll-trigger').length) {
        scrollAnimation();
    }
    $(window).trigger('scroll');

}

function getURIQueryParam(key) {
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has(key)) {
        return searchParams.get(key);
    }
    return null;
}

function initFlexSlider() {
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
        itemWidth: 350,
    });
}

//////////////////////////////////////////
$(function () {
    includePartialHtml();
    setTimeout(() => {
        initLangSwitcher();
        localStorage.setItem('lang', 'en');
        loadLanguage(localStorage.getItem('lang') || 'en');
        initHeader();
        triggerScrollWhenRefresh();
        initFlexSlider();
    }, 1000);
});