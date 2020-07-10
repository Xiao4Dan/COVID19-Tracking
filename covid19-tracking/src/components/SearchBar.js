import React from 'react';
import { TextField, makeStyles, InputLabel, NativeSelect, FormControl} from '@material-ui/core';
import { fetch_country_list } from '../data_fetcher';

const useStyles = makeStyles((theme) =>({
    root: {
        "@media (min-width:650px)":{
            display: 'flex',
            justifyContent: 'center',
        },
        "@media (max-width:650px)":{
            display:'block',
        }
    },
    search_form:{
        margin: theme.spacing(2),
        "@media (min-width:650px)":{
            minWidth: 300,
        },
        "@media (max-width:650px)":{
            width:'90%',
        }
    },
    select_form:{
        margin: theme.spacing(2),
        "@media (min-width:650px)":{
            minWidth: 150,
        },
        "@media (max-width:650px)":{
            width:'90%',
        }
    },
  }));


export default function SearchBar(props){
    const classes = useStyles();
    const [state, setState] = React.useState({
        selection: 'world',
        options: [],
      });

    const handle_select = (selected) =>{
        setState({
            ...state,
            selection: selected,
        });
        props.handler(selected)
    }

    const handle_search = async (search) => {
        let country_selections = [];
        if(search !== ''){
            country_selections = await fetch_country_list(search);
            state.options = country_selections;
            //isnt react hooks in functions a bit too much work here
        }
        country_selections === [] ? handle_select(undefined) : handle_select(country_selections[0]);
    };

    return(
        <div className = {classes.root}>
            <FormControl className={classes.search_form}>
                <TextField id="search-country" label="Search Country" onChange = {(e) => handle_search(e.target.value)}/>
            </FormControl>
            <FormControl className={classes.select_form}>
            <InputLabel>Selected</InputLabel>
                <NativeSelect
                value={state.selection}
                onChange={(e) => handle_select(e.target.value)}
                >
                <option value={state.selection} key={state.selection}>{state.selection}</option>
                {state.options.map((v) => 
                    <option value={v} key={v}>{v}</option>
                )};
                </NativeSelect>
            </FormControl>
        </div>
    );
}