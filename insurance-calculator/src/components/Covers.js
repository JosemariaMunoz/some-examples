import React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, Typography } from '@material-ui/core';

import {useIntl} from 'react-intl';

import logo from './../logo.png';


function fixedFloat(nbr, toFixed = 3) {
  return parseFloat(nbr.toFixed(toFixed));
}

function calculator(cover, rate, building, improvements, contents, groundings, liability, degradation, finalCoversList) {
  let price = 0;
  let temp = 0;
  switch (cover) {
    case 'Building':
      price = fixedFloat((building * rate));
      return [parseFloat(building), price/100];
    case 'Improvements':
      price = fixedFloat((improvements * rate));
      return [parseFloat(improvements), price/100];
    case 'Contents':
      price = fixedFloat((contents * rate));
      return [parseFloat(contents), price/100];
    case 'Loss of Profit':
      temp = parseFloat(building) + parseFloat(improvements) + parseFloat(contents);
      price = fixedFloat((temp * rate));
      return [temp, price/100];
    case 'Theft of contents':
      price = fixedFloat((contents * rate));
      return [parseFloat(contents), price/100];
    case 'Operational Liability':
      price = fixedFloat((liability * rate));
      return [parseFloat(liability), price/100];
    case 'Product degradation':
      temp = fixedFloat((contents * degradation) / 100);
      price = fixedFloat((temp * rate));
      return [parseFloat(temp), price/100];
    case 'Earthquake Building':
      temp =  parseFloat(building) +  parseFloat(groundings);
      price = fixedFloat((temp * rate));
      return [temp, price/100];
    case 'Earthquake Improvements of Building':
      price = fixedFloat((improvements * rate));
      return [parseFloat(improvements), price/100];
    case 'Earthquake Contents':
      price = fixedFloat((groundings * rate));
      return [parseFloat(groundings), price/100];
    case 'Earthquake Loss of Profit':
      temp =  parseFloat(building) +  parseFloat(improvements) +  parseFloat(contents);
      price = fixedFloat((temp * rate));
      return [temp, price/100]; 
    default:
      return [0, 0];
  }
}

function Covers(props) {
  const { building, improvements, contents, groundings, liability, degradation, cpackage, coversList, typeOfBusiness, coversSelectionList, existFireWater } = props.store;

  const intl = useIntl();

  function handleTotalPriceChange(value) {
    props.store.totalPrice=value;
  }
  
  function handleListCoversTotalPriceChange(value) {
    props.store.listCoversTotalPrice=value;
  }

  function handleCoversSelectionChange(value) {
    props.dispatch({ type: 'COVERS_SELECTION_LIST', value });
  }

  if (!building || !improvements || !contents || !groundings || !liability || !degradation || !cpackage || !typeOfBusiness) {
    return (<Paper>
      <div style={{ height: 940, width: '100%' }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            {intl.formatMessage({id: 'covers-title'})}
          </Typography>
        </Box>
        <Box sx={{ p: 16 }}>
          <img src={logo} className="App-logo cover-logo" alt="logo" />
          <Typography variant="inherit" gutterBottom>
            <div style={{ color: '#5d5d5d', marginTop: 20 }}>
              <p> {intl.formatMessage({id: 'complete-form'})}</p>
            </div>
          </Typography>
        </Box>
      </div>
    </Paper>);
  }

  const columns = [
    { field: 'covers', headerName: intl.formatMessage({id: 'covers'}), type: 'string', width: 200 },
    { field: 'amount', headerName: intl.formatMessage({id: 'amount'}), type: 'number', width: 160 },
    { field: 'price', headerName: intl.formatMessage({id: 'price'}), type: 'number', width: 160 },
  ];
  
  const rowData = [];
  const cFinalCoversList = [];
  const cSelectionList = [];
    
  let count = 0;
  let currentPrice = 0;

  coversList.forEach(
    function (cCover) {
      if( typeOfBusiness === cCover.business){
        cFinalCoversList.push(cCover);
      }
    }
  );

  cFinalCoversList.forEach(
    function (cover) {
      const newRow = {};
      const calculation = calculator(cover.covers, cover.rate, building, improvements, contents, groundings, liability, degradation, typeOfBusiness);
      newRow.id=count++;
      newRow.covers=cover.covers;
      newRow.amount=calculation[0];
      newRow.price=calculation[1];
      if(coversSelectionList.includes(newRow.id)){
        currentPrice+=calculation[1];
        cSelectionList.push(newRow);
      }
      rowData.push(newRow); 
    }
  );

  if(existFireWater) {
    currentPrice+=150;
  }

  handleListCoversTotalPriceChange(cSelectionList);
  handleTotalPriceChange(fixedFloat(currentPrice));

  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({id: 'covers-title'})}
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <div style={{ height: 840, width: '100%' }}>
          <DataGrid
              rows={rowData}
              columns={columns}
              pageSize={15}
              height={200}
              rowsPerPageOptions={[15]}
              checkboxSelection
              onSelectionModelChange={handleCoversSelectionChange}
              selectionModel={coversSelectionList}
            />
        </div>
      </Box>
    </Paper>
  );
}

export default Covers;
