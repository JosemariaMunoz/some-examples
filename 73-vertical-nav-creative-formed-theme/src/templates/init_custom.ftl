<#assign
	show_footer = getterUtil.getBoolean(themeDisplay.getThemeSetting("show-footer"))
	show_header = getterUtil.getBoolean(themeDisplay.getThemeSetting("show-header"))
	show_header_search = getterUtil.getBoolean(themeDisplay.getThemeSetting("show-header-search"))
	wrap_widget_page_content = getterUtil.getBoolean(themeDisplay.getThemeSetting("wrap-widget-page-content"))
	show_account_selector = getterUtil.getBoolean(themeDisplay.getThemeSetting("show-account-selector"))
	show_mini_cart = getterUtil.getBoolean(themeDisplay.getThemeSetting("show-mini-cart"))
	show_navigator_menu_header = getterUtil.getBoolean(themeDisplay.getThemeSetting("show-navigator-menu-header"))
	show_vertical_menu = getterUtil.getBoolean(themeDisplay.getThemeSetting("show-vertical-menu"))
/>

<#if wrap_widget_page_content && ((layout.isTypeContent() && themeDisplay.isStateMaximized()) || (layout.getType() == "portlet"))>
	<#assign portal_content_css_class = "container" />
<#else>
	<#assign portal_content_css_class = "" />
</#if>

<#--  Formed Theme  -->

<#-- switch to this if you don't want to hide the control panel - <#assign show_dockbar = is_signed_in /> -->

<#assign show_dockbar = permissionChecker.isOmniadmin() || permissionChecker.isGroupAdmin(user_id)/>

<#assign
	enable_sticky_header = getterUtil.getBoolean(themeDisplay.getThemeSetting("enable-sticky-header"))
	show_language_selector = getterUtil.getBoolean(themeDisplay.getThemeSetting("show-language-selector"))
/>

<#assign left_sidebar_css_class = "" />
<#assign section_content_css_class = "" />
<#assign footer_css_class = "" />
<#if show_vertical_menu>
	<#assign footer_css_class = "align-self-end" />
	<#assign section_content_css_class = "align-self-end" />
	<#if show_header>
		<#assign left_sidebar_css_class = "" />
	<#else>
		<#assign left_sidebar_css_class = "pt-0" />
	</#if>
<#else>
	<#assign section_content_css_class = "w-100" />
</#if>