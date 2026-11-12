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
    marginBottom:theme.spacing(2),
    marginTop:theme.spacing(2)
  },
  ratingDiv:{
    marginRight:theme.spacing(1),
  },
  imgThumbDiv:{
    margin:"auto"
  },
  thumbBtn: {
    display: "inline-block",
    cursor: "zoom-in",
    "& img": {
      borderRadius: 10,
      objectFit: "cover",
      transition: "transform .2s ease, box-shadow .2s ease",
    },
    "&:hover img": { transform: "scale(1.08)", boxShadow: "0 6px 16px rgba(15,23,42,.18)" },
  },
  actions: { flexWrap: "wrap", gap: theme.spacing(1), padding: theme.spacing(1, 2, 2) },
  likeBtn: {
    borderRadius: 999,
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(0.5, 1.5),
    color: theme.palette.text.secondary,
  },
  likeBtnActive: { color: theme.palette.error.main, borderColor: theme.palette.error.light, backgroundColor: "#FEF2F2" },
  likePop: { animation: "pop .35s ease" },
  iuran: {
    "& .MuiToggleButton-root": { textTransform: "none", fontWeight: 600, padding: theme.spacing(0.5, 2) },
    "& .Mui-selected": { backgroundColor: "#CCFBF1", color: theme.palette.primary.dark },
  },
  moreBtn: { marginLeft: "auto", color: theme.palette.primary.main },
  bookingBar: {
    position: "sticky",
    bottom: theme.spacing(10),
    zIndex: 5,
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(2),
    padding: theme.spacing(1.5, 2),
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,.92)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(15,23,42,.16)",
    animation: "fadeUp .4s ease both",
    [theme.breakpoints.up("md")]: { bottom: theme.spacing(2) },
  },
  total: { fontWeight: 700, lineHeight: 1.2 },
  bookBtn: { flexShrink: 0, borderRadius: 14 }
}));

export default useStyles;
