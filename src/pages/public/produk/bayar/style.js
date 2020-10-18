import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  card: {
    display: "flex",
  },
  foto: {
    width: 150,
  },
  fotoPlaceholder: {
    width: 150,
    alignSelf: "center",
    textAlign: "center",
  },
  decoration: {
    textDecoration: "none",
    color: "black",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  heading: {},
  headline: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
  },
  headingCenter: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  deskripsi: {
    fontSize: 16,
  },
  cekPesanan: {
    marginTop: theme.spacing(2),
  },
  progressPembayaran: {
    justifyContent: "center",
  },
  buttonGrid:{
    marginTop:theme.spacing(2),
    marginLeft:theme.spacing(1)
  }
}));

export default useStyles;
