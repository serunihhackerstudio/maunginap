import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import useFavorites from "../../hooks/useFavorites";
import { currency } from "../../utils/formatter";

const FACILITIES = [
  ["ac", "AC"],
  ["kamarMandiDalam", "K. mandi dalam"],
  ["kasur", "Kasur"],
  ["lemari", "Lemari"],
  ["listrikSendiri", "Listrik sendiri"],
  ["meja", "Meja"],
  ["tempatJemur", "Tempat jemur"],
  ["wifi", "WiFi"],
];

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    position: "relative",
    animation: "fadeUp .5s ease both",
    "&:hover $image": { transform: "scale(1.08)" },
    "&:active": { transform: "scale(.985)" },
  },
  actionArea: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  mediaWrap: { position: "relative", overflow: "hidden" },
  media: { height: 180, backgroundColor: theme.palette.grey[200] },
  image: { height: "100%", transition: "transform .5s ease" },
  badge: {
    position: "absolute",
    top: theme.spacing(1.5),
    left: theme.spacing(1.5),
    backgroundColor: "rgba(255,255,255,.92)",
    fontWeight: 600,
  },
  heart: {
    position: "absolute",
    zIndex: 2,
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: "rgba(255,255,255,.92)",
    "&:hover": { backgroundColor: "#fff", transform: "scale(1.12)" },
    transition: "transform .15s ease",
  },
  heartActive: { animation: "pop .35s ease" },
  heartIcon: { color: theme.palette.error.main },
  likes: { marginLeft: "auto", color: theme.palette.text.secondary, display: "flex", alignItems: "center", gap: 4 },
  body: { padding: theme.spacing(2), flexGrow: 1 },
  name: {
    fontWeight: 600,
    lineHeight: 1.3,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  price: { fontWeight: 700, marginTop: theme.spacing(0.5) },
  unit: { color: theme.palette.text.secondary, fontWeight: 400 },
  location: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
  },
  locationIcon: { fontSize: 16, marginRight: 2 },
  chips: { display: "flex", flexWrap: "wrap", gap: theme.spacing(0.5), marginTop: theme.spacing(1.5) },
  facility: { height: 22, fontSize: 11 },
}));

function PropertyCard({ id, data, index = 0 }) {
  const classes = useStyles();
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(id);
  const perYear = data.jenisPenginapan === "Kontrakan" || data.jenisPenginapan === "Ruko" || data.isTahunan;
  const facilities = FACILITIES.filter(([key]) => data.fasilitasUmum && data.fasilitasUmum[key]);
  const visible = facilities.slice(0, 4);

  return (
    <Card className={classes.card} style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}>
      <IconButton
        size="small"
        className={classes.heart}
        aria-label={fav ? "Hapus dari favorit" : "Simpan ke favorit"}
        onClick={() => toggle(id)}
      >
        {fav ? (
          <FavoriteIcon key="on" className={`${classes.heartIcon} ${classes.heartActive}`} />
        ) : (
          <FavoriteBorderIcon className={classes.heartIcon} />
        )}
      </IconButton>
      <CardActionArea component={Link} to={`/view/penginapan/${id}`} className={classes.actionArea}>
        <div className={classes.mediaWrap}>
          <CardMedia className={classes.media} title={data.namaPenginapan}>
            <div className={classes.image} style={{ backgroundImage: `url(${data.foto})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          </CardMedia>
          <Chip
            size="small"
            className={classes.badge}
            label={data.isTahunan && data.jenisPenginapan !== "Ruko" ? "Kost Tahunan" : data.jenisPenginapan}
          />
        </div>
        <Box className={classes.body}>
          <Typography variant="subtitle1" className={classes.name}>
            {data.namaPenginapan}
          </Typography>
          <Typography variant="h6" color="primary" className={classes.price}>
            {currency(data.harga)}
            <span className={classes.unit}> / {perYear ? "tahun" : "bulan"}</span>
          </Typography>
          <Typography variant="body2" className={classes.location}>
            <LocationOnIcon className={classes.locationIcon} /> {data.kota}
            <span className={classes.likes}>
              <FavoriteIcon style={{ fontSize: 14 }} /> {data.likes || 0}
            </span>
          </Typography>
          {visible.length > 0 && (
            <div className={classes.chips}>
              {visible.map(([key, label]) => (
                <Chip key={key} size="small" variant="outlined" label={label} className={classes.facility} />
              ))}
              {facilities.length > visible.length && (
                <Chip size="small" variant="outlined" label={`+${facilities.length - visible.length}`} className={classes.facility} />
              )}
            </div>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default PropertyCard;
