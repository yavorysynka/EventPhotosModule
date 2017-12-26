CKEDITOR.plugins.add('rkeventphotosmodule', {
    requires: 'popup',
    init: function (editor) {
        editor.addCommand('insertRKEventPhotosModule', {
            exec: function (editor) {
                RKEventPhotosModuleFinderOpenPopup(editor, 'ckeditor');
            }
        });
        editor.ui.addButton('rkeventphotosmodule', {
            label: 'Event photos',
            command: 'insertRKEventPhotosModule',
            icon: this.path.replace('scribite/CKEditor/rkeventphotosmodule', 'images') + 'admin.png'
        });
    }
});
