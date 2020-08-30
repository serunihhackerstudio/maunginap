import React, { useState, useEffect } from 'react'
import { useFirebase } from '../../../../components/FirebaseProvider'
import { useCollection } from 'react-firebase-hooks/firestore'
import Typography from '@material-ui/core/Typography'


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { currency } from '../../../../utils/formatter';
// React router
import { Route, Switch, Link, Redirect } from 'react-router-dom' 
import useStyles from './style';

// icon
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// component 
import AppPageLoading from '../../../../components/AppPageLoading'

function Bayar(){
    const classes = useStyles()
    const [produkItems, setProdukItems] = useState(
        [
            {
                fotoBank:'https://statik.tempo.co/data/2018/02/06/id_682386/682386_720.jpg',
                bank:'Mandiri',
                noRek:'1632049823094820',
                atasNama:'Toufani Rizal Alfarisi',
                id:'_dsf2343423423'
            },
            {
                fotoBank:'https://statik.tempo.co/data/2018/02/06/id_682386/682386_720.jpg',
                bank:'Mandiri',
                noRek:'1632049823094820',
                atasNama:'Toufani Rizal Alfarisi',
                id:'_dsf2343423425'
            }
        ]
    )

    console.log(produkItems)
    return (
        <div>
        INI HALAMAN BAYAR
        <Grid container spacing={5}>
        {
                produkItems.map((produkDoc) => {
                    return <Grid key={produkDoc.id}
                    item={true} xs={12} xm={12} md={4} lg={4}>
                        <Card className={classes.root}>
                        <CardActionArea component={Link} to={`/view/penginapan/${produkDoc.id}`}>
                            <CardMedia
                            className={classes.media}
                            image={produkDoc.fotoBank}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {produkDoc.bank}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {produkDoc.noRek}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {produkDoc.atasNama}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions >
                            <Button size="small" color="primary">
                                Pesan
                            </Button>
                        </CardActions>
                        </Card>
                    </Grid>
                })
            }
            </Grid>
        </div>
    )
}

export default Bayar;