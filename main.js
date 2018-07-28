var getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
// This urls is from airtable from the Authentication section
var api_key = 'keySx6GmwxJ6iqhTD';

var listView = function(id, name, rating, pictures){
    return `
    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12"> 
        <div class="card mb-4 box-shadow">
        <a href="?id=${id}"><img class="card-img-top" src="${pictures}" alt="Card image cap"></a>
            <div class="card-body">
                <p class="card-title">${name}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                    <a href="?id=${id}"><button type="button" class="btn btn-sm btn-outline-secondary">Get More Info</button></a>
                    </div>
                    <p class="card-text">${rating}</p>
                </div>
            </div>
        </div>
    </div>`;
}

var getDataForList = function(){
    //This is where we get the JSON data from 
    $.getJSON( `https://api.airtable.com/v0/apphqaKHaWm6NvtYO/Table%201?api_key=keySx6GmwxJ6iqhTD&view=Rating`, function( data ) {
    var html = [];
    $.each(data.records, function(index, val) {
        var id = val.id;
        var fields = val.fields;
        var name = fields["Name"];
        var rating = fields["Rating"];
        var pictures = fields['Pictures'] ? fields['Pictures'][0].url : null;
        var itemHTML = listView(id, name, rating, pictures);
        html.push(itemHTML);
    });  
    $(".list-view").append(html.join(""));
    });
}

var detailView = function(id, name, pictures, rating, cost, dccomics, buyit, about, realesdate, enddate, art, wriitenby){
    return `
    <div class="col-sm-12">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${pictures}">
      <div class="card-body">
        <h2>${name}</h2>
        <p class="card-text">${rating}</p>
        <p class="card-text">${cost}</p>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${rating}</small>
          <small class="text-muted">${cost}</small>
          <small class="text-muted">${about}</small>
          <small class="text-muted">${wriitenby}</small>
          <small class="text-muted">${art}</small>
          <small class="text-muted">${realesdate}</small>
          <small class="text-muted">${enddate}</small>
        </div>
        ${dccomics ? `<a href="${dccomics}">${dccomics}</a>`: ``}
        <hr/>
        </div>
        ${buyit ? `<a href="${buyit}">${buyit}</a>`: ``}
        <hr/>
      </div>
    </div>
  </div>`
}

var getDataForId = function(id) {
    $.getJSON( `https://api.airtable.com/v0/apphqaKHaWm6NvtYO/Table%201${id}?api_key=keySx6GmwxJ6iqhTD`, function( record ) {
      var html = [];
      html.push('<div class="row">');
        var id = record.id;
        var fields = record.fields;
        var name = fields["Name"];
  
        var pictures = fields["Pictures"] ? fields["Pictures"][0].url : '';
        var rating = fields["Rating"];
        var cost = fields["Cost"];
        var dccomics = fields["DCComics"];
        var buyit = fields["BuyIt"];
        var about = fields["About"];
        var realesdate = fields["RealesDate"];
        var enddate = fields["EndDate"];
        var art = fields["Art"];
        var writtenBy = fields["WrittenBy"];
  
        var itemHTML = detailView(id, name, pictures, rating, cost,  dccomics, buyit, about, realesdate, enddate, art, writtenby);
        html.push(itemHTML);
      html.push('</div>');
      $(".detail-view").append(html.join(""));
    });
  }
  var id = getParameterByName("id");

if (id) {
  getDataForId(id);
} else {
    getDataForList();
}