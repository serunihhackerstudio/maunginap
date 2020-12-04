import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import fingerprint from "../../../assets/fingerprint.png";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Users from "../users";
const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  logo: {
    marginTop: theme.spacing(5),
    textAlign: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  progress: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs>
        <Users />
      </Grid>
      <Grid item xs>
      <div className={classes.logo}>
        <img src={fingerprint} width={250} />
      </div>
      <div className={classes.text}>
        <Typography variant="h5" color="textSecondary">
          Welcome Super Admin
        </Typography>
      </div>
      <Container maxWidth="xs">
        <div className={classes.progress}>
          <LinearProgress />
        </div>
      </Container>
      </Grid>
    </Grid>
  );
}

export default Home;
