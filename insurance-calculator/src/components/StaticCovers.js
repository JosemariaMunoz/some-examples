import React from 'react';

import { Box } from '@material-ui/core';

import {useIntl} from 'react-intl';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function StaticCovers(props) {
  const { building, improvements, contents, groundings, liability, degradation, cpackage, coversList, typeOfBusiness, existFireWater } = props.store;

  const intl = useIntl();

  if (!building || !improvements || !contents || !groundings || !liability || !degradation || !cpackage || !coversList || !cpackage || !typeOfBusiness || !existFireWater) {
      return (
      <Box sx={{ mt: 8, mb: 4, mr: 2}}>
          <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              <strong>{intl.formatMessage({id: 'no-additional-covers'})}</strong>
          </Alert>
      </Box>);
  }

  return (  
    <Box sx={{ mt: 8, mb: 4, mr: 2}}>
      <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          + <strong>{intl.formatMessage({id: 'fire-dist-watter-supply-applied'})}</strong>
      </Alert>
    </Box>
  );
}

export default StaticCovers;
