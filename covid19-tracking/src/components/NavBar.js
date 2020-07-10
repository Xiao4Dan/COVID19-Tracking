import React from 'react';
import { AppBar, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) =>({
    root:{
        padding: theme.spacing(0),
    }
}));

export default function NavBar(){
    const classes = useStyles();

    return(
        <div className = {classes.root}>
            <AppBar position = 'static'>
                <Typography variant='h1' color='inherit'>COVID-19 Data Tracking</Typography>
            </AppBar>
        </div>
    );
}