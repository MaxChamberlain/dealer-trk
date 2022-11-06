import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VehicleDetailsAddition from './VehicleDetailsAddition';
import { TransitionGroup } from "react-transition-group"
import DocumentItem from './DocumentItem';
import { insertDocument } from '../../../utils/api';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

const steps = ['Basic Vehicle Information', 'Pricing Information', 'Trade Information'];

export default function HorizontalLinearStepper({ activeStep, setActiveStep, newVehicle, setNewVehicle, setCompany, company, companyDetails }) {
    const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if(activeStep === steps.length - 1){
        insertDocument(
            {
                head: company,
                body: newVehicle
            },
            1,
            () => {setNewVehicle({
              v_is_certified: false,
              v_is_trade: false,
            })},
            () => {}
        )
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
        {activeStep === 0 && <Step1 newVehicle={newVehicle} setNewVehicle={setNewVehicle} company={company} setCompany={setCompany} companyDetails={companyDetails} />}
        {activeStep === 1 && <Step2 newVehicle={newVehicle} setNewVehicle={setNewVehicle} company={company} setCompany={setCompany} companyDetails={companyDetails} />}
        {activeStep === 2 && <Step3 newVehicle={newVehicle} setNewVehicle={setNewVehicle} company={company} setCompany={setCompany} companyDetails={companyDetails} />}
        {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <DocumentItem doc={newVehicle} />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button 
            variant='contained'
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
          {console.log(company)}
            <Button 
              onClick={handleNext} 
              variant='contained'
              disabled={(
                activeStep === 0 && newVehicle.v_stock_no && newVehicle.v_make && newVehicle.v_model && newVehicle.v_package && newVehicle.v_vin_no) ?
                false : 
                (activeStep === 1 && newVehicle.v_margin && newVehicle.v_source && newVehicle.v_days && newVehicle.v_start_price && newVehicle.v_sell_price && newVehicle.v_market_percent && newVehicle.v_initial_mmr && newVehicle.v_initial_carg_h && newVehicle.v_final_mmr && newVehicle.v_final_carg_h) ?
                false :
                (activeStep === 2  && company !== 'Select A Company') ?
                false :
                true
              }
            >
              {activeStep === steps.length - 1 ? 'Finish' :
              'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
