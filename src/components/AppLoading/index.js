import React from "react";

import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

function AppLoading({ message }) {
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <div className={classes.loadingBox}>
        <Typography component="h2" variant="h6" className={classes.title}>
          {message}
        </Typography>
        <LinearProgress />
      </div>
    </Container>
  );
}

export default AppLoading;
