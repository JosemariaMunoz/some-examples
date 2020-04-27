<%@ include file="/init.jsp"%>

<p>
	<b><liferay-ui:message
			key="import-users-welcome" /></b>
</p>
<portlet:actionURL var="processForm" name="processForm" />
<aui:form action="<%= processForm %>" method="post" name="fm" enctype="multipart/form-data">

	
	<div class="forms-container fm-send-complaint">
		<div class="custom-form">

			<aui:input label="csv-file" name="csvFile" type="file" wrapperCssClass="mt-4" />

			<div class="btn-container">
				<aui:button cssClass="btn btn-lg btn-primary btn-default" type="submit" name="submit" value='Upload File'></aui:button>
			</div>
		</div>
	</div>
</aui:form>