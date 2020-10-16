import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pengaturanPengguna: {
    display: "flex",
    flexDirection: "column",
    width: 300,
  },
  tabContent: {
    padding: theme.spacing(2),
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
  profilePict:{
    borderRadius:"20%",
  }
}));

export default useStyles;
