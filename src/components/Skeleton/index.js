import React from "react";
import { CardMedia, CardActionArea, Card } from "@material-ui/core";
import useStyles from "./styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Skeleton from "@material-ui/lab/Skeleton";

export function DetailShimmer() {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
            ) : (
              <Avatar
                alt="Ted talk"
                src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
              />
            )
          }
          action={
            loading ? null : (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              "Ted"
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              "5 hours ago"
            )
          }
        />
        {loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
          <CardMedia
            className={classes.media}
            image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
            title="Ted talk"
          />
        )}
        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          ) : (
            <Typography variant="body2" color="textSecondary" component="p">
              {
                "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
              }
            </Typography>
          )}

          <Typography variant="h6" color="inherit" component="p">
            LOKASI
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
            LOKASI_DETAIL
          </Typography>
          <Typography variant="subtitle1" color="error">
            N)KAMAR
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <div>TOMBOL_SUKA</div>
          <div>TOMBOL_PESAN</div>
          <div>TOMBOL_JENIS_PEMBAYARAN</div>
          <div>MORE</div>
        </CardActions>
      </Card>
    </div>
  );
}
