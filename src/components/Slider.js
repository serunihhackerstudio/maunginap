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
import {useFirebase} from "../components/FirebaseProvider"
import { useCollection } from "react-firebase-hooks/firestore";
import Image from 'material-ui-image'
import { isBrowser } from "react-device-detect";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



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
    height: 270,
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
  const {firestore} = useFirebase()
  const produkStorageItem = firestore.collection("promosi")
  const [snapshot, loading] = useCollection(produkStorageItem)
  const [tutorialSteps, setTutorialSteps] = React.useState([])
  console.clear(loading)
  React.useEffect(() => {
    if (snapshot){
      setTutorialSteps(snapshot.docs)
    }
  }, [snapshot])

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
        {tutorialSteps.map((step, index) => {
          const img = step.data().url
          return (
          <div key={index}>
            {isBrowser ? (
              <>
              {Math.abs(activeStep - index) <= 2 ? (
                <CardMedia
                  className={classes.img}
                  image={img}
                  alt={step.id}
                />
              ) : null}
              </>
            ) : (
              <>
              {Math.abs(activeStep - index) <= 2 ? (
                <Image src={img} aspectRatio={2/1} alt={step.id} />
              ) : null}
              </>
            )}
            
          </div>
        )}
        )}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {/* Next */}
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
            {/* Back */}
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;
