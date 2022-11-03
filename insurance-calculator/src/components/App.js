import React, {useState} from 'react';
import '../styles/App.css';

import {Container} from '@material-ui/core';
import {Step, Stepper, StepLabel} from '@mui/material';

import InsuranceDetail from './InsuranceDetail';
import UserInfo from './UserInfo';
import ThankYou from './ThankYou';
import useStore from '../useStore';

import LiferayApi from '../common/services/liferay/api';

import {useIntl} from 'react-intl';

function App(){

  const intl = useIntl();

  const [store, dispatch] = useStore();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
      intl.formatMessage({id: 'insurance-details'}),
      intl.formatMessage({id: 'contact-information-review'}),
      intl.formatMessage({id: 'complete'})
    ];

  const current = new Date();

  function postRequest(){

      let cListCoversTotalPrice = store.listCoversTotalPrice;
      const cLCTPString = cListCoversTotalPrice.map((cCover, index) =>
        { return (`{"id":"${cCover.id}","covers":"${cCover.covers}","amount":"${cCover.amount}","price":"${cCover.price}"}`)});

      LiferayApi("o/c/insurancerequests/", {
          method: 'POST', 
          body: {
            "firstName": store.firstName,
            "lastName": store.lastName,
            "emailAddress": store.emailAddress,
            "package": store.cpackage,
            "building": store.building,
            "improvements": store.improvements,
            "contents": store.contents,
            "groundings": store.groundings,
            "liability": store.liability,
            "degradation": store.degradation,
            "totalPrice": store.totalPrice,
            "covers": cLCTPString,
            "typeOfBusiness": store.typeOfBusiness
          }
      })
      .then((result) => {
          console.log("Posted Insurance Request");
          console.log(result.data);
      })
      .catch(console.log)
  }

  function postRequestRaylifeApp(){
    LiferayApi("o/c/raylifeapplications/", {
        method: 'POST', 
        body: {
          "firstName": store.firstName,
          "lastName": store.lastName,
          "email": store.emailAddress,
          "typeOfPackage": store.cpackage,
          "buildingTotal": store.building,
          "improvementsOfBuilding": store.improvements,
          "buildingContents": store.contents,
          "groundings": store.groundings,
          "liability": '',
          "degradationOfTheBuilding": 'a3',
          "productName": "Business Insurance",
          "applicationStatus": 'quoted',
          "applicationCreateDate" : current

        }
    })
    .then((result) => {
        console.log("Posted Raylife App Request");
        console.log(result.data);
    })
    .catch(console.log)
}


  function handleNext(event) {
    setActiveStep(activeStep + 1);
  };

  function handleBack(event) {
    setActiveStep(activeStep - 1);
  };

  function completeRequest(event) {
    postRequest();
    postRequestRaylifeApp();
    setActiveStep(activeStep + 1);
  };

  function startOver(event) {
    setActiveStep(0);
    dispatch({ type: 'RESET' });
  };

  function getStepContent(step) {
      switch (step) {
        case 0:
          return (
                  <InsuranceDetail 
                      handleNext={handleNext}
                      dispatch={dispatch} 
                      store={store} 
                  />
                );
        case 1:
          return (
                  <UserInfo
                    completeRequest={completeRequest}
                    handleBack={handleBack}
                    dispatch={dispatch} 
                    store={store} 
                  />
                 );
        case 2:
          return (<ThankYou
                    startOver={startOver}
                    dispatch={dispatch} 
                    store={store} 
                  />
                 );
        default:
          throw new Error('Unknown step');
      }
    }

  return (
    <Container maxWidth="md" className="App">

      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {getStepContent(activeStep)}

    </Container>
  );
}
export default App;