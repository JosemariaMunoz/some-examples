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

package custom.example.com.liferay.portal.search.web.internal.custom.facet.builder;

import com.liferay.portal.kernel.search.SearchContext;
import com.liferay.portal.kernel.search.facet.config.FacetConfiguration;
import com.liferay.portal.search.facet.Facet;

import custom.example.com.liferay.portal.search.facet.custom.NegativeCustomFacetFactory;

/**
 * @author Wade Cao
 */
public class CustomFacetBuilder {

	public CustomFacetBuilder(NegativeCustomFacetFactory negativeCustomFacetFactory) {
		_negativeCustomFacetFactory = negativeCustomFacetFactory;
	}

	public Facet build() {
		Facet facet = _negativeCustomFacetFactory.newInstance(_searchContext);

		facet.setFieldName(_fieldToAggregate);

		facet.setFacetConfiguration(buildFacetConfiguration(facet));

		facet.select(_filterValues);

		facet.setAggregationName(_aggregationName);

		return facet;
	}

	public void setAggregationName(String aggregationName) {
		_aggregationName = aggregationName;
	}

	public void setFieldToAggregate(String fieldToAggregate) {
		_fieldToAggregate = fieldToAggregate;
	}

	public void setSearchContext(SearchContext searchContext) {
		_searchContext = searchContext;
	}

	public void setFilterValues(String[] filterValues) {
		_filterValues = filterValues;
	}

	protected FacetConfiguration buildFacetConfiguration(Facet facet) {
		FacetConfiguration facetConfiguration = new FacetConfiguration();

		facetConfiguration.setFieldName(facet.getFieldName());
		facetConfiguration.setOrder("OrderHitsDesc");
		facetConfiguration.setStatic(false);
		facetConfiguration.setWeight(1.1);

		return facetConfiguration;
	}

	private String _aggregationName;
	private final NegativeCustomFacetFactory _negativeCustomFacetFactory;
	private String _fieldToAggregate;
	private SearchContext _searchContext;
	private String[] _filterValues;

}