import './App.css';

import {useIntl} from 'react-intl';
import useStore from './global/useStore';
import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import ComponentOne from './components/ComponentOne';
import ComponentTwo from './components/ComponentTwo';
import ComponentThree from './components/ComponentThree';

function App({idchannel, idaccount, warehouseid, createShipment}) {

  const intl = useIntl();
  const [store, dispatch] = useStore();
  const [activeStep, setActiveStep] = useState(0);

  console.log(idchannel);
  console.log(idaccount);
  console.log(warehouseid);
  console.log(createShipment);

  store.idchannel = idchannel;
  store.idaccount = idaccount;
  store.warehouseid = warehouseid;
  store.createShipment = createShipment;
  
  const steps = [
    {
      label: intl.formatMessage({id: 'step-one'}),
      description: intl.formatMessage({id: 'step-one-description'})
    },
    {
      label: intl.formatMessage({id: 'step-two'}),
      description: intl.formatMessage({id: 'step-two-description'})
    },
    {
      label: intl.formatMessage({id: 'step-three'}),
      description: intl.formatMessage({id: 'step-three-description'})
    }
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    //setActiveStep(0);
    //dispatch({ type: 'RESET' });
    window.location.reload();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ComponentOne 
            handleNext={handleNext}
            dispatch={dispatch} 
            store={store}
            />
              );
      case 1:
        return (
          <ComponentTwo 
            handleNext={handleNext}
            handleBack={handleBack}
            handleReset={handleReset}
            dispatch={dispatch} 
            store={store}
            />
               );
      case 2:
        return (
          <ComponentThree 
            handleNext={handleNext}
            handleBack={handleBack}
            handleReset={handleReset}
            dispatch={dispatch} 
            store={store}
            />
               );        
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
                optional={
                  index === 3 ? (
                    <Typography variant="caption">{intl.formatMessage({id: 'step-three-description'})}</Typography>
                  ) : null
                }
            >
                {step.label}
            </StepLabel>
            <StepContent sx={{ pb: 1}}>
              <Typography variant="h4">{step.description}</Typography>
              <Paper sx={{ pt: 5}} elevation={0}>
                {getStepContent(activeStep)}
              </Paper>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default App;
