'use strict';

function eventToggleShrinkSettings(fieldName) {
    var idSuffix = fieldName.replace('rkeventphotosmodule_appsettings_', '');
    jQuery('#shrinkDetails' + idSuffix).toggleClass('hidden', !jQuery('#rkeventphotosmodule_appsettings_enableShrinkingFor' + idSuffix).prop('checked'));
}

jQuery(document).ready(function () {
    jQuery('.shrink-enabler').each(function (index) {
        jQuery(this).bind('click keyup', function (event) {
            eventToggleShrinkSettings(jQuery(this).attr('id').replace('enableShrinkingFor', ''));
        });
        eventToggleShrinkSettings(jQuery(this).attr('id').replace('enableShrinkingFor', ''));
    });
});
