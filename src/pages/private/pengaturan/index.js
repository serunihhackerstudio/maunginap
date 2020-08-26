import React from 'react'

// material ui
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import {Switch, Route, Redirect} from 'react-router-dom';
import Admin from './admin'
import Identitas from './identitas';
import useStyles from './styles'

function Pengaturan(props){

    const handleChangeTab = (event, value) => {
        props.history.push(value)
    }

    const classes = useStyles();

    return(
        <Paper square>
        <Tabs 
        value={props.location.pathname}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab} 
        >
            <Tab label="Admin" value="/pengaturan/admin"/>
            <Tab label="Identias" value="/pengaturan/identitas"/>
        </Tabs>
        <div className={classes.tabContent}>
        <Switch>
            <Route path="/pengaturan/admin" component={Admin} />
            <Route path="/pengaturan/identitas" component={Identitas} />
            <Redirect to="/pengaturan/admin" />
        </Switch>
        </div>
        </Paper>
    )

}

export default Pengaturan