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
    borderRadius: 20,
    background: "linear-gradient(180deg, #ffffff 0%, #ECFDF5 100%)",
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
    width: 84,
    height: 84,
    objectFit: "contain",
    margin: theme.spacing(2),
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
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  semuaPenginapan: {
    margin: "auto",
    marginTop: theme.spacing(6),
  },
  ico: {
    marginLeft: theme.spacing(-1),
  },
  bottomNav: {
    width: "auto",
    position: "absolute",
  },
}));

export default useStyles;
