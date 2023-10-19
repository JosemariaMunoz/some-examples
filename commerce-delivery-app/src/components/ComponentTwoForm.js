import React from 'react';

import {useIntl} from 'react-intl';

import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';

import { Grid, Box, Typography, Slider, Paper } from '@material-ui/core';

import truck from '../images/truck-icon-8998.png';

import { Liferay } from "../common/services/liferay/liferay";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} style={{width: '100px', height: '100px'}}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center' 
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
          style={{fontSize: "1.75rem"}}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}


function ComponentTwoForm(props) {

  const intl = useIntl();

  const { orderItemData } = props.store;

  const [progress, setProgress] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const itemsPerTruck = 100;

  const currentLanguage = Liferay.ThemeDisplay.getLanguageId();

  const handleChange = (event: Event, newValue: number) => {
    setValue(newValue);
    //props.store.shipmentQuantity = newValue;
    handleShipmentQuantity(newValue);
    setProgress(newValue % itemsPerTruck);
  };

  function handleShipmentQuantity(value) {
    props.dispatch({ type: 'SHIPMENT_QUANTITY', value });
    
  }

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: orderItemData.quantity,
      label: orderItemData.quantity,
    },
  ];

  let title = '';
  if(orderItemData.name){
    title = orderItemData.name[currentLanguage];
  }

  function handleNumberOfTrucks(value) {
    props.store.numberOfTrucks = value;
  }

  handleNumberOfTrucks(Math.ceil(value / itemsPerTruck));

  return (  

    <Box sx={{ mb: 2 }}>
      <Box pr={2} pb={2}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box sx={{ pb: 0, pl: 4, pt: 3, pr: 4 }}>
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
                      {orderItemData.quantity}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ pb: 4, pl: 3, pt: 3, pr: 3 }}>
              <Typography variant="h5" gutterBottom >
                <Box sx={{color: "#E07A5F"}}>
                {intl.formatMessage({id: 'number-of-items'})}
                </Box>
              </Typography>
              <Slider 
                defaultValue={0} 
                aria-label="Default" 
                valueLabelDisplay="auto"
                min={0}
                max={orderItemData.quantity} 
                onChange={handleChange}
                marks={marks}
                />
            </Box>
          </Grid>
          <Grid item xs={6}>
              <Paper elevation={3} >
                <Grid container>
                  <Grid item xs={8}>
                      <img src={truck} 
                      style={(progress===0)?imgStyles.imageGreen:imgStyles.imageOriginal}               
                      alt="logo" width="70%" align="bottom" />
                  </Grid>
                  <Grid item xs={4} style={{margin: "auto"}}>
                    <CircularProgressWithLabel value={progress} />
                  </Grid>
                </Grid>
                <Box sx={{ pb: 4, pl: 4, pt: 0 }}>
                    <Typography variant="h4" gutterBottom>
                     Using {Math.ceil(value / itemsPerTruck)}x truck/s
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                     Still {100-progress}% to complete {(progress===0)?"NEXT":"CURRENT"}  truck
                    </Typography>
                </Box>
              </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const imgStyles = {
  imageGreen: {
    filter: "invert(28%) sepia(100%) hue-rotate(59deg) saturate(3)",
    paddingLeft: "40px"
  },
  imageOriginal: {
    paddingLeft: "40px"
  }
};

export default ComponentTwoForm;


