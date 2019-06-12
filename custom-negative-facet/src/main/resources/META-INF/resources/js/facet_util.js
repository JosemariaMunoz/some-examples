AUI.add(
	'liferay-search-facet-util',
	function(A) {
		var FacetUtil = {
			addURLParameter: function(key, value, parameterArray) {
				key = encodeURIComponent(key);
				value = encodeURIComponent(value);

				parameterArray[parameterArray.length] = [key, value].join('=');

				return parameterArray;
			},

			changeSelection: function(event) {
				var form = event.currentTarget.form;

				if (!form) {
					return;
				}

				var selections = [];

				var formCheckboxes = $('#' + form.id + ' input.facet-term');

				formCheckboxes.each(
					function(index, value) {
						if (value.checked) {
							selections.push(value.getAttribute('data-term-id'));
						}
					}
				);

				FacetUtil.selectTerms(form, selections);
			},

			clearSelections: function(event) {
				var form = $(event.currentTarget).closest('form')[0];

				if (!form) {
					return;
				}

				var selections = [];

				FacetUtil.selectTerms(form, selections);
			},

			removeURLParameters: function(key, parameterArray) {
				key = encodeURIComponent(key);

				var newParameters = parameterArray.filter(
					function(item) {
						var itemSplit = item.split('=');

						if (itemSplit && (itemSplit[0] === key)) {
							return false;
						}

						return true;
					}
				);

				return newParameters;
			},

			selectTerms: function(form, selections) {
				var formParameterName = $('#' + form.id + ' input.facet-parameter-name');

				var key = formParameterName[0].value;

				document.location.search = FacetUtil.updateQueryString(key, selections, document.location.search);
			},

			setURLParameter: function(url, name, value) {
				var parts = url.split('?');

				var address = parts[0];

				var queryString = parts[1];

				if (!queryString) {
					queryString = '';
				}

				queryString = Liferay.Search.FacetUtil.updateQueryString(name, [value], queryString);

				return address + '?' + queryString;
			},

			setURLParameters: function(key, values, parameterArray) {
				var newParameters = FacetUtil.removeURLParameters(key, parameterArray);

				values.forEach(
					function(item) {
						newParameters = FacetUtil.addURLParameter(key, item, newParameters);
					}
				);

				return newParameters;
			},

			updateQueryString: function(key, selections, queryString) {
				var search = queryString;

				var hasQuestionMark = false;

				if (search[0] === '?') {
					hasQuestionMark = true;
				}

				if (hasQuestionMark) {
					search = search.substr(1);
				}

				var parameterArray = search.split('&').filter(
					function(item) {
						return item.trim() !== '';
					}
				);

				var newParameters = FacetUtil.setURLParameters(key, selections, parameterArray);

				search = newParameters.join('&');

				if (hasQuestionMark) {
					search = '?' + search;
				}

				return search;
			}
		};

		Liferay.namespace('Search').FacetUtil = FacetUtil;
	},
	'',
	{
		requires: []
	}
);