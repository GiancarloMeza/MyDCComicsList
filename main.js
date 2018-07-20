// This urls is from airtable from the Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/apphqaKHaWm6NvtYO/Table%201?api_key=keySx6GmwxJ6iqhTD';

var cardTemplate = function(name, rating, pictures){
    return `
        <div class="row">
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="${pictures}" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-title">${name}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Get More Info</button>
                            </div>
                            <p class="card-text">${rating}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

//This is where we get the JSON data from 
$.getJSON( airtable_list_url, function( data ) {
    var items = [];
    $.each( data.records, function( key, val ) {
        //console.log(val.fields)
        var name = val.fields['Name'];
        var rating = val.fields['Rating'];
        var pictures = val.fields['Pictures'][0] ? val.fields['Pictures'][0].url : null;
        var html = cardTemplate(name, rating, pictures);
        items.push(html);
    });
    $(".list-view").append(items.join(''));
});