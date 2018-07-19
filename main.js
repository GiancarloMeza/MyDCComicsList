// This urls is from airtable from the Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/apphqaKHaWm6NvtYO/Table%201?api_key=keySx6GmwxJ6iqhTD';

//This is where we get the JSON data from 
$.getJSON( airtable_list_url, function( data ) {
    var items = [];
    $.each( data.records, function( key, val ) {
        console.log(val.fields)
        items.push(`<h2>${val.fields['Name']}</h2>`);
    });
    $(".list-view").append(items.join(''));
});