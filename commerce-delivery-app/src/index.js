import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './global/theme';
import App from './App';

import { IntlProvider } from 'react-intl';
import { Liferay } from './common/services/liferay/liferay';

import common_en from "./translations/en/common.json";
import common_es from "./translations/es/common.json";
import common_de from "./translations/de/common.json";


const languageFiles = {
  "en":common_en,
  "es":common_es,
  "de":common_de,
}

function getLiferayLanguageChoice() {
	try {
		// eslint-disable-next-line no-undef
		const languageId = Liferay.ThemeDisplay.getLanguageId();

		return languageId.split("_")[0];
	} catch (error) {
		console.warn('Not able to find Liferay Language Setting\n', error);

		return 'en'; //Fallback language
	}
};



class BaseReactApp extends HTMLElement {
  connectedCallback() {

    let i18nConfig = {
      locale: 'en',
      messages: languageFiles[getLiferayLanguageChoice()]
    };

    createRoot(this).render(
      <IntlProvider
        locale={i18nConfig.locale}
        defaultLocale={i18nConfig.locale}
        messages={i18nConfig.messages}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App 
            idchannel={this.getAttribute('idchannel')} 
            idaccount={this.getAttribute('idaccount')}
            warehouseid={this.getAttribute('warehouseid')}
            createShipment={this.getAttribute('createShipment')}/>
        </ThemeProvider>
      </IntlProvider>
    );
  }
}

const ELEMENT_ID = 'commerce-delivery-app';

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, BaseReactApp);
}