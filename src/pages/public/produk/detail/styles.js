import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "auto",
  },
  media: {
    height: 250,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "primary",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 300,
  },
  formControl: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    minWidth: 120,
  },
  btn: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  contentSkeleton: {
    margin: theme.spacing(2),
  },
  center:{
    textAlign:"center",
  },
  imgThumb:{
    marginRight:theme.spacing(2)
  },
  fasilitas:{
    marginTop:theme.spacing(-1),
    marginBottom:theme.spacing(2),
    marginLeft:theme.spacing(2),
    width:"70%"
  },
  ratingRoot : {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    marginBottom:theme.spacing(2)
  },
  ratingDiv:{
    marginRight:theme.spacing(1),
  }
}));

export default useStyles;
