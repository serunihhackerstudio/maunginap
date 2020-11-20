import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper"; // => kotak putih untuk melapisi objek
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles.js";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

// import react router dom
import { Link, Redirect } from "react-router-dom";

import isEmail from "validator/lib/isEmail";

// firebase hook
import { useFirebase } from "../../../components/FirebaseProvider";
import { usePesanan } from "../../../components/PesananProvider";

// app component
import AppLoading from "../../../components/AppLoading";

// asset
import maunginap from "../../../assets/maunginap.jpg";

function LoginUser(props) {
  // ambil state openAlert
  const { needLogin, setNeedLogin } = usePesanan();
  console.log(needLogin);
  const { location } = props;
  // untuk keperluan styling
  const classes = useStyles();

  // untuk form form nya
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // untuk error
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  // kondisi untuk mendisable/mengunci form ketika tombol
  // register sudah diklik
  const [isSubmitting, setSubmitting] = useState(false);

  // untk keperluan authentikasi
  const { auth, user, loading, firestore } = useFirebase();
  // if (user){
  //   const userIdQuery = firestore.collection("userbio").doc(user.uid)
  //   userIdQuery.set({userUid:user.uid, foto:""}, {merge:true})
  // }

  const handleChange = (e) => {
    // teknik tercepat untuk perubahan value/nilai di form input
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // teknik tercepat untuk handle error di form input
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  // menampilkan pesan error jika form masih kosong
  // ketika tombol submit ditekan
  const validate = () => {
    const newError = { ...error };

    if (!form.email) {
      newError.email = "Email wajib diisi";
    } else if (!isEmail(form.email)) {
      newError.email = "Email tidak valid";
    }

    if (!form.password) {
      newError.password = "Password wajib diisi";
    }
    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const findErrors = validate();

    if (Object.values(findErrors).some((err) => err !== "")) {
      setError(findErrors);
    } else {
      try {
        setSubmitting(true);
        await auth.signInWithEmailAndPassword(form.email, form.password);
      } catch (e) {
        const newError = {};

        switch (e.code) {
          case "auth/user-not-found":
            newError.email = "Email tidak terdaftar";
            break;
          case "auth/invalid-email":
            newError.email = "Email tidak valid";
            break;
          case "auth/wrong-password":
            newError.password = "Password salah";
            break;
          case "auth/user-disabled":
            newError.email = "Pengguna diblokir";
            break;
          default:
            newError.email = "Terjadi kesalahan. Silahkan dicoba lagi";
            break;
        }
        setError(newError);
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return <AppLoading message="Loading..." />;
  }

  if (user) {
    const redirectTo =
      location.state && location.state.from && location.state.from.pathname
        ? location.state.from.pathname
        : "/";
    return <Redirect to={redirectTo} />;
  }

  return (
    <Container maxWidth="xs">
      {!user && (
        <Collapse in={needLogin}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setNeedLogin(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Login dulu sebelum melakukan pemesanan !
          </Alert>
        </Collapse>
      )}

      <Paper className={classes.paper}>
        <div className={classes.title}>
          <img src={maunginap} alt="user-login" width={100} />
        </div>
        <Typography
          variant="body1"
          component="h1"
          className={classes.title}
          color="textSecondary"
        >
          Selamat datang di platform maunginap. Ayo Login untuk dapat mengakses
          semua fitur
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            id="email"
            type="email"
            name="email"
            margin="normal"
            label="Alamat Email"
            fullWidth
            required
            value={form.email}
            onChange={handleChange}
            helperText={error.email}
            error={error.email ? true : false}
            disabled={isSubmitting}
            variant="outlined"
          />
          <TextField
            id="password"
            type="password"
            name="password"
            margin="normal"
            label="Password"
            fullWidth
            required
            value={form.pasword}
            onChange={handleChange}
            helperText={error.password}
            error={error.password ? true : false}
            disabled={isSubmitting}
            variant="outlined"
          />
          <Button
            className={classes.buttons}
            disabled={isSubmitting}
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
          >
            Login
          </Button>
          <Button
            className={classes.buttons}
            disabled={isSubmitting}
            component={Link}
            type="submit"
            variant="outlined"
            size="large"
            to="/user/registrasi"
            color="primary"
            fullWidth
          >
            Daftar
          </Button>
          <div className={classes.forgotPassword}>
            <Typography
              component={Link}
              to="/lupa-password"
              style={{ textDecoration: "none" }}
              color="primary"
            >
              Lupa Password
            </Typography>
          </div>
        </form>
      </Paper>
    </Container>
  );
}
export default LoginUser;
