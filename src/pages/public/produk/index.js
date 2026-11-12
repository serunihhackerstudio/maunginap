import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import FavoriteIcon from "@material-ui/icons/Favorite";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { useFirebase } from "../../../components/FirebaseProvider";
import PropertyCard from "../../../components/Property/PropertyCard";
import SwipeableTextMobileStepper from "../../../components/Slider";
import useFavorites from "../../../hooks/useFavorites";

import homekostan from "../../../assets/homekostan.png";
import homekontrakan from "../../../assets/homekontrakan.png";
import ruko from "../../../assets/ruko.png";
import gallon from "../../../assets/gallon.png";
import emptyImage from "../../../assets/datatidakditemukan.png";

const PAGE_SIZE = 8;

const CATEGORIES = [
  { label: "Kost", value: "Kost-kostan", img: homekostan },
  { label: "Kontrakan", value: "Kontrakan", img: homekontrakan },
  { label: "Ruko", value: "Ruko", img: ruko },
  { label: "Air isi ulang", to: "/pesan-air/detail", img: gallon },
];

const SORTS = {
  terbaru: { label: "Terbaru", fn: (a, b) => (b.created ? b.created.seconds : 0) - (a.created ? a.created.seconds : 0) },
  termurah: { label: "Harga terendah", fn: (a, b) => a.harga - b.harga },
  termahal: { label: "Harga tertinggi", fn: (a, b) => b.harga - a.harga },
  populer: { label: "Terpopuler", fn: (a, b) => (b.likes || 0) - (a.likes || 0) },
};

const useStyles = makeStyles((theme) => ({
  hero: {
    margin: theme.spacing(2, 0, 3),
    padding: theme.spacing(5, 3),
    borderRadius: 28,
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 55%, #14B8A6 100%)`,
    animation: "fadeUp .6s ease both",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 260,
      height: 260,
      right: -80,
      top: -80,
      borderRadius: "50%",
      background: "rgba(255,255,255,.12)",
    },
    [theme.breakpoints.up("md")]: { padding: theme.spacing(8, 6) },
  },
  heroTitle: { fontWeight: 700, maxWidth: 560, position: "relative", zIndex: 1 },
  heroSub: { opacity: 0.9, marginTop: theme.spacing(1), position: "relative", zIndex: 1 },
  search: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(0.5, 1, 0.5, 2),
    display: "flex",
    alignItems: "center",
    maxWidth: 620,
    borderRadius: 18,
    position: "relative",
    zIndex: 1,
    transition: "box-shadow .2s ease, transform .2s ease",
    "&:focus-within": { transform: "translateY(-2px)", boxShadow: "0 12px 32px rgba(0,0,0,.25)" },
  },
  searchInput: { flex: 1, marginLeft: theme.spacing(1), fontSize: 15 },
  city: { minWidth: 120, "&:before,&:after": { display: "none" }, fontSize: 14, fontWeight: 600 },
  categories: { marginBottom: theme.spacing(3) },
  tile: {
    width: "100%",
    border: `2px solid transparent`,
    cursor: "pointer",
    textAlign: "center",
    padding: theme.spacing(1.5, 1, 1),
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 1px 2px rgba(15,23,42,.06), 0 4px 16px rgba(15,23,42,.06)",
    transition: "transform .2s ease, border-color .2s ease, background-color .2s ease",
    fontFamily: "inherit",
    textDecoration: "none",
    display: "block",
    color: theme.palette.text.primary,
    "&:hover": { transform: "translateY(-4px)" },
    "&:active": { transform: "scale(.96)" },
  },
  tileActive: { borderColor: theme.palette.primary.main, backgroundColor: "#ECFDF5" },
  tileImg: { width: 56, height: 56, objectFit: "contain", transition: "transform .3s ease" },
  tileLabel: { display: "block", marginTop: theme.spacing(0.5), fontWeight: 600, fontSize: 13 },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  sort: { fontSize: 14, fontWeight: 600, color: theme.palette.primary.main },
  skeleton: { borderRadius: 20 },
  empty: { textAlign: "center", padding: theme.spacing(6, 2), color: theme.palette.text.secondary },
  emptyImg: { width: "100%", maxWidth: 260, marginBottom: theme.spacing(2) },
  more: { display: "flex", justifyContent: "center", margin: theme.spacing(4, 0) },
  fab: { position: "fixed", right: theme.spacing(2), bottom: theme.spacing(10) },
}));

const cardGrid = { xs: 12, sm: 6, md: 4, lg: 3 };

