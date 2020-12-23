import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import useStyles from "./styles";
import {sendCloudMessage} from "../../../config/mailserver";
import { useSnackbar } from "notistack";
export default function Messaging(){
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [isSubmitting, setSubmitting] = React.useState(false)
    const [form, setForm] = React.useState({
      judul:"",
      isipesan:""
    })

    const [error, setError] = React.useState({
      judul:"",
      isipesan:""
    })

    const validate = () => {
      const newError = { ...error };
      if (!form.judul) {
        newError.judul = "Judul wajib diisi";
      }
      if (!form.isipesan) {
        newError.isipesan = "Isi pesan wajib diisi";
      }
      return newError;
  };

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name] : e.target.value
      })
      setError({
        ...error,
        [e.target.name] : ""
      })
    }

    const sendCloudMessaging = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        const findErrors = validate()
        if (Object.values(findErrors).some((err) => err !== "")) {
          setError(findErrors);
        } else {
          await sendCloudMessage("Send push notification to android", form.judul, form.isipesan)
          enqueueSnackbar("Notifikasi berhasil dikirim", {variant:"success"})
        }
        setSubmitting(false)
      };
    return (
        <div>
            <Paper className={classes.papper}>
            <form id="produk-form" onSubmit={sendCloudMessaging}>
            <TextField
              id="judul"
              name="judul"
              label="Judul"
              margin="normal"
              fullWidth
              required
              value={form.judul}
              onChange={handleChange}
              error={error.judul ? true : false}
              helperText={error.judul}
              disabled={isSubmitting}
              variant="outlined"
            />
            <TextField
              id="isipesan"
              name="isipesan"
              label="Isi Pesan"
              margin="normal"
              fullWidth
              multiline
              rows={5}
              required
              value={form.isipesan}
              onChange={handleChange}
              error={error.isipesan ? true : false}
              helperText={error.isipesan}
              disabled={isSubmitting}
              variant="outlined"
            />
            <div className={classes.actionButton}>
             <Button
                form="produk-form"
                type="submit"
                color="primary"
                onClick={sendCloudMessaging}
                disabled={isSubmitting}
                variant="contained"
                startIcon={<SendIcon/>}
              > Publish
              </Button>
              </div>
            </form>
            </Paper>
        </div>
    )
}