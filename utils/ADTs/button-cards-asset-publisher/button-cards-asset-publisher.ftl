<style>
    .card:hover {
      background-color: var(--secondary) !important;
      color: #fff;
    }
    .custom-card-text {
        min-height: 135px;
    }

    .asset-entries-group-label.h3 {
        padding-bottom: 20px;
        padding-top: 10px;
        font-weight: 400;
        font-size: 1.6rem;
    }
</style>

<#if !entries?has_content>
	<#if !themeDisplay.isSignedIn()>
		${renderRequest.setAttribute("PORTLET_CONFIGURATOR_VISIBILITY", true)}
	</#if>

	<div class="alert alert-info">
		<@liferay_ui["message"] key="there-are-no-results" />
	</div>
</#if>

<div class="row">
    <#list entries as entry>
        <#assign
            entry = entry

            assetRenderer = entry.getAssetRenderer()

            entryTitle = htmlUtil.escape(assetRenderer.getTitle(locale))

            viewURL = assetPublisherHelper.getAssetViewURL(renderRequest, renderResponse, entry)
        />

        <#if !stringUtil.equals(assetLinkBehavior, "showFullContent")>
            <#assign viewURL = assetPublisherHelper.getAssetViewURL(renderRequest, renderResponse, entry, true) />
        </#if>

        <div class="col-sm-4">
            <div class="card">
                <div class="card-body p-4">
                    <p class="card-text custom-card-text font-weight-light h1 ml-2 mr-2 mt-3">${entryTitle}</p>
                    <a href="${viewURL}" class="stretched-link"></a>
                </div>
            </div>
        </div>
    </#list>
</div>
