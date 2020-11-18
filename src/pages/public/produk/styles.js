import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fab: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  fabGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    maxWidth: "full",
    marginBottom: theme.spacing(3),
  },
  mediaPromotion: {
    height: 260,
  },
  heading: {
    textAlign: "center",
  },

  media: {
    height: 140,
  },
  mediaiconMenu: {
    width: 100,
  },

  gridContainer: {
    marginTop: theme.spacing(4),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  container: {
    marginTop: theme.spacing(4),
  },
  rootGrid: {
    flexGrow: 1,
  },
  btn: {
    height: 55,
    width: 100,
  },
  descPromotion: {
    marginBottom: theme.spacing(4),
  },
  textNoFound: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(8),
  },
  iconMenu: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  all: {
    margin: theme.spacing(6),
  },
  promote: {
    marginTop: theme.spacing(2),
  },
  menuicon: {
    margin: "auto",
  },
}));

export default useStyles;
