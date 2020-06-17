import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Cards from './components/Cards';
import SearchBar from './components/SearchBar';

//import { Card, Typography, CardContent, AppBar, FormControl, NativeSelect, TextField } from '@material-ui/core';
import { fetch_country_data } from './data_fetcher';
//import { makeStyles } from '@material-ui/core/styles';


export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.countries_data = [];
    this.handle_select = this.handle_select.bind(this);
  }

  componentDidMount(){
    this.handle_select('world');
  }

  async handle_select(selection){
    console.log("selected: " + selection);
    if(selection === ''){
      selection = 'world'
    }
    let new_selection = await fetch_country_data(selection);
    this.setState(new_selection);
    console.log('displaying: ' + selection);

  }

  render(){
    //variables

    return(
    <div>
      <NavBar />
      <SearchBar handler = {this.handle_select}/>
      <Cards data = {this.state}/>
    </div>
    )
  }
}

/*
Difficulties I faced:
NativeSelect updating and displaying selected state from different component (.js file)
Async Await Concurrency
*/