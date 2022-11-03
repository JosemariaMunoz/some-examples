import React from 'react';

import { Box, Typography } from '@material-ui/core';
import {useIntl} from 'react-intl';

function fixedFloat(nbr, toFixed = 3) {
  return parseFloat(nbr.toFixed(toFixed));
}

function Total(props) {
  const { building, improvements, contents, groundings, liability, degradation, cpackage, coversList, totalPrice, typeOfBusiness } = props.store;

  const intl = useIntl();

  if (!building || !improvements || !contents || !groundings || !liability || !degradation || !cpackage || !coversList || !cpackage || !typeOfBusiness) {
    return (
      <Box sx={{ p: 4 }}>
          <Typography variant="h4" color="primary">
              {intl.formatMessage({id: 'default-total'})}
          </Typography>
      </Box>);
  }


  return (  
      <Box sx={{ p: 4 }}>        
          <Typography variant="h4" color="primary">
            {fixedFloat(totalPrice)} €
          </Typography>
      </Box>
  );
}

export default Total;
