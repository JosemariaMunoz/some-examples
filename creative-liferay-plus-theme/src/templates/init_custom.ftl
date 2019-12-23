<#assign
    show_logo_image = getterUtil.getBoolean(themeDisplay.getThemeSetting("show-logo-image"))
    show_temporal_content = getterUtil.getBoolean(themeDisplay.getThemeSetting("show-temporal-content"))
    show_footer = getterUtil.getBoolean(themeDisplay.getThemeSetting("show-footer"))
    theme_color = getterUtil.getString(themeDisplay.getThemeSetting("theme-color"))
/>

<#assign
	site_description = page_group.getDescription(locale)
/>

<#assign contact_address_custom_field = " ">
<#assign phone_address_custom_field = " ">
<#assign email_address_custom_field = " ">

<#if layout.getGroup().getExpandoBridge().getAttribute("contact-address")??>
    <#assign contact_address_custom_field_list = layout.getGroup().getExpandoBridge().getAttribute("contact-address")>
    <#list contact_address_custom_field_list?keys as key>
        <#if key == locale>
            <#assign contact_address_custom_field = contact_address_custom_field_list?values[key?index] />
        </#if>
    </#list>
</#if>
<#if layout.getGroup().getExpandoBridge().getAttribute("contact-phone")??>
    <#assign phone_address_custom_field = layout.getGroup().getExpandoBridge().getAttribute("contact-phone")>
</#if>
<#if layout.getGroup().getExpandoBridge().getAttribute("contact-email")??>
    <#assign email_address_custom_field = layout.getGroup().getExpandoBridge().getAttribute("contact-email")>
</#if>

