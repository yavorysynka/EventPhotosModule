'use strict';

var rKEventPhotosModule = {};

rKEventPhotosModule.itemSelector = {};
rKEventPhotosModule.itemSelector.items = {};
rKEventPhotosModule.itemSelector.baseId = 0;
rKEventPhotosModule.itemSelector.selectedId = 0;

rKEventPhotosModule.itemSelector.onLoad = function (baseId, selectedId) {
    rKEventPhotosModule.itemSelector.baseId = baseId;
    rKEventPhotosModule.itemSelector.selectedId = selectedId;

    // required as a changed object type requires a new instance of the item selector plugin
    jQuery('#rKEventPhotosModuleObjectType').change(rKEventPhotosModule.itemSelector.onParamChanged);

    jQuery('#' + baseId + '_catidMain').change(rKEventPhotosModule.itemSelector.onParamChanged);
    jQuery('#' + baseId + '_catidsMain').change(rKEventPhotosModule.itemSelector.onParamChanged);
    jQuery('#' + baseId + 'Id').change(rKEventPhotosModule.itemSelector.onItemChanged);
    jQuery('#' + baseId + 'Sort').change(rKEventPhotosModule.itemSelector.onParamChanged);
    jQuery('#' + baseId + 'SortDir').change(rKEventPhotosModule.itemSelector.onParamChanged);
    jQuery('#rKEventPhotosModuleSearchGo').click(rKEventPhotosModule.itemSelector.onParamChanged);
    jQuery('#rKEventPhotosModuleSearchGo').keypress(rKEventPhotosModule.itemSelector.onParamChanged);

    rKEventPhotosModule.itemSelector.getItemList();
};

rKEventPhotosModule.itemSelector.onParamChanged = function () {
    jQuery('#ajaxIndicator').removeClass('hidden');

    rKEventPhotosModule.itemSelector.getItemList();
};

rKEventPhotosModule.itemSelector.getItemList = function () {
    var baseId;
    var params;

    baseId = rKEventPhotosModule.itemSelector.baseId;
    params = {
        ot: baseId,
        sort: jQuery('#' + baseId + 'Sort').val(),
        sortdir: jQuery('#' + baseId + 'SortDir').val(),
        q: jQuery('#' + baseId + 'SearchTerm').val()
    }
    if (jQuery('#' + baseId + '_catidMain').length > 0) {
        params[catidMain] = jQuery('#' + baseId + '_catidMain').val();
    } else if (jQuery('#' + baseId + '_catidsMain').length > 0) {
        params[catidsMain] = jQuery('#' + baseId + '_catidsMain').val();
    }

    jQuery.getJSON(Routing.generate('rkeventphotosmodule_ajax_getitemlistfinder'), params, function (data) {
        var baseId;

        baseId = rKEventPhotosModule.itemSelector.baseId;
        rKEventPhotosModule.itemSelector.items[baseId] = data;
        jQuery('#ajaxIndicator').addClass('hidden');
        rKEventPhotosModule.itemSelector.updateItemDropdownEntries();
        rKEventPhotosModule.itemSelector.updatePreview();
    });
};

rKEventPhotosModule.itemSelector.updateItemDropdownEntries = function () {
    var baseId, itemSelector, items, i, item;

    baseId = rKEventPhotosModule.itemSelector.baseId;
    itemSelector = jQuery('#' + baseId + 'Id');
    itemSelector.length = 0;

    items = rKEventPhotosModule.itemSelector.items[baseId];
    for (i = 0; i < items.length; ++i) {
        item = items[i];
        itemSelector.get(0).options[i] = new Option(item.title, item.id, false);
    }

    if (rKEventPhotosModule.itemSelector.selectedId > 0) {
        jQuery('#' + baseId + 'Id').val(rKEventPhotosModule.itemSelector.selectedId);
    }
};

rKEventPhotosModule.itemSelector.updatePreview = function () {
    var baseId, items, selectedElement, i;

    baseId = rKEventPhotosModule.itemSelector.baseId;
    items = rKEventPhotosModule.itemSelector.items[baseId];

    jQuery('#' + baseId + 'PreviewContainer').addClass('hidden');

    if (items.length === 0) {
        return;
    }

    selectedElement = items[0];
    if (rKEventPhotosModule.itemSelector.selectedId > 0) {
        for (var i = 0; i < items.length; ++i) {
            if (items[i].id == rKEventPhotosModule.itemSelector.selectedId) {
                selectedElement = items[i];
                break;
            }
        }
    }

    if (null !== selectedElement) {
        jQuery('#' + baseId + 'PreviewContainer')
            .html(window.atob(selectedElement.previewInfo))
            .removeClass('hidden');
        rKEventPhotosInitImageViewer();
    }
};

rKEventPhotosModule.itemSelector.onItemChanged = function () {
    var baseId, itemSelector, preview;

    baseId = rKEventPhotosModule.itemSelector.baseId;
    itemSelector = jQuery('#' + baseId + 'Id').get(0);
    preview = window.atob(rKEventPhotosModule.itemSelector.items[baseId][itemSelector.selectedIndex].previewInfo);

    jQuery('#' + baseId + 'PreviewContainer').html(preview);
    rKEventPhotosModule.itemSelector.selectedId = jQuery('#' + baseId + 'Id').val();
    rKEventPhotosInitImageViewer();
};

jQuery(document).ready(function () {
    var infoElem;

    infoElem = jQuery('#itemSelectorInfo');
    if (infoElem.length == 0) {
        return;
    }

    rKEventPhotosModule.itemSelector.onLoad(infoElem.data('base-id'), infoElem.data('selected-id'));
});
