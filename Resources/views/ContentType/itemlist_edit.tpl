{* Purpose of this template: edit view of generic item list content type *}
<div class="form-group">
    {gt text='Object type' domain='rkeventphotosmodule' assign='objectTypeSelectorLabel'}
    {formlabel for='rKEventPhotosModuleObjectType' text=$objectTypeSelectorLabel cssClass='col-sm-3 control-label'}
    <div class="col-sm-9">
        {rkeventphotosmoduleObjectTypeSelector assign='allObjectTypes'}
        {formdropdownlist id='rKEventPhotosModuleObjectType' dataField='objectType' group='data' mandatory=true items=$allObjectTypes cssClass='form-control'}
        <span class="help-block">{gt text='If you change this please save the element once to reload the parameters below.' domain='rkeventphotosmodule'}</span>
    </div>
</div>

{if $featureActivationHelper->isEnabled(constant('RK\\EventPhotosModule\\Helper\\FeatureActivationHelper::CATEGORIES'), $objectType)}
{formvolatile}
{if $properties ne null && is_array($properties)}
    {nocache}
    {foreach key='registryId' item='registryCid' from=$registries}
        {assign var='propName' value=''}
        {foreach key='propertyName' item='propertyId' from=$properties}
            {if $propertyId eq $registryId}
                {assign var='propName' value=$propertyName}
            {/if}
        {/foreach}
        <div class="form-group">
            {assign var='hasMultiSelection' value=$categoryHelper->hasMultipleSelection($objectType, $propertyName)}
            {gt text='Category' domain='rkeventphotosmodule' assign='categorySelectorLabel'}
            {assign var='selectionMode' value='single'}
            {if $hasMultiSelection eq true}
                {gt text='Categories' domain='rkeventphotosmodule' assign='categorySelectorLabel'}
                {assign var='selectionMode' value='multiple'}
            {/if}
            {formlabel for="rKEventPhotosModuleCatIds`$propertyName`" text=$categorySelectorLabel cssClass='col-sm-3 control-label'}
            <div class="col-sm-9">
                {formdropdownlist id="rKEventPhotosModuleCatIds`$propName`" items=$categories.$propName dataField="catids`$propName`" group='data' selectionMode=$selectionMode cssClass='form-control'}
                <span class="help-block">{gt text='This is an optional filter.' domain='rkeventphotosmodule'}</span>
            </div>
        </div>
    {/foreach}
    {/nocache}
{/if}
{/formvolatile}
{/if}

<div class="form-group">
    {gt text='Sorting' domain='rkeventphotosmodule' assign='sortingLabel'}
    {formlabel text=$sortingLabel cssClass='col-sm-3 control-label'}
    <div class="col-sm-9">
        {formradiobutton id='rKEventPhotosModuleSortRandom' value='random' dataField='sorting' group='data' mandatory=true}
        {gt text='Random' domain='rkeventphotosmodule' assign='sortingRandomLabel'}
        {formlabel for='rKEventPhotosModuleSortRandom' text=$sortingRandomLabel}
        {formradiobutton id='rKEventPhotosModuleSortNewest' value='newest' dataField='sorting' group='data' mandatory=true}
        {gt text='Newest' domain='rkeventphotosmodule' assign='sortingNewestLabel'}
        {formlabel for='rKEventPhotosModuleSortNewest' text=$sortingNewestLabel}
        {formradiobutton id='rKEventPhotosModuleSortDefault' value='default' dataField='sorting' group='data' mandatory=true}
        {gt text='Default' domain='rkeventphotosmodule' assign='sortingDefaultLabel'}
        {formlabel for='rKEventPhotosModuleSortDefault' text=$sortingDefaultLabel}
    </div>
</div>

<div class="form-group">
    {gt text='Amount' domain='rkeventphotosmodule' assign='amountLabel'}
    {formlabel for='rKEventPhotosModuleAmount' text=$amountLabel cssClass='col-sm-3 control-label'}
    <div class="col-sm-9">
        {formintinput id='rKEventPhotosModuleAmount' dataField='amount' group='data' mandatory=true maxLength=2 cssClass='form-control'}
    </div>
</div>

<div class="form-group">
    {gt text='Template' domain='rkeventphotosmodule' assign='templateLabel'}
    {formlabel for='rKEventPhotosModuleTemplate' text=$templateLabel cssClass='col-sm-3 control-label'}
    <div class="col-sm-9">
        {rkeventphotosmoduleTemplateSelector assign='allTemplates'}
        {formdropdownlist id='rKEventPhotosModuleTemplate' dataField='template' group='data' mandatory=true items=$allTemplates cssClass='form-control'}
    </div>
</div>

<div id="customTemplateArea" class="form-group"{* data-switch="rKEventPhotosModuleTemplate" data-switch-value="custom"*}>
    {gt text='Custom template' domain='rkeventphotosmodule' assign='customTemplateLabel'}
    {formlabel for='rKEventPhotosModuleCustomTemplate' text=$customTemplateLabel cssClass='col-sm-3 control-label'}
    <div class="col-sm-9">
        {formtextinput id='rKEventPhotosModuleCustomTemplate' dataField='customTemplate' group='data' mandatory=false maxLength=80 cssClass='form-control'}
        <span class="help-block">{gt text='Example' domain='rkeventphotosmodule'}: <em>itemlist_[objectType]_display.html.twig</em></span>
    </div>
</div>

<div class="form-group">
    {gt text='Filter (expert option)' domain='rkeventphotosmodule' assign='filterLabel'}
    {formlabel for='rKEventPhotosModuleFilter' text=$filterLabel cssClass='col-sm-3 control-label'}
    <div class="col-sm-9">
        {formtextinput id='rKEventPhotosModuleFilter' dataField='filter' group='data' mandatory=false maxLength=255 cssClass='form-control'}
        <span class="help-block">{gt text='Example' domain='rkeventphotosmodule'}: <em>tbl.age >= 18</em></span>
    </div>
</div>

<script>
    (function($) {
    	$('#rKEventPhotosModuleTemplate').change(function() {
    	    $('#customTemplateArea').toggleClass('hidden', $(this).val() != 'custom');
	    }).trigger('change');
    })(jQuery)
</script>
