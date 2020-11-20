import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
  forgotPassword: {
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
