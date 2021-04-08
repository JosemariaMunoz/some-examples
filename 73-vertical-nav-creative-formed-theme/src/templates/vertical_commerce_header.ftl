<#if has_navigation && is_setup_complete>

    <div class="commerce-topbar minium-topbar" id="vertical-commerce-header">
        <div class="minium-topbar__end">
            <#if show_account_selector>
                <div class="minium-topbar__account-selector-wrapper mr-lg-10 mr-md-8 mr-sm-5">
                    <@liferay_commerce_ui["account-selector"] />
                </div>
            </#if>

            <#if show_mini_cart>
                <div class="minium-topbar__cart-wrapper">
                    <@liferay_commerce_ui["mini-cart"] spritemap="${themeDisplay.getPathThemeImages()}/icons.svg" />
                </div>
            </#if>
        </div>
    </div>

</#if>