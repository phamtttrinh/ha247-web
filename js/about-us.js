
function initOurPersonaSection() {
    $(".toggleMenu").on('click', function () {
        $("#mainMenu").toggleClass('open');
    });
    
    $('#persona-menu').on('click', function () {
        $(this).find('.button').toggleClass('open');
        $(this).find('.menu-trigger').toggleClass('open');
    });
}

/*-------------------*/
/*-------------------*/
$(function () {
    setTimeout(() => {
        initOurPersonaSection();
    }, 1000);
});