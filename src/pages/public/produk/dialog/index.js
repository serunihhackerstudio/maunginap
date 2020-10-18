import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
// firebase
import { useFirebase } from "../../../../components/FirebaseProvider";
import { usePesanan } from "../../../../components/PesananProvider";

// styles
import useStyles from "./styles";
import { useSnackbar } from "notistack";

// util
import ID from "../../../../utils/idgenerator";
import BookingCode from "../../../../utils/bookingCode";

// react fragment
import PaymentForm from "./fragment/PaymentForm";
import FormPemesan from "./fragment/FormPemesan";
import Review from "./fragment/Review";
import { Typography } from "@material-ui/core";
import { currency } from "../../../../utils/formatter";
// import context

const DialogBooking = ({
  open,
  handleClose,
  namaPenginapan,
  location,
  history,
  match,
  jenisIuran,
  harga,
  foto,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSubmitting, setSubmitting] = useState(false);

  // REQUIREMENTS
  const idGenerator = ID();
  const [form, setForm] = useState({
    namaKTP: "",
    nomorKTP: "",
    jenisIuran: jenisIuran,
    tanggalPesan: "",
    tanggalBerakhir: "",
    nomorHpWa: "",
    reserved: false,
    created: new Date(),
  });

  const [error, setError] = useState({
    namaKTP: "",
    nomorKTP: "",
    pilihBank: "",
    tanggalPesan: "",
    nomorHpWa: "",
  });

  const [jumlahKamar, setJumlahKamar] = useState(0);
  const [jenisPenginapan, setJenisPenginapan] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { firestore, user } = useFirebase();
  const { setNeedLogin, formPesanan } = usePesanan();

  let pesanProduk;

  try {
    // console.log(user.uid);
  } catch (e) {
    setNeedLogin(true);
    return (
      <Redirect
        to={{
          pathname: "/user/login",
          state: {
            from: location,
          },
        }}
      />
    );
  }

  // pesanProduk = firestore.collection("pesanan").doc(`${user.uid}`);
  pesanProduk = firestore.collection("pesanan").doc(`${idGenerator}`);

  const produk = firestore
    .collection("penginapan")
    .doc("data")
    .collection("produk")
    .doc(`${match.params.penginapanId}`);

  produk.get().then((res) => {
    setJumlahKamar(res.data().jumlahKamar);
    setJenisPenginapan(res.data().jenisPenginapan);
  });

  // memasukan data tambahan ke form
  const kodeBooking = BookingCode();
  form.namaPenginapan = formPesanan.namaPenginapan;
  form.jenisIuran = formPesanan.jenisIuran;
  form.harga = formPesanan.harga;
  form.codeHarga = formPesanan.codeHarga;
  form.kodeBooking = kodeBooking;
  form.foto = formPesanan.foto;
  form.reserved = true;
  form.userId = user.uid;
  form.penginapanId = match.params.penginapanId;
  form.approvalStatus = false;
  form.statusPerpanjang = false;
  form.jenisPenginapan = jenisPenginapan;
  form.rating = 0;

  const handleChange = (e) => {
    setError({
      ...error,
      [e.target.name]: "",
    });

    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  if (!form.namaPenginapan) {
    return <Redirect to={`/view/penginapan/${match.params.penginapanId}`} />;
  }

  const validate = () => {
    const newError = { ...error };

    if (!form.namaKTP) {
      newError.namaKTP = "Nama sesuai KTP wajib diisi";
    }
    if (!form.nomorKTP) {
      newError.nomorKTP = "Nomor KTP wajib diisi";
    }
    if (!form.tanggalPesan) {
      newError.tanggalPesan = "Tanggal pesan harus diisi";
    }
    if (!form.nomorHpWa) {
      newError.nomorHpWa = "Tanggal pesan harus diisi";
    }

    return newError;
  };
  const request = require("request");
  const sendPesananToTelegram = async (msg) => {
    const endp =
      "https://api.telegram.org/bot1291851346:AAHuNYhhWGXwv4t14xbe7KWRJ_YW3Qx4TG0/sendMessage";
    const chatId = -488410249;
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

  const handleSimpan = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const findError = validate();
    try {
      if (Object.values(findError).some((err) => err !== "")) {
        setError(findError);
      } else {
        const biaya = parseInt(form.harga) + form.codeHarga
        sendPesananToTelegram(
        `Pesanan baru : ${form.namaPenginapan} (${form.kodeBooking}) ${form.jenisIuran} ${form.namaKTP} (${form.nomorKTP}) (${currency(biaya)}) ${form.pilihBank} HP : ${form.nomorHpWa} `
        );

        await pesanProduk.set({ ...form }, { merge: false });
        await produk.set({ jumlahKamar: jumlahKamar - 1 }, { merge: true });

        history.push(`/view/penginapan/${match.params.penginapanId}/proses`);
      }
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
    setSubmitting(false);
  };

  // REQUIREMENTS

  const handleNext = (e) => {
    e.preventDefault();
    const findError = validate();
    switch (activeStep) {
      case 0:
        if (Object.values(findError).some((err) => err !== ""))
          setError(findError);
        else {
          setActiveStep(activeStep + 1);
        }
        break;
      default:
        if (form.pilihBank) {
          setActiveStep(activeStep + 1);
        }
        break;
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <FormPemesan
            error={error}
            form={form}
            isSubmitting={isSubmitting}
            handleChange={handleChange}
          />
        );
      case 1:
        return <PaymentForm form={form} setForm={setForm} error={error} />;
      case 2:
        return <Review form={form} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const steps = ["Data", "Bayar", "Review"];

  return (
    <div>
      <Card className={classes.papper}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
              {/* <DialogActions> */}
              <Button variant="contained" color="primary">
                Pesanan
              </Button>
              {/* </DialogActions> */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep === 0 && (
                  // <DialogActions>
                  <Tooltip title="Kembali">
                  <Button onClick={history.goBack} className={classes.button}>
                    Back
                  </Button>
                  </Tooltip>
                  // </DialogActions>
                )}
                {activeStep !== 0 && (
                  // <DialogActions>
                  <Tooltip title="Kembali">
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  </Tooltip>
                  // </DialogActions>
                )}
                {/* <DialogActions> */}
                {activeStep !== steps.length - 1 ? (
                  <Tooltip title="Selanjutnya">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSimpan}
                    disabled={isSubmitting}
                    className={classes.button}
                  >
                    Pesan sekarang
                  </Button>
                )}
                {/* </DialogActions> */}
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Card>
    </div>
  );
};

DialogBooking.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

// export default withRouter(DialogBooking);
export default DialogBooking;
