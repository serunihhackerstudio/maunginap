import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

// table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// styles
import useStyles from "./styles";

// icons
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import IconButton from "@material-ui/core/IconButton";
import { Label } from "@material-ui/icons";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

function CheckoutAir() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    cod: true,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // Table function
  //   const createData = () => {
  //       return {namaProduk, harga, jumlah}
  //   }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        {/* Tabel */}
        <TableContainer component={Paper} className={classes.mypaper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Produk</TableCell>
                <TableCell align="center">Harga</TableCell>
                <TableCell align="center">Jumlah</TableCell>
                <TableCell align="center">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="right">
                  <img
                    src="https://images.bisnis-cdn.com/thumb/posts/2020/12/14/1330791/depo-air-isi-ulang.jpg?w=744&h=465"
                    width={50}
                    height={50}
                    alt="img preview"
                  />
                </TableCell>
                <TableCell align="left">Air minum isi ulang</TableCell>
                <TableCell align="center">Rp. 10.000</TableCell>
                <TableCell align="right">
                  <Grid container style={{textAlign:"left"}}>
                    <Grid item>
                      <IconButton
                        color="primary"
                        aria-label="Tambah"
                        component="span"
                      >
                        <IndeterminateCheckBoxRoundedIcon />
                      </IconButton>
                    </Grid>
                    <Grid item style={{margin:14}}>
                        2
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="primary"
                        aria-label="Kurangi"
                        component="span"
                      >
                        <AddBoxRoundedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">Rp. 20.000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Tabel */}
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper className={classes.mypaper} elevation={1}>
          <Typography style={{ marginBottom: 20 }}>
            Alamat Pengiriman
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
          >
            Tambah Alamat
          </Button>
        </Paper>
        <Paper
          className={classes.mypaper}
          style={{ marginTop: 10 }}
          elevation={1}
        >
          <Grid container>
            <Grid item xs={6}>
              <Typography style={{ marginBottom: 20 }}>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography style={{ marginBottom: 20 }}>Rp 100.000</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6" style={{ marginBottom: 20 }}>
                Total
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography
                variant="h6"
                color="primary"
                style={{ marginBottom: 20 }}
              >
                Rp 100.000
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          className={classes.mypaper}
          elevation={1}
          style={{ marginTop: 10 }}
        >
          <Typography style={{ marginBottom: 20 }}>
            Pilih Metode Pembayaran
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.cod}
                onChange={handleChange}
                name="cod"
              />
            }
            label="COD"
          />
        </Paper>
        <Button
          style={{ marginTop: 10 }}
          variant="contained"
          color="secondary"
          fullWidth
          disableElevation
        >
          Checkout Sekarang
        </Button>
      </Grid>
      {/* <Typography variant="body1">Ini Halaman Cehckout Produk Air</Typography> */}
    </Grid>
  );
}

export default CheckoutAir;
