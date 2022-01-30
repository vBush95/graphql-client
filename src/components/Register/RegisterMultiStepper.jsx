import React, { useState, useContext } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Box from "@mui/material/Box";

import styled from "@emotion/styled";

const steps = ["Register-Key", "Email", "Username", "Password"];

const RegisterMultiStepper = ({
  updateStep,
  activeStep,
  isStepSkipped,
  isStepOptional,
  handleNextStep,
  handleBack,
  handleSkip,
}) => {
  const handleReset = () => {
    updateStep(0);
  };

  function StepIcons(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <RegisterKeyIcon className="fas fa-key" />,

      2: <EmailIcon className="fas fa-envelope" />,
      3: <UsernameIcon className="fas fa-signature" />,
      4: <PasswordIcon className="fas fa-unlock" />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <MultiStepperContainer>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<ColorlibConnector />}
      >
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
              <StepLabel {...labelProps} StepIconComponent={StepIcons}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNextStep}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </MultiStepperContainer>
  );
};

export default RegisterMultiStepper;

/*
<Checkmark
            className="fas fa-check"
            active={active}
            completed={completed}
            /> */

const MultiStepperContainer = styled.div`
  padding: 2rem;
`;

const Checkmark = styled.i`
  font-size: 1rem;
  postition: absolute;
  top: 2rem;
`;

const RegisterKeyIcon = styled.i`
  font-size: 1.5rem;
`;
const EmailIcon = styled.i`
  font-size: 1.5rem;
`;

const UsernameIcon = styled.i`
  font-size: 1.5rem;
`;

const PasswordIcon = styled.i`
  font-size: 1.5rem;
`;
/*
const ColorlibStepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: "3rem",
  height: "3rem",
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

const ColorlibConnector = styled(StepConnector)(({}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));
*/

const ColorlibStepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: "3rem",
  height: "3rem",
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    background:
      "linear-gradient(45deg, rgba(16,242,255,0.3) 0%, rgba(0,134,255,1) 100%)",
    boxShadow: "0 8px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    background:
      "linear-gradient(90deg, rgba(153,153,153,0.3) 0%, rgba(153,153,153,1) 100%)",
  }),
}));

const ColorlibConnector = styled(StepConnector)(({}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background:
        "linear-gradient(90deg, rgba(153,153,153,1) 0%, rgba(255,255,255,0) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background:
        "linear-gradient(90deg, rgba(153,153,153,1) 0%, rgba(255,255,255,0) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));
