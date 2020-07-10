const request_link = 'https://corona-virus-stats.herokuapp.com/api/v1/cases/';

async function fetch_country_data(country_name){
    let res = await fetch(request_link + 'countries-search?search=' + country_name);
    let country_data =  await res.json();
    let return_data = {};
    if(country_data.data.paginationMeta.totalRecords === 0 || country_name === undefined){
        return_data = {};
    }else{
        return_data = country_data.data.rows[0];
    }
    return return_data;
};

//

async function fetch_country_list(search_input){
    let res = await fetch(request_link + 'countries-search?limit=20&search=' + search_input);
    let res_json =  await res.json();
    let country_list = [];
    console.log(res_json);
    if(res_json.data.paginationMeta.totalRecords === 0){
        country_list = [];
    }else{
        res_json.data.rows.forEach((c) =>{
            if(c.country !== ''){
                country_list.push(c.country);
            }
        });
    }
    return country_list.sort();
    /*
    abandoned because of in-efficiency and not necessary, user can totally input more specifically
    let country_list = [];
    
    for(var i=1; i<=res_json.data.paginationMeta.totalPages; i++){
        let detail_res = await fetch(request_link + 'countries-search?limit=20&search=' + search_input + '&page=' + i.toString());
        let detail_res_data = await detail_res.json();
        detail_res_data.data.rows.forEach((c) => {
            if(c.country !== ''){
                country_list.push(c.country);
            }
            //countries.push(c.country);
        });
    }
    */
};

export {fetch_country_data, fetch_country_list}