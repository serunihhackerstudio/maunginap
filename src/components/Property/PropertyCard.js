import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteIcon from "@material-ui/icons/Favorite";
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
  card: { height: "100%" },
  actionArea: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  mediaWrap: { position: "relative" },
  media: { height: 180, backgroundColor: theme.palette.grey[200] },
  badge: {
    position: "absolute",
    top: theme.spacing(1.5),
    left: theme.spacing(1.5),
    backgroundColor: "rgba(255,255,255,.92)",
    fontWeight: 600,
  },
  likes: {
    position: "absolute",
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    backgroundColor: "rgba(255,255,255,.92)",
  },
  likeIcon: { color: theme.palette.error.main },
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

function PropertyCard({ id, data }) {
  const classes = useStyles();
  const perYear = data.jenisPenginapan === "Kontrakan" || data.jenisPenginapan === "Ruko" || data.isTahunan;
  const facilities = FACILITIES.filter(([key]) => data.fasilitasUmum && data.fasilitasUmum[key]);
  const visible = facilities.slice(0, 4);

  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} to={`/view/penginapan/${id}`} className={classes.actionArea}>
        <div className={classes.mediaWrap}>
          <CardMedia className={classes.media} image={data.foto} title={data.namaPenginapan} />
          <Chip
            size="small"
            className={classes.badge}
            label={data.isTahunan && data.jenisPenginapan !== "Ruko" ? "Kost Tahunan" : data.jenisPenginapan}
          />
          <Chip
            size="small"
            className={classes.likes}
            icon={<FavoriteIcon className={classes.likeIcon} />}
            label={data.likes || 0}
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
