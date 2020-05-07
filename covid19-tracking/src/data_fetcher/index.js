const request_link = 'https://corona-virus-stats.herokuapp.com/api/v1/cases/';

export async function fetch_data(){
    let res = await fetch(request_link + 'countries-search?limit=10');
    let res_json = await res.json();
    let total_pages = await res_json.data.paginationMeta.totalPages;
    //
    let countries = [];
    for(var i=1; i<=total_pages; i++){
        let detail_res = await fetch(request_link + 'countries-search?limit=10&page=' + i.toString());
        let detail_res_data = await detail_res.json();
        await detail_res_data.data.rows.map(function(c){
            countries[c.country] = c;
            //countries.push(c.country);
        });
    }
    return countries;
};