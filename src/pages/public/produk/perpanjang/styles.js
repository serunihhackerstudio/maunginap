import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    btnLeft: {
      marginLeft: "auto",
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      
    },
    root: {
      maxWidth: 550,
      margin: "auto",
    },
    boxAlign: {
      textAlign: "right",
    },
    formControl: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
      minWidth: "100%",
    },
    rootProses: {
      maxWidth: 650,
      margin: "auto",
    },
    headingCenter:{
      textAlign:"center"
    }
  }));

  export default useStyles;