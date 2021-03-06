'use strict';

/**
 * Toggles the fields of an auto completion field.
 */
function rKEventPhotosToggleAutoCompletionFields(idPrefix) {
    // if we don't have a toggle link do nothing
    if (jQuery('#' + idPrefix + 'AddLink').length < 1) {
        return;
    }

    // show/hide the toggle link
    jQuery('#' + idPrefix + 'AddLink').toggleClass('hidden');

    // hide/show the fields
    jQuery('#' + idPrefix + 'AddFields').toggleClass('hidden');
}

/**
 * Resets an auto completion field.
 */
function rKEventPhotosResetAutoCompletion(idPrefix) {
    // hide the sub form
    rKEventPhotosToggleAutoCompletionFields(idPrefix);

    // reset value of the auto completion field
    jQuery('#' + idPrefix + 'Selector').val('');
}

/**
 * Removes a related item from the list of selected ones.
 */
function rKEventPhotosRemoveRelatedItem(idPrefix, removeId) {
    var itemIds, itemIdsArr;

    itemIds = jQuery('#' + idPrefix).val();
    itemIdsArr = itemIds.split(',');

    itemIdsArr = jQuery.grep(itemIdsArr, function (value) {
        return value != removeId;
    });

    itemIds = itemIdsArr.join(',');

    jQuery('#' + idPrefix).val(itemIds);
    jQuery('#' + idPrefix + 'Reference_' + removeId).remove();
}

/**
 * Adds an item to the current selection which has been chosen by auto completion.
 */
function rKEventPhotosSelectResultItem(objectType, idPrefix, selectedListItem, includeEditing) {
    var newItemId, newTitle, elemPrefix, li, itemIds;

    itemIds = jQuery('#' + idPrefix).val();
    if (itemIds !== '') {
        if (jQuery('#' + idPrefix + 'Multiple').val() === '0') {
            jQuery('#' + idPrefix + 'ReferenceList').text('');
            itemIds = '';
        } else {
            itemIds += ',';
        }
    }

    newItemId = selectedListItem.id;
    newTitle = selectedListItem.title;
    elemPrefix = idPrefix + 'Reference_' + newItemId;

    li = jQuery('<li />', {
        id: elemPrefix,
        text: newTitle
    });
    if (true === includeEditing) {
        li.append(rKEventPhotosCreateInlineEditLink(objectType, idPrefix, elemPrefix, newItemId));
    }

    li.append(
        jQuery('<a />', {
            id: elemPrefix + 'Remove',
            href: 'javascript:rKEventPhotosRemoveRelatedItem(\'' + idPrefix + '\', ' + newItemId + ');',
            text: 'remove'
        }).append(
            jQuery('<span />', { class: 'fa fa-trash-o' })
        )
    );

    if (selectedListItem.image !== '') {
        li.append(
            jQuery('<div />', {
                id: elemPrefix + 'Preview',
                name: idPrefix + 'Preview'
            }).html(selectedListItem.image)
        );
    }

    jQuery('#' + idPrefix + 'ReferenceList').append(li);

    if (true === includeEditing) {
        rKEventPhotosInitInlineEditLink(objectType, idPrefix, elemPrefix, newItemId, 'autocomplete');
    }

    itemIds += newItemId;
    jQuery('#' + idPrefix).val(itemIds);

    rKEventPhotosResetAutoCompletion(idPrefix);
}

/**
 * Adds a hook assignment item to selection which has been chosen by auto completion.
 */
function rKEventPhotosSelectHookItem(objectType, idPrefix, selectedListItem) {
    rKEventPhotosResetAutoCompletion(idPrefix);
    rKEventPhotosAttachHookObject(jQuery('#' + idPrefix + 'AddLink'), selectedListItem.id);
}

/**
 * Initialises auto completion for a relation field.
 */
function rKEventPhotosInitAutoCompletion(objectType, alias, idPrefix, includeEditing) {
    var acOptions, acDataSet, acUrl, isHookAttacher;

    isHookAttacher = idPrefix.startsWith('hookAssignment');
    if (isHookAttacher) {
        idPrefix = alias;
    }

    // update identifier of hidden field for easier usage in JS
    jQuery('#' + idPrefix + 'Multiple').prev().attr('id', idPrefix);

    // add handling for the toggle link if existing
    jQuery('#' + idPrefix + 'AddLink').click(function (event) {
        rKEventPhotosToggleAutoCompletionFields(idPrefix);
    });

    // add handling for the cancel button
    jQuery('#' + idPrefix + 'SelectorDoCancel').click(function (event) {
        rKEventPhotosResetAutoCompletion(idPrefix);
    });

    // clear values and ensure starting state
    rKEventPhotosResetAutoCompletion(idPrefix);

    jQuery.each(rKEventPhotosInlineEditHandlers, function (key, editHandler) {
        if (editHandler.prefix !== (idPrefix + 'SelectorDoNew') || editHandler.inputType !== 'autocomplete') {
            return;
        }

        jQuery('#' + idPrefix + 'Selector').autocomplete({
            minLength: 1,
            open: function (event, ui) {
                jQuery(this).autocomplete('widget').css({
                    width: (jQuery(this).outerWidth() + 'px')
                });
            },
            source: function (request, response) {
                var acUrlArgs;

                acUrlArgs = {
                    ot: objectType,
                    fragment: request.term
                };
                if (jQuery('#' + idPrefix).length > 0) {
                    acUrlArgs.exclude = jQuery('#' + idPrefix).val();
                }

                jQuery.getJSON(Routing.generate(editHandler.moduleName.toLowerCase() + '_ajax_getitemlistautocompletion', acUrlArgs), function (data) {
                    response(data);
                });
            },
            response: function (event, ui) {
                jQuery('#' + idPrefix + 'LiveSearch .empty-message').remove();
                if (ui.content.length === 0) {
                    jQuery('#' + idPrefix + 'LiveSearch').append(
                        jQuery('<div />', { class: 'empty-message' }).text(Translator.__('No results found!'))
                    );
                }
            },
            focus: function (event, ui) {
                jQuery('#' + idPrefix + 'Selector').val(ui.item.title);

                return false;
            },
            select: function (event, ui) {
                if (true === isHookAttacher) {
                    rKEventPhotosSelectHookItem(objectType, idPrefix, ui.item);
                } else {
                    rKEventPhotosSelectResultItem(objectType, idPrefix, ui.item, includeEditing);
                }

                return false;
            }
        })
        .autocomplete('instance')._renderItem = function (ul, item) {
            return jQuery('<div />', { class: 'suggestion' })
                .append('<div class="media"><div class="media-left"><a href="javascript:void(0)">' + item.image + '</a></div><div class="media-body"><p class="media-heading">' + item.title + '</p>' + item.description + '</div></div>')
                .appendTo(ul);
        };
    });
}

