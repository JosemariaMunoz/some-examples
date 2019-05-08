package custom.example;

import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.search.facet.config.FacetConfiguration;
import com.liferay.portal.kernel.search.facet.util.FacetFactory;
import com.liferay.portal.search.web.facet.BaseJSPSearchFacet;
import com.liferay.portal.search.web.facet.SearchFacet;

import javax.portlet.ActionRequest;
import javax.servlet.ServletContext;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import custom.example.facet.NegativeCustomFacetFactory;

/* El uso de los eventuales scripts proporcionados en este ticket y de las instrucciones 
 * que los acompañan para un fin diferente a aquel para el que hayan sido entregados, o 
 * en el contexto de una incidencia no analizada expresamente en este ticket, no está 
 * cubierto por los Servicios de Soporte de Liferay, salvo indicación expresa en sentido contrario.
 */
@Component(immediate = true, property = {}, service = SearchFacet.class)
public class CustomNegativeMutiValueSearchFacet extends BaseJSPSearchFacet {

	@Override
	public String getConfigurationJspPath() {
		return null;
	}

	@Override
	public FacetConfiguration getDefaultConfiguration(long companyId) {
		FacetConfiguration facetConfiguration = new FacetConfiguration();

		facetConfiguration.setClassName(getFacetClassName());

		facetConfiguration.setDataJSONObject(getJSONData());

		facetConfiguration.setFieldName(getFieldName());
		facetConfiguration.setLabel(getLabel());
		facetConfiguration.setOrder(getOrder());
		facetConfiguration.setStatic(true);
		facetConfiguration.setWeight(1.5);

		return facetConfiguration;
	}

	@Override
	public String getDisplayJspPath() {
		return null;
	}

	@Override
	public String getFacetClassName() {
		return negativeCustomFacetFactory.getFacetClassName();
	}

	@Override
	public String getFieldName() {
		return "extension";
	}

	@Override
	public JSONObject getJSONData(ActionRequest actionRequest) {
		return getJSONData();
	}

	@Override
	public String getLabel() {
		return "test";
	}

	protected JSONObject getJSONData() {
		JSONObject jsonObject = JSONFactoryUtil.createJSONObject();

		JSONArray jsonArray = JSONFactoryUtil.createJSONArray();

		String[] values =
			new String[] {"bmp", "gif", "jpeg", "jpg", "odg", "png", "svg"};

		for (String assetType : values) {
			jsonArray.put(assetType);
		}

		jsonObject.put("frequencyThreshold", 0);
		jsonObject.put("values", jsonArray);
		return jsonObject;
	}

	@Override
	@Reference(
		target = "(osgi.web.symbolicname=com.liferay.portal.search.web)",
		unbind = "-"
	)
	public void setServletContext(ServletContext servletContext) {
		super.setServletContext(servletContext);
	}

	@Override
	protected FacetFactory getFacetFactory() {
		return negativeCustomFacetFactory;
	}
	
	@Reference
	protected NegativeCustomFacetFactory negativeCustomFacetFactory;

}