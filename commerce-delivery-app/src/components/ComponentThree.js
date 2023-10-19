import React, { useEffect } from 'react';

import {useIntl} from 'react-intl';

import { Grid, Box, Button, Typography, Paper } from '@material-ui/core';

import LiferayApi from '../common/services/liferay/api';

import { useRef } from 'react';
import jsPDF from 'jspdf';

import ReportTemplate from '../components/ReportTemplate';

import { Liferay } from "../common/services/liferay/liferay";


function ComponentThree(props) {

  const intl = useIntl();

  // Local
  //const warehouseId = 56897;

  // Demo 
  //const warehouseId = 41137;

  const { orderItemData, numberOfTrucks, shipmentQuantity, idaccount, warehouseid, createShipment } = props.store;

  const currentLanguage = Liferay.ThemeDisplay.getLanguageId();

  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'px',
      
    });

    // Adding the fonts.
    doc.setFont('Inter-Regular', 'normal');

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save('shipment_confirmation');
      },
    });
  };

  let title = '';
  if(orderItemData.name){
    title = orderItemData.name[currentLanguage];
  }
  console.log(title);


  function getAccountAddresses(idAccount){
    LiferayApi('/o/headless-commerce-admin-account/v1.0/accounts/'+idAccount+'/accountAddresses')
    .then((result) => {
        console.log("getAccountAddresses");
        console.log(result);
        if(createShipment === 'true'){
          console.log('CreateShipment');
          callCreateShipment(result.data.items[0]);
        }
        console.log('showShipmentBody');
        showShipmentBody(result.data.items[0]);
    })
    .catch(console.log)
  }

  function showShipmentBody(addressInfo){
    const body = {
        "orderId": orderItemData.orderId,
        "shipmentItems": [
          {
            "orderItemId": orderItemData.id,
            "quantity": shipmentQuantity,
            "shipmentExternalReferenceCode": "",
            "unitOfMeasureKey": "s",
            "validateInventory": true,
            "warehouseId": warehouseid
          }
        ],
        "shippingAddress": {
          "city": addressInfo.city,
          "countryISOCode": addressInfo.countryISOCode,
          "description": addressInfo.description,
          "id": addressInfo.id,
          "latitude": addressInfo.latitude,
          "longitude": addressInfo.longitude,
          "name": addressInfo.name,
          "phoneNumber": addressInfo.phoneNumber,
          "regionISOCode": addressInfo.regionISOCode,
          "street1": addressInfo.street1,
          "street2": addressInfo.street2,
          "street3": addressInfo.street3,
          "zip": addressInfo.zip
        },
        "shippingAddressId": addressInfo.id
      };
    console.log(body);
  }

  function callCreateShipment(addressInfo){
    LiferayApi('/o/headless-commerce-admin-shipment/v1.0/shipments', {
      method: 'POST', 
      body: {
        "orderId": orderItemData.orderId,
        "shipmentItems": [
          {
            "orderItemId": orderItemData.id,
            "quantity": shipmentQuantity,
            "shipmentExternalReferenceCode": "",
            //"unitOfMeasureKey": "s",
            "validateInventory": true,
            "warehouseId": warehouseid
          }
        ],
        "shippingAddress": {
          "city": addressInfo.city,
          "countryISOCode": addressInfo.countryISOCode,
          "description": addressInfo.description,
          "id": addressInfo.id,
          "latitude": addressInfo.latitude,
          "longitude": addressInfo.longitude,
          "name": addressInfo.name,
          "phoneNumber": addressInfo.phoneNumber,
          "regionISOCode": addressInfo.regionISOCode,
          "street1": addressInfo.street1,
          "street2": addressInfo.street2,
          "street3": addressInfo.street3,
          "zip": addressInfo.zip
        },
        "shippingAddressId": addressInfo.id
      }
    })
    .then((result) => {
      console.log("Create Shipment");
      console.log(result);
    })
    .catch(console.log)
  }

  useEffect(() => {
    getAccountAddresses(idaccount);
  }, []);

  return (   

    <Box sx={{ pb: 4 }}>
      <Paper elevation={3} >
        <Box sx={{ pb: 7, pl: 5, pt: 5, pr: 5 }}>
          <Box sx={{ pb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {intl.formatMessage({id: 'shipment-confirmation'})}
            </Typography>
          </Box>
         <Grid container spacing={3}>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Typography>
                    <Box sx={{ 
                      fontWeight: 'bold',
                      textAlign: 'left',
                      fontSize: 16
                    }}>  
                    Product:
                  </Box>
                  </Typography>                
                </Grid>
                <Grid item xs={9}>
                  <Typography>
                    <Box sx={{
                        textAlign: 'left',
                        fontSize: 16
                      }}>  
                      {title}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: "0px" }}>
                  <Typography>
                    <Box sx={{ 
                        fontWeight: 'bold',
                        textAlign: 'left',
                        fontSize: 14
                      }}>  
                      SKU:
                    </Box>
                  </Typography>                
                </Grid>
                <Grid item xs={9} style={{ paddingTop: "0px" }}>
                  <Typography>
                    <Box sx={{
                        textAlign: 'left',
                        fontSize: 14
                      }}>  
                      {orderItemData.sku}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: "0px" }}>
                  <Typography>
                    <Box sx={{ 
                        fontWeight: 'bold',
                        textAlign: 'left',
                        fontSize: 14
                      }}>  
                      Ext. Ref. Code:
                    </Box>
                  </Typography>                
                </Grid>
                <Grid item xs={9} style={{ paddingTop: "0px" }}>
                  <Typography>
                    <Box sx={{
                        textAlign: 'left',
                        fontSize: 14
                      }}>  
                      {orderItemData.externalReferenceCode}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: "0px" }}>
                  <Typography>
                    <Box sx={{ 
                        fontWeight: 'bold',
                        textAlign: 'left',
                        fontSize: 14
                      }}>  
                      Unit Price:
                    </Box>
                  </Typography>                
                </Grid>
                <Grid item xs={9} style={{ paddingTop: "0px" }}>
                  <Typography>
                    <Box sx={{
                        textAlign: 'left',
                        fontSize: 14
                      }}>  
                      {orderItemData.unitPrice}€
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: "0px" }}>
                  <Typography>
                    <Box sx={{ 
                        fontWeight: 'bold',
                        textAlign: 'left',
                        fontSize: 14
                      }}>  
                      Total quantity ordered:
                    </Box>
                  </Typography>                
                </Grid>
                <Grid item xs={9} style={{ paddingTop: "0px" }}>
                  <Typography>
                    <Box sx={{
                        textAlign: 'left',
                        fontSize: 14
                      }}>  
                      {shipmentQuantity}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: "0px" }}>
                  <Typography>
                    <Box sx={{ 
                        fontWeight: 'bold',
                        textAlign: 'left',
                        fontSize: 14
                      }}>  
                      Number of Trucks:
                    </Box>
                  </Typography>                
                </Grid>
                <Grid item xs={9} style={{ paddingTop: "0px" }}>
                  <Typography>
                    <Box sx={{
                        textAlign: 'left',
                        fontSize: 14
                      }}>  
                      {numberOfTrucks}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'center', marginTop: '-90px' }}>
              <img src="https://webserver-lctbots6-prd.lfr.cloud/documents/d/liferaybotics/checked" 
                  alt="gifcheck" 
                  width="70%" align="bottom" style={{ paddingLeft: "40px" }} />      
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Box sx={{ pr: 2, pt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={handleGeneratePdf}
                sx={{ mt: 1, mr: 1, textAlign: 'right' }} 
                color="primary"
                >
                  {intl.formatMessage({id: 'print'})}
              </Button>
            </Grid>        
            <Grid item xs={6} style={{textAlign: 'right'}}>
              <Button
                variant="contained"
                onClick={props.handleReset}
                sx={{ mt: 1, mr: 1 }} 
                color="secondary"
                >
              {intl.formatMessage({id: 'start-again'})}
              </Button>            
            </Grid>
          </Grid>
          <Box sx={{ display: 'none' }}>
            <div ref={reportTemplateRef}>
              <ReportTemplate store={props.store}/>
            </div>
          </Box>
        </Box> 
    </Box>
  );
}

export default ComponentThree;
