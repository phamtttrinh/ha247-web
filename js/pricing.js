function initSwicherPricingCategory() {
    $('#pricing-category-switcher #toggle-handler').on('change', function () {
        showPricingCategory(this.checked);
    });
}

function showPricingCategory(isBusinessAssistance) {
    if (isBusinessAssistance) {
        // BUSINESS_ASSISTANCE
        $('[data-category="business"]').each(function () { $(this).show(); });
        $('[data-category="life"]').each(function () { $(this).hide(); });
    } else {
        // LIFE_COMPANIONS
        $('[data-category="business"]').each(function () { $(this).hide(); });
        $('[data-category="life"]').each(function () { $(this).show(); });
    }
}
/*-------------------*/
/*-------------------*/
$(function () {
    setTimeout(() => {
        var category = getURIQueryParam('category');
        const isBusinessAssistance = category === 'business';
        $('#pricing-category-switcher #toggle-handler')[0].checked = isBusinessAssistance;
        showPricingCategory(isBusinessAssistance);
        initSwicherPricingCategory();
    }, 200);
});