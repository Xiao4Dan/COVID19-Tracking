import React from 'react';
import { Card, Typography, makeStyles, CardContent, ListItem, ListItemText} from '@material-ui/core';

const useStyles = makeStyles((theme) =>({
    root: {
      display:'flex',
      alignItems:'center',
      flexDirection:'column',
    },
    card: {
      margin:theme.spacing(2),
    },
    cards: {
      display:'flex',
      alignItems:'center',
      [theme.breakpoints.up('sm')]: {
        flexDirection:'row',
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection:'column',
      },
    },
    list: {
      [theme.breakpoints.up('sm')]: {
        width:'550px',
      },
      [theme.breakpoints.down('sm')]: {
        width:'80%',
      },
    },
    covidDeath:{
      width:300,
      height:300,
      margin:theme.spacing(2),
      '&:hover':{},
      '& h1':{
        color: '#FA8978',
      },
    },
    covidConfirmed:{
      width:300,
      height:300,
      margin:theme.spacing(2),
      '& h1':{
        color: '#FFDD94',
      },
    },
    covidRecovered:{
      width:300,
      height:300,
      margin:theme.spacing(2),
      '& h1':{
        color: '#D0E6A5',
      },
    },
}));

export default function Cards(props){
    const classes = useStyles();

    const selected_country_data = props.data;
    console.log(props.data);

    return(
        <div className = {classes.root}>
          <ListItem button className = {classes.list}>
            <ListItemText primary= {selected_country_data.cases_per_mill_pop} secondary = '/ Million Population' />
            <ListItemText primary= {selected_country_data.new_deaths} secondary = ' new death' />
            <ListItemText primary= {selected_country_data.new_cases} secondary = ' new confirmed' />
          </ListItem>
          <div className = {classes.cards}>
            <Card variant='outlined' className={classes.covidDeath}>
              <CardContent>
                <Typography variant='subtitle1' component='h4'>Death</Typography>
                <Typography variant='inherit' component='h1'>{selected_country_data.total_deaths}</Typography>
                <Typography variant='body1'>Number of Death Cases of COVID-19</Typography>
              </CardContent>
            </Card>
            <Card variant='outlined' className={classes.covidConfirmed}>
            <CardContent>
                <Typography variant='subtitle1' component='h4'>Confirmed</Typography>
                <Typography variant='inherit' component='h1'>{selected_country_data.total_cases}</Typography>
                <Typography variant='body1'>Number of Active Cases of COVID-19</Typography>
              </CardContent>
            </Card>
            <Card variant='outlined' className={classes.covidRecovered}>
            <CardContent>
                <Typography variant='subtitle1' component='h4'>Recovered</Typography>
                <Typography variant='inherit' component='h1'>{selected_country_data.total_recovered}</Typography>
                <Typography variant='body1'>Number of Recovered Cases of COVID-19</Typography>
              </CardContent>
            </Card>
          </div>
        </div>
    );
}