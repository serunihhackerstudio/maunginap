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
    maxWidth: "full",
    marginBottom: theme.spacing(3),
  },
  mediaPromotion: {
    height: 260,
  },

  media: {
    height: 140,
  },

  gridContainer: {
    marginTop: theme.spacing(4),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

export default useStyles;
