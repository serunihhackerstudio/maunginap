import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { useFirebase } from "../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  green,
  red,
  blue,
  orange,
  purple,
  lime,
  lightGreen,
  lightBlue,
  teal,
  cyan,
  pink,
  yellow,
} from "@material-ui/core/colors";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppPageLoading from "../../../components/AppPageLoading";
import Button from "@material-ui/core/Button";

export default function Users({ history }) {
  const classes = useStyles();
  const dataBatch = 20;
  const [numPage, setNumPage] = React.useState(dataBatch);
  const { firestore } = useFirebase();
  const queryUsers = firestore
    .collection("userbio")
    .where("email", "!=", "")
    .limit(numPage);
  const lengthQueryUsers = firestore.collection("userbio").where("email", "!=", "");
  const [snapshot, loading] = useCollection(queryUsers);
  const [lengthSnapshot, lengthLoading] = useCollection(lengthQueryUsers);
  const [dataUsers, setDataUsers] = React.useState([]);
  const [numUsers, setNumUsers] = React.useState(0);
  const colors = [
    green[500],
    red[500],
    blue[500],
    orange[500],
    purple[500],
    lime[500],
    lightGreen[500],
    lightBlue[500],
    teal[500],
    cyan[500],
    pink[500],
    yellow[500],
  ];

  const el = React.useRef(null);
  const [isNextClicked, setNextClicked] = React.useState(false);

  React.useEffect(() => {
    if (snapshot) {
      setDataUsers(snapshot.docs);
      if (isNextClicked) {
        el.current.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    }

    if (lengthSnapshot) {
      setNumUsers(lengthSnapshot.docs.length);
    }
  }, [snapshot, lengthSnapshot]);

  if (loading) {
    return <AppPageLoading />;
  }

  const loadMoreData = () => {
    setNumPage(numPage + dataBatch);
    setNextClicked(true);
  };
  return (
    <>
      <div>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              // <Tooltip title="Kembali" aria-label="kembali">
              <IconButton
                color="primary"
                aria-label="Back icon"
                //   onClick={() => {
                //     history.goBack();
                //   }}
              >
                <PeopleAltIcon />
              </IconButton>
              // </Tooltip>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Datalog semua users"
            subheader={`Total ${numUsers} user`}
          />
          <CardContent>
            {dataUsers.map((data, index) => {
              const user = data.data();
              const colorIndex = Math.floor(Math.random() * colors.length); // returns a random integer from 0 to 10

              return (
                <List>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: colors[colorIndex] }}>
                        {user.email[0].toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            <Typography color="primary">
                              <strong>{user.email}</strong>
                            </Typography>
                            <Typography>{user.telepon}</Typography>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                            >
                              {user.userUid}
                            </Typography>
                          </Typography>
                        </React.Fragment>
                      }
                    ></ListItemText>
                  </ListItem>
                </List>
              );
            })}
            <div style={{ textAlign: "center" }}>
              {numUsers === dataUsers.length ? (
                ""
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={loadMoreData}
                  size="small"
                >
                  Load More Data
                </Button>
              )}
            </div>
          </CardContent>
          <CardActions>
              <Typography variant="bory1" id={"el"} ref={el}>{dataUsers.length} of {numUsers} items</Typography>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
