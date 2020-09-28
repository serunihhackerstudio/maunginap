import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "Banner 1",
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/maunginap-bc894.appspot.com/o/promosi%2Fbenner%20baru.jpg?alt=media&token=54617058-3c87-4674-af44-f9a1654d545a",
  },
  {
    label: "Banner 2",
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/maunginap-bc894.appspot.com/o/promosi%2Fbenner%20baru%20kos.jpg?alt=media&token=6daab7ec-e6b1-4df1-a3b1-fadf32c2cb74",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "full",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 250,
    display: "block",
    maxWidth: "full",
    overflow: "hidden",
    width: "100%",
  },
}));

function SwipeableTextMobileStepper({ classMedia }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}></Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <CardMedia
                className={classes.img}
                image={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;
