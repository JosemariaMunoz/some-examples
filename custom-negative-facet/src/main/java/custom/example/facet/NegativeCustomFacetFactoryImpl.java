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

package custom.example.facet;

import com.liferay.portal.kernel.search.SearchContext;
import com.liferay.portal.kernel.search.facet.util.FacetFactory;
import com.liferay.portal.search.facet.Facet;
import org.osgi.service.component.annotations.Component;

@Component(
	immediate = true, service = {NegativeCustomFacetFactory.class, FacetFactory.class}
)
public class NegativeCustomFacetFactoryImpl implements NegativeCustomFacetFactory {

	@Override
	public String getFacetClassName() {
		return NegativeCustomFacetFactory.class.getName();
	}

	@Override
	public Facet newInstance(SearchContext searchContext) {
		return new NegativeCustomFacetImpl(null, searchContext);
	}

}