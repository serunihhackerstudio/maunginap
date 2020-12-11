import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  hideInputFile: {
    display: "none",
  },
  uploadFotoProduk: {
    textAlign: "center",
    padding: theme.spacing(3),
  },
  formEditBox: {
    display: "flex",
    flexDirection: "column",
  },
  previewFotoProduk: {
    width: 400,
    height: "auto",
  },
  iconRight: {
    marginLeft: theme.spacing(1),
  },
  iconLeft: {
    marginRight: theme.spacing(1),
  },
  actionButton: {
    paddingTop: theme.spacing(2),
  },
  papperPadding: {
    padding: theme.spacing(3),
  },
  copyright: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  formControl: {
    minWidth: 250,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  comboLokasi: {
    maxWidth: 300,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  imgThumb: {
    margin: theme.spacing(1),
  },
  center: {
    textAlign: "center",
    justifyContent: "center",
  },
  rootImg: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listAlign:{
    textAlign:"center"
  },
  fasilitas:{
    marginTop:theme.spacing(-1),
    marginBottom:theme.spacing(3)
  },
  iconCenter:{
    textAlign:"center"
  },
  uploadItemFotoProduk: {
    textAlign: "center",
    marginLeft:theme.spacing(12),
    marginRight:theme.spacing(12)
  },
}));

export default useStyles;
