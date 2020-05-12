const request_link = 'https://corona-virus-stats.herokuapp.com/api/v1/cases/';

async function fetch_country_data(country_name){
    let res = await fetch(request_link + 'countries-search?search=' + country_name);
    let country_data =  await res.json();
    if(country_data.data.paginationMeta.totalRecords === 0){
        return [];
    }else{
        return country_data.data.rows[0];
    }
};

//

async function fetch_country_list(search_input){
    let res = await fetch(request_link + 'countries-search?limit=20&search=' + search_input);
    let res_json =  await res.json();
    let total_pages = await res_json.data.paginationMeta.totalPages;
    //
    let country_list = [];
    
    for(var i=1; i<=total_pages; i++){
        let detail_res = await fetch(request_link + 'countries-search?limit=20&search=' + search_input + '&page=' + i.toString());
        let detail_res_data = await detail_res.json();
        detail_res_data.data.rows.forEach((c) => {
            if(c.country !== ''){
                country_list.push(c.country);
            }
            //countries.push(c.country);
        });
    }
    return country_list.sort();
};

export {fetch_country_data, fetch_country_list}