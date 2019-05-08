package custom.example.facet;

import com.liferay.portal.kernel.search.BooleanClause;
import com.liferay.portal.kernel.search.BooleanClauseFactoryUtil;
import com.liferay.portal.kernel.search.BooleanClauseOccur;
import com.liferay.portal.kernel.search.SearchContext;
import com.liferay.portal.kernel.search.facet.MultiValueFacet;
import com.liferay.portal.kernel.search.filter.Filter;

/* El uso de los eventuales scripts proporcionados en este ticket y de las instrucciones 
 * que los acompañan para un fin diferente a aquel para el que hayan sido entregados, o 
 * en el contexto de una incidencia no analizada expresamente en este ticket, no está 
 * cubierto por los Servicios de Soporte de Liferay, salvo indicación expresa en sentido contrario.
 */
public class NegativeMultiValueFacet extends MultiValueFacet {

	public NegativeMultiValueFacet(SearchContext searchContext) {
		super(searchContext);
	}

	@Override
	protected BooleanClause<Filter> doGetFacetFilterBooleanClause() {
		SearchContext searchContext = getSearchContext();

		BooleanClause<Filter> booleanClause =
			super.doGetFacetFilterBooleanClause();

		return BooleanClauseFactoryUtil.createFilter(
			searchContext, booleanClause.getClause(),
			BooleanClauseOccur.MUST_NOT);
	}

}