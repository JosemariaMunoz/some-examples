import React from 'react';

import {useIntl} from 'react-intl';

import { Liferay } from "../common/services/liferay/liferay";


function ReportTemplate(props) {

    const intl = useIntl();
   
    const { orderItemData, numberOfTrucks, shipmentQuantity } = props.store;

    const currentLanguage = Liferay.ThemeDisplay.getLanguageId();
   
    const styles = {
        page: {
            marginLeft: '1rem',
            marginRight: '1rem',
            'page-break-after': 'always',
            textAlign: 'center'
        },

        columnLayout: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '400px'
        },

        column: {
            display: 'flex',
            flexDirection: 'column',
            width: '200px'
        },

        spacer2: {
            height: '2rem',
        },

        fullWidth: {
            width: '100%',
        },

        marginb0: {
            marginBottom: 0,
            width: '200px',
            fontSize: '12px',
            textAlign: 'left'
        },

        introText: {
            width: '400px',
            paddingTop: '30px',
            paddingBottom: '0px'
        }

    };
    
    let title = '';
    if(orderItemData.name){
      title = orderItemData.name[currentLanguage];
    }

return (
    <div style={styles.page}>
        <div style={styles.page}>
            <h2 style={styles.introText}>
                Shipment Confirmation
            </h2>
        </div>
        <div style={styles.page}>
            <div>
                <h3 style={styles.introText}>
                    This is the confirmation of the shipping with the following data:
                </h3>
            </div>

            <div style={styles.columnLayout}>
                <div style={styles.column}>
                    <h5 style={styles.marginb0}>Field</h5>
                </div>

                <div style={styles.column}>
                    <h4 style={styles.marginb0}>Value</h4>
                </div>
            </div>
            

                <>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                        Product:
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                        {title}
                        </p>
                    </div>
                </div>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                        SKU:
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                        {orderItemData.sku}
                        </p>
                    </div>
                </div>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                        Ext. Ref. Code:
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                        {orderItemData.externalReferenceCode}
                        </p>
                    </div>
                </div>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                        Unit Price:
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                        {orderItemData.unitPrice}€
                        </p>
                    </div>
                </div>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                        Total quantity ordered:
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                        {shipmentQuantity}
                        </p>
                    </div>
                </div>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                        Number of Trucks:
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                        {numberOfTrucks}
                        </p>
                    </div>
                </div>
                
                </>
                

        </div>
    </div>
 );
}
export default ReportTemplate;