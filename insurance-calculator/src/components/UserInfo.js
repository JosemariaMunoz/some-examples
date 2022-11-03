import React from 'react';

import { Grid, Box, Paper, Typography, TextField, Button } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';

import Total from './Total';
import StaticCovers from './StaticCovers';

import {useIntl} from 'react-intl';

function UserInfo(props) {

  const intl = useIntl();

  function handleFirstNameChange(event) {
    let value = event.target.value
    props.dispatch({ type: 'FIRST_NAME', value });
  }

  function handleLastNameChange(event) {
    let value = event.target.value
    props.dispatch({ type: 'LAST_NAME', value });
  }

  function handleEmailChange(event) {
    let value = event.target.value
    props.dispatch({ type: 'EMAIL_ADDRESS', value });
  }

  function getLiferayUserID() {
    try {
      // eslint-disable-next-line no-undef
      const userId = Liferay.ThemeDisplay.getUserId();
  
      return userId;
    } catch (error) {
      console.warn('Not able to find Liferay userID\n', error);
  
      return ''; 
    }
  };

  function getLiferayUserName() {
    try {
      // eslint-disable-next-line no-undef
      const userName = Liferay.ThemeDisplay.getUserName();
  
      return userName;
    } catch (error) {
      console.warn('Not able to find Liferay userName\n', error);
  
      return ''; 
    }
  };
  
  const columns = [
    { field: 'covers', headerName: intl.formatMessage({id: 'covers'}), type: 'string', width: 200 },
    { field: 'amount', headerName: intl.formatMessage({id: 'amount'}), type: 'number', width: 160 },
    { field: 'price', headerName: intl.formatMessage({id: 'price'}), type: 'number', width: 160 },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                  {intl.formatMessage({id: 'in-review'})}
              </Typography>
            </Box>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box sx={{ p: 2 }}>
                <TextField label={intl.formatMessage({id: 'package'})} 
                    fullWidth disabled variant="outlined"
                    value={props.store.cpackage} />
              </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2 }}>
                  <TextField label={intl.formatMessage({id: 'type-of-business'})}
                      fullWidth disabled variant="outlined"
                      value={props.store.typeOfBusiness} />
                </Box>
              </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box sx={{ p: 2 }}>
                <TextField label={intl.formatMessage({id: 'building'})} 
                    fullWidth disabled variant="outlined"
                    value={props.store.building} />
              </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2 }}>
                  <TextField label={intl.formatMessage({id: 'improvements'})}
                      fullWidth disabled variant="outlined"
                      value={props.store.improvements} />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box sx={{ p: 2 }}>
                  <TextField label={intl.formatMessage({id: 'contents'})}
                      fullWidth disabled variant="outlined"
                      value={props.store.contents} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2 }}>
                    <TextField label={intl.formatMessage({id: 'groundings'})}
                        fullWidth disabled variant="outlined"
                        value={props.store.groundings} />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box sx={{ p: 2 }}>
                    <TextField label={intl.formatMessage({id: 'liability'})}
                        fullWidth disabled variant="outlined"
                        value={props.store.liability} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2 }}>
                    <TextField label={intl.formatMessage({id: 'degradation'})}
                        fullWidth disabled variant="outlined"
                        value={props.store.degradation} />
                </Box>
              </Grid>
            </Grid>
            <Divider variant="middle" />
            <Box sx={{ p: 2 }}>
              <div style={{ height: 690, width: '100%' }}>
                <DataGrid
                  rows={props.store.listCoversTotalPrice}
                  columns={columns}
                  pageSize={15}
                  height={200}
                  rowsPerPageOptions={[15]}
                />
              </div>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div style={{ height: 170, width: '100%' }}>
                    <Grid container>
                        <Grid item xs={4}>
                            <div style={{ textAlign: 'left' }}>
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="h2">
                                        {intl.formatMessage({id: 'total'})}
                                    </Typography>
                                </Box>
                            </div>
                        </Grid>
                        <Grid item xs={8}>                    
                            <div style={{ textAlign: 'left'}}>
                                <StaticCovers store={props.store} />
                            </div>
                        </Grid>
                    </Grid>
                  </div>
              </Grid>
              <Grid item xs={4}>
                <Total store={props.store} />
              </Grid>
            </Grid>
        </Paper> 
      </Grid>
      <Grid item xs={12}>
        <Paper>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                {intl.formatMessage({id: 'agent-information'})}
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <TextField label={intl.formatMessage({id: 'agent-id'})}
                  fullWidth disabled variant="outlined"
                  value={getLiferayUserID()} />
            </Box>
            <Box sx={{ p: 2 }}>
              <TextField label={intl.formatMessage({id: 'full-name'})}
                  fullWidth disabled variant="outlined"
                  value={getLiferayUserName()} />
            </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                {intl.formatMessage({id: 'your-contact-information'})}
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <TextField label={intl.formatMessage({id: 'first-name'})}
                  fullWidth variant="outlined"
                  onChange={handleFirstNameChange}
                  value={props.store.firstName} />
            </Box>
            <Box sx={{ p: 2 }}>
                <TextField label={intl.formatMessage({id: 'last-name'})} 
                    fullWidth variant="outlined"
                    onChange={handleLastNameChange}
                    value={props.store.lastName} />
            </Box>
            <Box sx={{ p: 2 }}>
                <TextField label={intl.formatMessage({id: 'email-address'})}
                    fullWidth variant="outlined"
                    onChange={handleEmailChange}
                    value={props.store.emailAddress} />
            </Box>
            <Box sx={{ p: 2 }}>
              <Button fullWidth onClick={props.completeRequest}
                  variant="contained" color="primary">
                  {intl.formatMessage({id: 'submit-request'})}
              </Button>
            </Box>
            <Box sx={{ p: 2 }}>
              <Button fullWidth onClick={props.handleBack}
                  variant="contained" color="secondary">
                  {intl.formatMessage({id: 'previous'})}
              </Button>
            </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
        
export default UserInfo;