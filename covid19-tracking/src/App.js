import React, { Component } from 'react';
import './App.css';

import { Card, Typography, CardContent, AppBar, FormControl, NativeSelect } from '@material-ui/core';
import { fetch_data } from './data_fetcher';


export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.countries = [];
    this.options = [];
    this.selected = 'World';
  }

  async componentDidMount(){
    const data = await fetch_data();
    this.countries = await data;
    let selected_country_data = await data[this.selected];
    this.setState(selected_country_data);
    console.log(this.countries);
  }

  async handle_selected(selection){
    let new_state = this.countries[selection];
    this.setState(new_state);
  }

  render(){
    //variables
    let last_update = 'T.B.A.';
    let selected_country = this.selected;
    let selected_country_data = this.state;
    let options = [];
    for(var c in this.countries) options.push(c);
    console.log(this.state);

    return(
    <div>
      <AppBar position='static'>
        <Typography variant='h1' color='inherit'>COVID-19 Data Tracking</Typography>
        <Typography variant='h4'>Last Updated: </Typography>
      </AppBar>
      <div className="covidOverview">
        <Card variant='outlined' className='covidDeath'>
          <CardContent>
            <Typography variant='subtitle1' component='h4'>Death</Typography>
    <Typography variant='inherit' component='h1'>{selected_country_data.total_deaths}</Typography>
            <Typography variant='body1'>Number of Death Cases of COVID-19</Typography>
          </CardContent>
        </Card>
        <Card variant='outlined' className='covidConfirmed'>
        <CardContent>
            <Typography variant='subtitle1' component='h4'>Confirmed</Typography>
    <Typography variant='inherit' component='h1'>{selected_country_data.total_cases}</Typography>
            <Typography variant='body1'>Number of Active Cases of COVID-19</Typography>
          </CardContent>
        </Card>
        <Card variant='outlined' className='covidRecovered'>
        <CardContent>
            <Typography variant='subtitle1' component='h4'>Recovered</Typography>
    <Typography variant='inherit' component='h1'>{selected_country_data.total_recovered}</Typography>
            <Typography variant='body1'>Number of Recovered Cases of COVID-19</Typography>
          </CardContent>
        </Card>
      </div>

      <FormControl>
        <NativeSelect defaultChecked = {this.selected} onChange = {(e) => this.handle_selected(e.target.value)}>
          {options.map((k,v) => <option key = {v} value = {k}>{k}</option>)}
        </NativeSelect>
      </FormControl>
      
    </div>
    )
  }
}

