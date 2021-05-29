import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "full",
    textAlign: "center",
  },
  mypaper: {
    padding: theme.spacing(3),
  },
  text:{
    marginBottom:theme.spacing(4),
  },
  paper2:{
    margin:theme.spacing(2)
  }
}));

export default useStyles;