function HomeProduk() {
  const classes = useStyles();
  const { firestore } = useFirebase();
  const { favorites } = useFavorites();

  const [snapshot, loading] = useCollection(
    firestore.collection("penginapan").doc("data").collection("produk")
  );
  const [kotaSnapshot] = useCollection(firestore.collection("kota"));

  const [query, setQuery] = useState("");
  const [kota, setKota] = useState("");
  const [jenis, setJenis] = useState("");
  const [sort, setSort] = useState("terbaru");
  const [onlyFav, setOnlyFav] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // kembali ke halaman pertama setiap filter berubah
  useEffect(() => setVisible(PAGE_SIZE), [query, kota, jenis, sort, onlyFav]);

  const cities = useMemo(
    () => (kotaSnapshot ? kotaSnapshot.docs.map((d) => d.data().kota) : []),
    [kotaSnapshot]
  );

  const items = useMemo(() => {
    const docs = snapshot ? snapshot.docs.map((d) => ({ id: d.id, data: d.data() })) : [];
    const q = query.trim().toLowerCase();
    return docs
      .filter(({ id, data }) => {
        if (jenis && data.jenisPenginapan !== jenis) return false;
        if (kota && data.kota !== kota) return false;
        if (onlyFav && !favorites.includes(id)) return false;
        if (q && !`${data.namaPenginapan} ${data.kota}`.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => SORTS[sort].fn(a.data, b.data));
  }, [snapshot, query, kota, jenis, sort, onlyFav, favorites]);

  const reset = () => {
    setQuery("");
    setKota("");
    setJenis("");
    setOnlyFav(false);
  };
  const filtered = query || kota || jenis || onlyFav;

  return (
    <>
      <section className={classes.hero}>
        <Typography variant="h4" component="h1" className={classes.heroTitle}>
          Temukan tempat tinggal yang pas untukmu
        </Typography>
        <Typography variant="body1" className={classes.heroSub}>
          Kost, kontrakan, dan ruko terpercaya. Booking mudah, aman, tanpa ribet.
        </Typography>
        <Paper className={classes.search} elevation={0}>
          <SearchIcon color="action" />
          <InputBase
            className={classes.searchInput}
            placeholder="Cari nama atau kota…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            inputProps={{ "aria-label": "Cari penginapan" }}
          />
          {query && (
            <IconButton size="small" onClick={() => setQuery("")} aria-label="Hapus pencarian">
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
          <Select
            className={classes.city}
            value={kota}
            displayEmpty
            onChange={(e) => setKota(e.target.value)}
            inputProps={{ "aria-label": "Pilih kota" }}
          >
            <MenuItem value="">Semua kota</MenuItem>
            {cities.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </Paper>
      </section>

      {!filtered && (
        <div style={{ marginBottom: 24, borderRadius: 20, overflow: "hidden" }}>
          <SwipeableTextMobileStepper />
        </div>
      )}

      <Grid container spacing={2} className={classes.categories}>
        {CATEGORIES.map((c) => {
          const inner = (
            <>
              <img src={c.img} alt="" className={classes.tileImg} />
              <span className={classes.tileLabel}>{c.label}</span>
            </>
          );
          return (
            <Grid item xs={3} key={c.label}>
              {c.to ? (
                <Link to={c.to} className={classes.tile}>
                  {inner}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`${classes.tile} ${jenis === c.value ? classes.tileActive : ""}`}
                  onClick={() => setJenis(jenis === c.value ? "" : c.value)}
                  aria-pressed={jenis === c.value}
                >
                  {inner}
                </button>
              )}
            </Grid>
          );
        })}
      </Grid>

      <div className={classes.toolbar}>
        <Typography variant="h6">
          {loading ? "Memuat…" : `${items.length} penginapan`}
        </Typography>
        <div>
          <Chip
            clickable
            icon={<FavoriteIcon />}
            label={`Favorit${favorites.length ? ` (${favorites.length})` : ""}`}
            color={onlyFav ? "primary" : "default"}
            variant={onlyFav ? "default" : "outlined"}
            onClick={() => setOnlyFav(!onlyFav)}
            style={{ marginRight: 8 }}
          />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={classes.sort}
            disableUnderline
            inputProps={{ "aria-label": "Urutkan" }}
          >
            {Object.entries(SORTS).map(([key, s]) => (
              <MenuItem key={key} value={key}>
                {s.label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <Grid container spacing={3}>
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Grid item key={i} {...cardGrid}>
              <Skeleton animation="wave" variant="rect" height={300} className={classes.skeleton} />
            </Grid>
          ))}
        {items.slice(0, visible).map(({ id, data }, i) => (
          <Grid item key={id} {...cardGrid}>
            <PropertyCard id={id} data={data} index={i} />
          </Grid>
        ))}
      </Grid>

      {!loading && items.length === 0 && (
        <div className={classes.empty}>
          <img src={emptyImage} alt="Tidak ditemukan" className={classes.emptyImg} />
          <Typography gutterBottom>
            {onlyFav && !favorites.length
              ? "Belum ada favorit. Ketuk ikon hati pada penginapan untuk menyimpannya."
              : "Penginapan yang kamu cari belum ditemukan."}
          </Typography>
          {filtered && (
            <Button color="primary" variant="outlined" onClick={reset}>
              Reset filter
            </Button>
          )}
        </div>
      )}

      {items.length > visible && (
        <div className={classes.more}>
          <Button variant="outlined" color="primary" onClick={() => setVisible(visible + PAGE_SIZE)}>
            Muat lebih banyak ({items.length - visible})
          </Button>
        </div>
      )}

      <Zoom in={showTop}>
        <Fab
          size="small"
          color="primary"
          aria-label="Kembali ke atas"
          className={classes.fab}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </>
  );
}

export default HomeProduk;
