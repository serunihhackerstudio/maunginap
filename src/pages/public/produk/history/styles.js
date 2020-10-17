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
    maxWidth: 950,
    marginBottom: theme.spacing(2),
  },
  image: {
    width: 90,
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
  },
  formControl: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  waiting: {
    fontSize: 12,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  rowDivider: {
    marginBottom: theme.spacing(2),
  },
  totalBayar: {
    textAlign: "left",
  },
  actionBtn: {
    marginLeft: theme.spacing(2),
  },
  status: {
    textAlign: "center",
  },
  dateDivider: {
    marginBottom: theme.spacing(2),
  },
  emptyCol: {
    width: 700,
  },
  orderDate: {
    textAlign: "center",
  },
  rating:{
    textAlign: "center",
  }
}));

export default useStyles;
