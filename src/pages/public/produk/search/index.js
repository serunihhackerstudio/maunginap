import React from "react";
import { usePesanan } from "../../../../components/PesananProvider";

// MATERIAL UI COMPONENT
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
// import Container from "@material-ui/core/Container";
// import Skeleton from "@material-ui/lab/Skeleton";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { currency } from "../../../../utils/formatter";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Tooltip from "@material-ui/core/Tooltip";
import { blue } from "@material-ui/core/colors";
import AppPageLoading from "../../../../components/AppPageLoading";

export default function Search() {
  const { searchText } = usePesanan();
  const classes = useStyles();
  return (
    <div>
      {/* DATA ASLI */}

      {searchText.length === 0 ? (
        <div>
          <AppPageLoading />
        </div>
      ) : (
        <>
          <Typography variant="h4" color="primary">
            <strong>Kost</strong>
          </Typography>
          <Grid container spacing={5} className={classes.gridContainer}>
            {searchText
              .filter((item) => item.item.jenisPenginapan === "Kost-kostan")
              .map((produkDoc) => {
                const produkData = produkDoc.item;
                return (
                  <Grid
                    key={produkData.id}
                    item={true}
                    xs={12}
                    xm={12}
                    md={3}
                    lg={3}
                  >
                    <Card className={classes.root}>
                      <CardActionArea
                        component={Link}
                        to={`/view/penginapan/${produkData.id}`}
                      >
                        <CardMedia
                          className={classes.media}
                          image={produkData.foto}
                          title="Contemplative Reptile"
                          alt={`gambar-${produkData.id}`}
                        />

                        <CardContent>
                          <Typography variant="h6">
                            {produkData.namaPenginapan}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ color: blue[500] }}
                          >
                            {produkData.isTahunan &&
                            produkData.jenisPenginapan !== "Ruko"
                              ? "(Kost Tahunan)"
                              : ""}{" "}
                          </Typography>

                          <Typography
                            variant="body1"
                            gutterBottom
                            color="primary"
                          >
                            {currency(produkData.harga)}
                            {/* {produkData.isTahunan ? currency(produkData.harga * 12) : currency(produkData.harga)}{" "} */}
                            {produkData.jenisPenginapan === "Kontrakan" ||
                            produkData.jenisPenginapan === "Ruko" ||
                            produkData.isTahunan
                              ? " / tahun"
                              : " / bulan"}
                          </Typography>

                          <Typography
                            variant="body1"
                            color="textSecondary"
                            component="p"
                          >
                            {/* {produkData.lokasi} */}
                            {/* <Chip
                                    icon={<LocationOnIcon />}
                                    label={`mataram`}
                                    size="small"
                                    color="primary"
                                /> */}
                            {/* <LocationOnIcon /> Mataram */}
                          </Typography>
                          <Grid container>
                            <Grid item xs={1.8}>
                              <LocationOnIcon className={classes.ico} />
                            </Grid>
                            <Grid item xs>
                              {produkData.kota}
                            </Grid>
                          </Grid>

                          <Typography variant="body2" color="textSecondary">
                            {produkData.fasilitasUmum.ac ? <>ac &#183; </> : ""}
                            {produkData.fasilitasUmum.kamarMandiDalam ? (
                              <>k. mandi dlm &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.kasur ? (
                              <>kasur &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.lemari ? (
                              <>lemari &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.listrikSendiri ? (
                              <>listrik sendiri &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.meja ? (
                              <>meja &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.tempatJemur ? (
                              <>tempat jemur &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.wifi ? (
                              <>wifi &#183; </>
                            ) : (
                              ""
                            )}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Chip
                          icon={<FavoriteIcon />}
                          label={`${produkData.likes} likes`}
                          variant="outlined"
                          size="small"
                        />
                        {produkData.jenisPenginapan === "Ruko" ? (
                          <Tooltip title="Penyewaan Ruko">
                            <StorefrontIcon />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>

          <Typography variant="h4" color="primary">
            <strong>Kontrakan</strong>
          </Typography>
          <Grid container spacing={5} className={classes.gridContainer}>
            {searchText
              .filter((item) => item.item.jenisPenginapan === "Kontrakan")
              .map((produkDoc) => {
                const produkData = produkDoc.item;
                return (
                  <Grid
                    key={produkData.id}
                    item={true}
                    xs={12}
                    xm={12}
                    md={3}
                    lg={3}
                  >
                    <Card className={classes.root}>
                      <CardActionArea
                        component={Link}
                        to={`/view/penginapan/${produkData.id}`}
                      >
                        <CardMedia
                          className={classes.media}
                          image={produkData.foto}
                          title="Contemplative Reptile"
                          alt={`gambar-${produkData.id}`}
                        />

                        <CardContent>
                          <Typography variant="h6">
                            {produkData.namaPenginapan}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ color: blue[500] }}
                          >
                            {produkData.isTahunan &&
                            produkData.jenisPenginapan !== "Ruko"
                              ? "(Kost Tahunan)"
                              : ""}{" "}
                          </Typography>

                          <Typography
                            variant="body1"
                            gutterBottom
                            color="primary"
                          >
                            {currency(produkData.harga)}
                            {/* {produkData.isTahunan ? currency(produkData.harga * 12) : currency(produkData.harga)}{" "} */}
                            {produkData.jenisPenginapan === "Kontrakan" ||
                            produkData.jenisPenginapan === "Ruko" ||
                            produkData.isTahunan
                              ? " / tahun"
                              : " / bulan"}
                          </Typography>

                          <Typography
                            variant="body1"
                            color="textSecondary"
                            component="p"
                          >
                            {/* {produkData.lokasi} */}
                            {/* <Chip
                                    icon={<LocationOnIcon />}
                                    label={`mataram`}
                                    size="small"
                                    color="primary"
                                /> */}
                            {/* <LocationOnIcon /> Mataram */}
                          </Typography>
                          <Grid container>
                            <Grid item xs={1.8}>
                              <LocationOnIcon className={classes.ico} />
                            </Grid>
                            <Grid item xs>
                              {produkData.kota}
                            </Grid>
                          </Grid>

                          <Typography variant="body2" color="textSecondary">
                            {produkData.fasilitasUmum.ac ? <>ac &#183; </> : ""}
                            {produkData.fasilitasUmum.kamarMandiDalam ? (
                              <>k. mandi dlm &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.kasur ? (
                              <>kasur &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.lemari ? (
                              <>lemari &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.listrikSendiri ? (
                              <>listrik sendiri &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.meja ? (
                              <>meja &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.tempatJemur ? (
                              <>tempat jemur &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.wifi ? (
                              <>wifi &#183; </>
                            ) : (
                              ""
                            )}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Chip
                          icon={<FavoriteIcon />}
                          label={`${produkData.likes} likes`}
                          variant="outlined"
                          size="small"
                        />
                        {produkData.jenisPenginapan === "Ruko" ? (
                          <Tooltip title="Penyewaan Ruko">
                            <StorefrontIcon />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
          <Typography variant="h4" color="primary">
            <strong>Ruko</strong>
          </Typography>
          <Grid container spacing={5} className={classes.gridContainer}>
            {searchText
              .filter((item) => item.item.jenisPenginapan === "Ruko")
              .map((produkDoc) => {
                const produkData = produkDoc.item;
                return (
                  <Grid
                    key={produkData.id}
                    item={true}
                    xs={12}
                    xm={12}
                    md={3}
                    lg={3}
                  >
                    <Card className={classes.root}>
                      <CardActionArea
                        component={Link}
                        to={`/view/penginapan/${produkData.id}`}
                      >
                        <CardMedia
                          className={classes.media}
                          image={produkData.foto}
                          title="Contemplative Reptile"
                          alt={`gambar-${produkData.id}`}
                        />

                        <CardContent>
                          <Typography variant="h6">
                            {produkData.namaPenginapan}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ color: blue[500] }}
                          >
                            {produkData.isTahunan &&
                            produkData.jenisPenginapan !== "Ruko"
                              ? "(Kost Tahunan)"
                              : ""}{" "}
                          </Typography>

                          <Typography
                            variant="body1"
                            gutterBottom
                            color="primary"
                          >
                            {currency(produkData.harga)}
                            {/* {produkData.isTahunan ? currency(produkData.harga * 12) : currency(produkData.harga)}{" "} */}
                            {produkData.jenisPenginapan === "Kontrakan" ||
                            produkData.jenisPenginapan === "Ruko" ||
                            produkData.isTahunan
                              ? " / tahun"
                              : " / bulan"}
                          </Typography>

                          <Typography
                            variant="body1"
                            color="textSecondary"
                            component="p"
                          >
                            {/* {produkData.lokasi} */}
                            {/* <Chip
                                    icon={<LocationOnIcon />}
                                    label={`mataram`}
                                    size="small"
                                    color="primary"
                                /> */}
                            {/* <LocationOnIcon /> Mataram */}
                          </Typography>
                          <Grid container>
                            <Grid item xs={1.8}>
                              <LocationOnIcon className={classes.ico} />
                            </Grid>
                            <Grid item xs>
                              {produkData.kota}
                            </Grid>
                          </Grid>

                          <Typography variant="body2" color="textSecondary">
                            {produkData.fasilitasUmum.ac ? <>ac &#183; </> : ""}
                            {produkData.fasilitasUmum.kamarMandiDalam ? (
                              <>k. mandi dlm &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.kasur ? (
                              <>kasur &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.lemari ? (
                              <>lemari &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.listrikSendiri ? (
                              <>listrik sendiri &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.meja ? (
                              <>meja &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.tempatJemur ? (
                              <>tempat jemur &#183; </>
                            ) : (
                              ""
                            )}
                            {produkData.fasilitasUmum.wifi ? (
                              <>wifi &#183; </>
                            ) : (
                              ""
                            )}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Chip
                          icon={<FavoriteIcon />}
                          label={`${produkData.likes} likes`}
                          variant="outlined"
                          size="small"
                        />
                        {produkData.jenisPenginapan === "Ruko" ? (
                          <Tooltip title="Penyewaan Ruko">
                            <StorefrontIcon />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </>
      )}
    </div>
  );
}
