import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  papper: {
    maxWidth: 600,
    margin:"auto",
    padding:theme.spacing(3)
  },
  actionButton: {
    paddingTop: theme.spacing(2),
  }
}));

export default useStyles;
