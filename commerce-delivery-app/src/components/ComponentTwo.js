import React from 'react';

import {useIntl} from 'react-intl';

import { Grid, Box, Button } from '@material-ui/core';

import ComponentTwoForm from './ComponentTwoForm';


function ComponentTwo(props) {

  const intl = useIntl();

  const { shipmentQuantity } = props.store;

  return (  

    <Box sx={{ mb: 2 }}>
      <Box sx={{ pr: 2 }}>
        <ComponentTwoForm 
        dispatch={props.dispatch} 
        store={props.store}
        />
      </Box>
      <Box sx={{ pr: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
            <Button
                  disabled={false}
                  onClick={() => {
                    props.handleReset()}}
                  sx={{ mt: 1, mr: 1 }}
              >
                {intl.formatMessage({id: 'back'})}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                
                props.handleNext();
              }}
              sx={{ mt: 1, mr: 1 }} 
              color="primary"
              disabled={shipmentQuantity<=0?true:false}
              >
            {intl.formatMessage({id: 'shipment-confirmation'})}
            </Button>
          </Grid>        
          <Grid item xs={6} style={{textAlign: 'right'}}>
            <Button
              variant="contained"
              onClick={props.handleNext}
              sx={{ mt: 1, mr: 1, textAlign: 'right' }} 
              color="primary"
              >
                {intl.formatMessage({id: 'add-more-to-truck'})}
            </Button>              
          </Grid>
        </Grid>
      </Box> 
    </Box>
  );
}

export default ComponentTwo;
