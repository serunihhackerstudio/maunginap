import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";

// firebase
import { useFirebase } from "../../../../components/FirebaseProvider";
import { usePesanan } from "../../../../components/PesananProvider";

// styles
import useStyles from "./styles";
import { useSnackbar } from "notistack";

// util
import ID from "../../../../utils/idgenerator";

// react fragment
import AddressForm from "./fragment/AddressForm";
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
  });

  const [error, setError] = useState({
    namaKTP: "",
    nomorKTP: "",
    jumlahKamar: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { firestore, user } = useFirebase();
  const { needLogin, setNeedLogin } = usePesanan();
  let pesanProduk;

  try {
    const userUid = user.uid;
    console.log("Ini dialog");
  } catch (e) {
    setNeedLogin(true);
    console.log("DARI DIALOG " + needLogin);
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

  pesanProduk = firestore.collection("pesanan").doc(`${user.uid}`);

  // memasukan data tambahan ke form
  form.namaPenginapan = namaPenginapan;
  form.jenisIuran = jenisIuran;
  form.harga = harga;
  form.kodeBooking = idGenerator;
  form.foto = foto;

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
        await pesanProduk.set({ ...form }, { merge: true });
        history.push(`/view/penginapan/${match.params.penginapanId}/proses`);
      }
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
      console.log("gagal terkirim");
    }
    setSubmitting(false);
  };

  // REQUIREMENTS

  const handleNext = () => {
    setActiveStep(activeStep + 1);
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
        return <PaymentForm form={form} />;
      case 2:
        return <Review form={form} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const steps = ["Data pemesan", "Metode pembayaran", "Review pesanan"];

  return (
    <div>
      <Dialog
        disableBackdropClick={isSubmitting}
        disableEscapeKeyDown={isSubmitting}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Checkout <Typography color="primary"> {namaPenginapan} </Typography>
        </DialogTitle>
        <DialogContent divides="true">
          <DialogContentText id="alert-dialog-slide-description">
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </DialogContentText>
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
                <DialogActions>
                  <Button variant="contained" color="primary">
                    Pesanan
                  </Button>
                </DialogActions>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <DialogActions>
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    </DialogActions>
                  )}
                  <DialogActions>
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
                        className={classes.button}
                      >
                        Pesan sekarang
                      </Button>
                    )}
                  </DialogActions>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </DialogContent>
      </Dialog>
    </div>
  );
};

DialogBooking.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withRouter(DialogBooking);

{
  /* <TextField
            id="namaKTP"
            name="namaKTP"
            label="Nama Lengkap (Sesuai KTP)"
            fullWidth
            required
            margin="normal"
            value={form.namaKTP}
            onChange={handleChange}
            helperText={error.namaKTP}
            error={error.namaKTP ? true : false}
            disabled={isSubmitting}
          />
          <TextField
            id="nomorKTP"
            name="nomorKTP"
            label="Nomor KTP"
            fullWidth
            required
            margin="normal"
            value={form.nomorKTP}
            onChange={handleChange}
            helperText={error.nomorKTP}
            error={error.nomorKTP ? true : false}
            disabled={isSubmitting}
          />
          <TextField
            id="jumlahKamar"
            name="jumlahKamar"
            label="Berapa Kamar ?"
            type="number"
            required
            fullWidth
            margin="normal"
            value={form.jumlahKamar}
            onChange={handleChange}
            helperText={error.jumlahKamar}
            error={error.jumlahKamar ? true : false}
            disabled={isSubmitting}
          /> */
}
