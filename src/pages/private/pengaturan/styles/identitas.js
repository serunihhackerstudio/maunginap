import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pengaturanIdentitas: {
    display: "flex",
    flexDirection: "column",
    width: 600,
  },
  tombolSimpan: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default useStyles;
