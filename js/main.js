

function scrollFunction() {
    if ((document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) && (document.getElementById("full-screen-menu-container").style.opacity == 0)) {
        document.getElementById("navbar").style.background = 'rgba(1, 90, 70, 1)';
        document.getElementById("navbar").style.color = '#fff';
        document.getElementById("logo").src = "./images/logo/ha247-logo-white.png";
    } else {
        document.getElementById("navbar").style.background = 'rgba(1, 90, 70, 0)';
        document.getElementById("navbar").style.color = 'rgba(1, 90, 70, 1)';
        document.getElementById("logo").src = "./images/logo/ha247-logo.png";
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
        navbarMiddle.css({ 'color': '#fff' });

        document.getElementById("logo").src = "./images/logo/ha247-logo-white.png";
    } else {
        menu.css({
            'height': '0',
            'opacity': '0'
        });

        if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
            document.getElementById("logo").src = "./images/logo/ha247-logo-white.png";
        } else {
            document.getElementById("logo").src = "./images/logo/ha247-logo.png";
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

function initLangSwitcher(){
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
            if (this.type === 'submit'){
                this.value = translations[key] || 'Missing translation';
            }
        });
    });
}


//////////////////////////////////////////
$(function () {
    initHeader();
    initLangSwitcher();
    localStorage.setItem('lang', 'en');
    loadLanguage(localStorage.getItem('lang') || 'en');
    // Make anchor links scroll
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    $(".js-window-trigger").each(function () {
        $(this).addClass('is-active');
    });

    if ($('.js-scroll-trigger').length) {
        scrollAnimation();
    }
    $(window).trigger('scroll');
});