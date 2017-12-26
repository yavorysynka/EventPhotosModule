var rkeventphotosmodule = function(quill, options) {
    setTimeout(function() {
        var button;

        button = jQuery('button[value=rkeventphotosmodule]');

        button
            .css('background', 'url(' + Zikula.Config.baseURL + Zikula.Config.baseURI + '/web/modules/rkeventphotos/images/admin.png) no-repeat center center transparent')
            .css('background-size', '16px 16px')
            .attr('title', 'Event photos')
        ;

        button.click(function() {
            RKEventPhotosModuleFinderOpenPopup(quill, 'quill');
        });
    }, 1000);
};
