package custom.example.facet;

import com.liferay.portal.kernel.search.SearchContext;
import com.liferay.portal.kernel.search.facet.Facet;
import com.liferay.portal.kernel.search.facet.util.FacetFactory;

import org.osgi.service.component.annotations.Component;

/* El uso de los eventuales scripts proporcionados en este ticket y de las instrucciones 
 * que los acompañan para un fin diferente a aquel para el que hayan sido entregados, o 
 * en el contexto de una incidencia no analizada expresamente en este ticket, no está 
 * cubierto por los Servicios de Soporte de Liferay, salvo indicación expresa en sentido contrario.
 */
@Component(immediate = true, service = FacetFactory.class)
public class NegativeMultiValueFacetFactory implements FacetFactory {

	@Override
	public String getFacetClassName() {
		return NegativeMultiValueFacet.class.getName();
	}

	@Override
	public Facet newInstance(SearchContext searchContext) {
		return new NegativeMultiValueFacet(searchContext);
	}

}