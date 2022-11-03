import React, {useEffect} from 'react';

import { Grid, Box, Paper, Typography, TextField, Select, Button, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { Checkbox } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import LiferayApi from '../common/services/liferay/api';

import Total from './Total';
import Covers from './Covers';
import StaticCovers from './StaticCovers';

import {useIntl} from 'react-intl';

function InsuranceDetail(props) {

    const intl = useIntl();

    useEffect(() => {
        if(!props.store.initialized){
            fetchPackage();
            fetchTypeOfBusiness();
            handleInitializeChange(true);
        }
    });

    function handleInitializeChange(value) {
        props.dispatch({ type: 'INITIALIZE', value });
    }

    function handleTypeOfBusinessChange(event) {
        let value = event.target.value;
        props.dispatch({ type: 'TYPE_OF_BUSINESS', value });
    }

    function fetchTypeOfBusiness(){
        LiferayApi("o/headless-admin-list-type/v1.0/list-type-definitions/48388")
        .then((result) => {
            console.log("Get list-type-definitions TypeOfBusiness");
            console.log(result.data.listTypeEntries);
            let typeOfBusiness = loadTypeOfBusiness(result.data.listTypeEntries);
            handleTypeOfBusinessListChange(typeOfBusiness);
        })
        .catch(console.log)
    }

    function loadTypeOfBusiness(data){
        let typeOfBusinessList = [];
        for (let key in data){
            let opt = {};
            opt.name = data[key].name;
            opt.key = data[key].key;
            typeOfBusinessList.push(opt);
        }
        return typeOfBusinessList;
    };

    function handleTypeOfBusinessListChange(value) {
        props.dispatch({ type: 'TYPE_OF_BUSINESS_LIST', value });
    }

    function handleBuildingChange(event) {
        let value = event.target.value;
        props.dispatch({ type: 'BUILDING', value });
    }

    function handleImprovementsChange(event) {
        let value = event.target.value;
        props.dispatch({ type: 'IMPROVEMENTS', value });
    }

    function handleContentsChange(event) {
        let value = event.target.value;
        props.dispatch({ type: 'CONTENTS', value });
    }

    function handleGroundingsChange(event) {
        let value = event.target.value;
        props.dispatch({ type: 'GROUNDINGS', value });
    }

    function handleLiabilityChange(event) {
        let value = event.target.value;
        props.dispatch({ type: 'LIABILITY', value });
    }

    function handleDegradationChange(event) {
        let value = event.target.value;
        props.dispatch({ type: 'DEGRADATION', value });
    }

    function handleCpackageChange(event) {
        let value = event.target.value;
        console.log(value);
        fetchCovers(value);
        props.dispatch({ type: 'CPACKAGE', value });
    }

    function fetchPackage(){
        LiferayApi("o/headless-admin-list-type/v1.0/list-type-definitions/44186")
        .then((result) => {
            console.log("Get list-type-definitions Package");
            console.log(result.data.listTypeEntries);
            let cpackage = loadPackage(result.data.listTypeEntries);
            handlePackageListChange(cpackage);
        })
        .catch(console.log)
    }

    function loadPackage(data){
        let packageList = [];
        for (let key in data){
            let opt = {};
            opt.name = data[key].name;
            opt.key = data[key].key;
            packageList.push(opt);
        }
        return packageList;
    };

    function handlePackageListChange(value) {
        props.dispatch({ type: 'PACKAGE_LIST', value });
    }

    function fetchCovers(search){
        LiferayApi("o/c/packagecoversrates?pageSize=-1&search="+search, {
            method: 'GET'
        })
        .then((result) => {
            console.log("Get packagecoversrates");
            console.log(result.data.items);
            let covers = loadCovers(result.data.items);
            handleCoversListChange(covers);
        })
        .catch(console.log)
    }


    function loadCovers(data){
        let coversList = [];
        for (let ckey in data){
            let opt = {};
            opt.rate = data[ckey].rate;
            opt.covers = data[ckey].covers;
            let tempBusiness = data[ckey].typeOfBusiness;
            if(tempBusiness){
                tempBusiness = tempBusiness.key;
            }
            opt.business = tempBusiness;
            coversList.push(opt);
        }
        return coversList;
    };

    function handleCoversListChange(value) {
        props.dispatch({ type: 'COVERS_LIST', value });
    }

    function handleExistFireWaterChange(event) {
        let value = event.target.checked;
        props.dispatch({ type: 'EXIST_FIRE_WATER', value });
    }

    return (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper>
                <div style={{ height: 940, width: '100%' }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            {intl.formatMessage({id: 'insurance-details'})}
                        </Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="package-label">{intl.formatMessage({id: 'package'})}</InputLabel>
                            <Select
                                fullWidth  variant="standard"
                                labelId="package-label"
                                onChange={handleCpackageChange}
                                value={props.store.cpackage}
                            >
                                {Object.entries(props.store.packageList).map(([key, obj], index) => { return (
                                    <MenuItem key={key} value={obj.key}>{obj.name}</MenuItem>
                                )})}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="typeOfBusiness-label">{intl.formatMessage({id: 'type-of-business'})}</InputLabel>
                            <Select
                                fullWidth  variant="standard"
                                labelId="typeOfBusiness-label"
                                onChange={handleTypeOfBusinessChange}
                                value={props.store.typeOfBusiness}
                            >
                                {Object.entries(props.store.typeOfBusinessList).map(([key, obj], index) => { return (
                                    <MenuItem key={key} value={obj.key}>{obj.name}</MenuItem>
                                )})}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <TextField label={intl.formatMessage({id: 'building'})}
                            fullWidth variant="outlined"
                            onChange={handleBuildingChange}
                            value={props.store.building} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <TextField label={intl.formatMessage({id: 'improvements'})}
                            fullWidth variant="outlined"
                            onChange={handleImprovementsChange}
                            value={props.store.improvements} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <TextField label={intl.formatMessage({id: 'contents'})}
                            fullWidth variant="outlined"
                            onChange={handleContentsChange}
                            value={props.store.contents} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <TextField label={intl.formatMessage({id: 'groundings'})}
                            fullWidth variant="outlined"
                            onChange={handleGroundingsChange}
                            value={props.store.groundings} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <TextField label={intl.formatMessage({id: 'liability'})}
                            fullWidth variant="outlined"
                            onChange={handleLiabilityChange}
                            value={props.store.liability} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <TextField label={intl.formatMessage({id: 'degradation'})}
                            fullWidth variant="outlined"
                            onChange={handleDegradationChange}
                            value={props.store.degradation} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <FormGroup>
                            <FormControlLabel
                                labelPlacement="start"
                                
                                control={
                                    <Checkbox
                                        checked={props.store.existFireWater}
                                        onChange={handleExistFireWaterChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                }
                                label={intl.formatMessage({id: 'fire-dist-watter-supply'})}
                            />
                            </FormGroup>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button fullWidth onClick={props.handleNext}
                            variant="contained" color="primary">
                            {intl.formatMessage({id: 'next'})}
                        </Button>
                    </Box>
                </div>
            </Paper>
          </Grid>
          <Grid item xs={8}>
                <Covers store={props.store} dispatch={props.dispatch} />
          </Grid>
          
          <Grid item xs={8}>
            <Paper>
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
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
                <div style={{ height: 170, width: '100%' }}>
                    <Total store={props.store} />
                </div>
            </Paper>
          </Grid>
          
        </Grid>
    )
}

export default InsuranceDetail;