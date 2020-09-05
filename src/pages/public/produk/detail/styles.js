import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  papperPage: {
    padding: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 800,
  },
  image: {
    width: 300,
    height: "auto",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  btn: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  formControl: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
