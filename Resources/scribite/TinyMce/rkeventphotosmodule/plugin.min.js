/**
 * Initializes the plugin, this will be executed after the plugin has been created.
 * This call is done before the editor instance has finished it's initialization so use the onInit event
 * of the editor instance to intercept that event.
 *
 * @param {tinymce.Editor} ed Editor instance that the plugin is initialised in
 * @param {string} url Absolute URL to where the plugin is located
 */
tinymce.PluginManager.add('rkeventphotosmodule', function(editor, url) {
    var icon;

    icon = Zikula.Config.baseURL + Zikula.Config.baseURI + '/web/modules/rkeventphotos/images/admin.png';

    editor.addButton('rkeventphotosmodule', {
        //text: 'Event photos',
        image: icon,
        onclick: function() {
            RKEventPhotosModuleFinderOpenPopup(editor, 'tinymce');
        }
    });
    editor.addMenuItem('rkeventphotosmodule', {
        text: 'Event photos',
        context: 'tools',
        image: icon,
        onclick: function() {
            RKEventPhotosModuleFinderOpenPopup(editor, 'tinymce');
        }
    });

    return {
        getMetadata: function() {
            return {
                title: 'Event photos',
                url: 'http://k62.de'
            };
        }
    };
});
