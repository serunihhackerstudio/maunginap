import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pengaturanPengguna: {
    display: "flex",
    flexDirection: "column",
    width: 300,
  },
  tabContent: {
    padding: theme.spacing(3),
  },
  pengaturanBio: {
    display: "flex",
    flexDirection: "column",
    width: 300,
  },
  tombolSimpan: {
    marginTop: theme.spacing(2),
  },
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
  profilePict: {
    borderRadius: "8%",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  avatar: {
    backgroundColor: "#016660",
    height: theme.spacing(15),
    width: theme.spacing(15),
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 950,
    marginBottom: theme.spacing(2),
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default useStyles;
