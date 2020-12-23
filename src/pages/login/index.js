import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper"; // => kotak putih untuk melapisi objek
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles.js";
import TextField from "@material-ui/core/TextField";
import { useSnackbar } from "notistack";
import fingerprint from "../../assets/fingerprint.png";

// import react router dom
import { Link, Redirect } from "react-router-dom";

import isEmail from "validator/lib/isEmail";

// firebase hook
import { useFirebase } from "../../components/FirebaseProvider";

function Login(props) {
  const { location } = props;
  // untuk keperluan styling
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

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
  const { adminUser, setAdminUser, setAdminPass } = useFirebase();

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
        if (
          form.email === "admin@maunginap.com" &&
          form.password === "wecanmakeit"
        ) {
          setSubmitting(true);
          setAdminUser(form.email);
          setAdminPass(form.password);
        } else {
          enqueueSnackbar("User atau password salah", { variant: "error" });
        }
      } catch (e) {
        const newError = {};
        switch (e.code) {
          case "auth/invalid-email":
            newError.email = "Email tidak valid";
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

  if (adminUser) {
    const redirectTo =
      location.state && location.state.from && location.state.from.pathname
        ? location.state.from.pathname
        : "/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/dashboard";
    return <Redirect to={redirectTo} />;
  }

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <div className={classes.title}>
          <img src={fingerprint} alt="super-admin-login" width={100} />
        </div>
        <Typography
          variant="body1"
          component="h1"
          className={classes.title}
          color="textSecondary"
        >
          Super Admin Login
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
          {/*  */}
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
            color="primary"
            to="/"
            size="large"
            fullWidth
          >
            Home
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
export default Login;
