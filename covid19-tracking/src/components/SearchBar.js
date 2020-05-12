import React from 'react';
import { TextField, makeStyles, InputLabel, NativeSelect, FormControl} from '@material-ui/core';
import { fetch_country_list } from '../data_fetcher';

const useStyles = makeStyles((theme) =>({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
    search_form:{
        margin: theme.spacing(2),
        minWidth: 300,
    },
    select_form:{
        margin: theme.spacing(2),
        minWidth: 150,
    },
  }));


export default function SearchBar(props){
    const classes = useStyles();
    const [state, setState] = React.useState({
        selection: 'world',
        options: [],
      });

    const handle_select = props.handler;

    const handle_search = async (search) => {
        var country_selections = [];
        if(search !== ''){
            country_selections = await fetch_country_list(search);
        }
        console.log(country_selections);
        setState({
            ...state,
            options: country_selections,
        });
        country_selections === [] ? handle_select('world') : handle_select(country_selections[0]);
    };

    return(
        <div className = {classes.root}>
            <FormControl className={classes.search_form}>
                <TextField id="search-country" label="Search Country" onChange = {(e) => handle_search(e.target.value)}/>
            </FormControl>
            <FormControl className={classes.select_form}>
                <InputLabel></InputLabel>
                <NativeSelect
                value={state.selection}
                onChange={(e) => handle_select(e.target.value)}
                >
                {state.options.map((v) => 
                    <option value = {v} key = {v}>{v}</option>
                )};
                </NativeSelect>
            </FormControl>
            
        </div>
    );
}