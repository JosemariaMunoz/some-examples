<%--
/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */
--%>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %><%@
taglib uri="http://liferay.com/tld/frontend" prefix="liferay-frontend" %><%@
taglib uri="http://liferay.com/tld/portlet" prefix="liferay-portlet" %><%@
taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>

<%@ page import="com.liferay.portal.kernel.util.Constants" %><%@
page import="custom.example.com.liferay.portal.search.web.internal.custom.facet.portlet.CustomFacetPortletPreferences" %><%@
page import="custom.example.com.liferay.portal.search.web.internal.custom.facet.portlet.CustomFacetPortletPreferencesImpl" %><%@
page import="custom.example.com.liferay.portal.search.web.internal.util.PortletPreferencesJspUtil" %>

<liferay-frontend:defineObjects />

<liferay-theme:defineObjects />

<portlet:defineObjects />

<%
CustomFacetPortletPreferences customFacetPortletPreferences = new CustomFacetPortletPreferencesImpl(java.util.Optional.of(portletPreferences));
%>

<liferay-portlet:actionURL portletConfiguration="<%= true %>" var="configurationActionURL" />

<liferay-portlet:renderURL portletConfiguration="<%= true %>" var="configurationRenderURL" />

<liferay-frontend:edit-form
	action="<%= configurationActionURL %>"
	method="post"
	name="fm"
>
	<aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.UPDATE %>" />
	<aui:input name="redirect" type="hidden" value="<%= configurationRenderURL %>" />

	<liferay-frontend:edit-form-body>
		<liferay-frontend:fieldset-group>
			<aui:input helpMessage="aggregation-field-help" label="aggregation-field" name="<%= PortletPreferencesJspUtil.getInputName(CustomFacetPortletPreferences.PREFERENCE_KEY_AGGREGATION_FIELD) %>" value="<%= customFacetPortletPreferences.getAggregationFieldString() %>" />

			<aui:input helpMessage="custom-parameter-values-help" label="custom-parameter-values" name="<%= PortletPreferencesJspUtil.getInputName(CustomFacetPortletPreferences.PREFERENCE_KEY_CUSTOM_HEADING) %>" value="<%= customFacetPortletPreferences.getCustomHeadingString() %>" />

			<aui:input type="hidden" helpMessage="custom-parameter-name-help" label="custom-parameter-name" name="<%= PortletPreferencesJspUtil.getInputName(CustomFacetPortletPreferences.PREFERENCE_KEY_PARAMETER_NAME) %>" value="<%= customFacetPortletPreferences.getParameterNameString() %>" />

			<aui:input type="hidden"  label="max-terms" name="<%= PortletPreferencesJspUtil.getInputName(CustomFacetPortletPreferences.PREFERENCE_KEY_MAX_TERMS) %>" value="<%= customFacetPortletPreferences.getMaxTerms() %>" />

			<aui:input type="hidden" label="frequency-threshold" name="<%= PortletPreferencesJspUtil.getInputName(CustomFacetPortletPreferences.PREFERENCE_KEY_FREQUENCY_THRESHOLD) %>" value="<%= customFacetPortletPreferences.getFrequencyThreshold() %>" />

			<aui:input type="hidden" label="display-frequencies" name="<%= PortletPreferencesJspUtil.getInputName(CustomFacetPortletPreferences.PREFERENCE_KEY_FREQUENCIES_VISIBLE) %>" value="<%= customFacetPortletPreferences.isFrequenciesVisible() %>" />
		</liferay-frontend:fieldset-group>
	</liferay-frontend:edit-form-body>

	<liferay-frontend:edit-form-footer>
		<aui:button type="submit" />

		<aui:button type="cancel" />
	</liferay-frontend:edit-form-footer>
</liferay-frontend:edit-form>