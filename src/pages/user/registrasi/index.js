import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper"; // => kotak putih untuk melapisi objek
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import TextField from "@material-ui/core/TextField";

// import react router dom
import { Link, Redirect } from "react-router-dom";

import isEmail from "validator/lib/isEmail";

// firebase hook
import { useFirebase } from "../../../components/FirebaseProvider";
import { usePesanan } from "../../../components/PesananProvider";

// app component
import AppLoading from "../../../components/AppLoading";

// asset
import userLogo from "../../../assets/user.png";

// telegram endpoint for bot notif
import {user_maunginap_endp} from "../../../config/telegram";

function RegistrasiUser({ match }) {
  // untuk keperluan styling
  const classes = useStyles();

  // use pesanan provider as context api for state managemenet
  const {setTelepon} = usePesanan();

  // import request library
  const request = require("request");

  // untuk form form nya
  const [form, setForm] = useState({
    email: "",
    telepon:"",
    password: "",
    ulangi_password: "",
  });

  // untuk error
  const [error, setError] = useState({
    email: "",
    telepon:"",
    password: "",
    ulangi_password: "",
  });

  // kondisi untuk mendisable/mengunci form ketika tombol
  // register sudah diklik
  const [isSubmitting, setSubmitting] = useState(false);

  // untk keperluan authentikasi
  const { auth, user, loading } = useFirebase();

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

    if (!form.telepon) {
      newError.telepon = "Nomor HP wajib diisi";
    }

    if (!form.password) {
      newError.password = "Password wajib diisi";
    }

    if (!form.ulangi_password) {
      newError.ulangi_password = "Ulangi passowrd wajib diisi";
    } else if (form.ulangi_password !== form.password) {
      newError.ulangi_password = "Ulangi password tidak sama dengan Password";
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
        setTelepon(form.telepon);
        await auth.createUserWithEmailAndPassword(form.email, form.password);
        sendPesananToTelegram(`${form.email} ${form.telepon}`);
      } catch (e) {
        const newError = {};

        switch (e.code) {
          case "auth/email-already-in-use":
            newError.email = "Email sudah terdaftar";
            break;
          case "auth/invalid-email":
            newError.email = "Email tidak valid";
            break;
          case "auth/weak-password":
            newError.password = "Password lemah";
            break;
          case "auth/operation-not-allower":
            newError.email = "Metode email dan password tidak didukung";
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

  const sendPesananToTelegram = async (msg) => {
    const endp = user_maunginap_endp;
    const chatId = -431700698;
    await request(
      {
        url: endp,
        method: "POST",
        json: { chat_id: chatId, text: msg },
      },
      function (error, response, body) {

      }
    );
  };

  if (loading) {
    return <AppLoading message="Loading..."/>;
  }

  if (user) {
    return <Redirect to="/user/transisi" />;
  }

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <div className={classes.title}>
          <img src={userLogo} alt="user-regist" width={100} />
        </div>
        <Typography
          variant="body1"
          component="h1"
          className={classes.title}
          color="textSecondary"
        >
          Buat Akun Baru
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
            id="telepon"
            type="number"
            name="telepon"
            margin="normal"
            label="Nomor HP (WA)"
            fullWidth
            required
            value={form.telepon}
            onChange={handleChange}
            helperText={error.telepon}
            error={error.telepon ? true : false}
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
          <TextField
            id="ulangi_password"
            type="password"
            name="ulangi_password"
            margin="normal"
            label="Ulangi Password"
            fullWidth
            required
            value={form.ulangi_password}
            onChange={handleChange}
            helperText={error.ulangi_password}
            error={error.ulangi_password ? true : false}
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
            Daftar
          </Button>
          <Button
            className={classes.buttons}
            disabled={isSubmitting}
            component={Link}
            type="submit"
            variant="outlined"
            size="large"
            to="/login"
            color="primary"
            fullWidth
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
export default RegistrasiUser;
