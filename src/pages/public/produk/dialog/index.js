import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

// firebase
import { useFirebase } from "../../../../components/FirebaseProvider";
import { usePesanan } from "../../../../components/PesananProvider";

// styles
import useStyles from "./styles";
import { useSnackbar } from "notistack";

// util
import ID from "../../../../utils/idgenerator";

// react fragment
import PaymentForm from "./fragment/PaymentForm";
import FormPemesan from "./fragment/FormPemesan";
import Review from "./fragment/Review";
import { Typography } from "@material-ui/core";
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
    jumlahKamar: "",
    jenisIuran: jenisIuran,
    tanggalPesan: new Date(),
    reserved: false,
  });

  const [error, setError] = useState({
    namaKTP: "",
    nomorKTP: "",
    jumlahKamar: "",
    pilihBank: "",
    tanggalPesan: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { firestore, user } = useFirebase();
  const { setNeedLogin, formPesanan } = usePesanan();
  // const [pilihBank, setPilihBank] = useState(false);

  let pesanProduk;

  try {
    console.log(user.uid);
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
  pesanProduk = firestore
    .collection("pesanan")
    .doc(`${match.params.penginapanId}`);

  // memasukan data tambahan ke form
  console.log(formPesanan);
  form.namaPenginapan = formPesanan.namaPenginapan;
  form.jenisIuran = formPesanan.jenisIuran;
  form.harga = formPesanan.harga;
  form.kodeBooking = idGenerator;
  form.foto = formPesanan.foto;
  form.reserved = true;
  form.userId = user.uid;
  form.penginapanId = match.params.penginapanId;

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

    if (!form.jumlahKamar) {
      newError.jumlahKamar = "Jumlah kamar harus diisi";
    }
    if (!form.tanggalPesan) {
      newError.tanggalPesan = "Tanggal pesan harus diisi";
    }

    return newError;
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const findError = validate();
    try {
      if (Object.values(findError).some((err) => err !== "")) {
        setError(findError);
      } else {
        await pesanProduk.set({ ...form }, { merge: false });
        history.push(`/view/penginapan/${match.params.penginapanId}/proses`);
      }
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
      console.log("gagal terkirim");
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

  const steps = ["Data pemesan", "Metode pembayaran", "Review pesanan"];

  return (
    <div>
      <Paper className={classes.papper}>
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
                  <Button onClick={history.goBack} className={classes.button}>
                    Back
                  </Button>
                  // </DialogActions>
                )}
                {activeStep !== 0 && (
                  // <DialogActions>
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  // </DialogActions>
                )}
                {/* <DialogActions> */}
                {activeStep !== steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
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
        {/* </DialogContent> */}
        {/* </Dialog> */}
      </Paper>
    </div>
  );
};

DialogBooking.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

// export default withRouter(DialogBooking);
export default DialogBooking;
