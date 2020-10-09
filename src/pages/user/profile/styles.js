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
}));

export default useStyles;
