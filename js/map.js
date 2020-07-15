var mymap;
function init(){
    mymap = L.map('mapid').setView([51.505, -0.09], 13);

  	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGVvbmFyZHpoIiwiYSI6ImNqbGVqZTdnYzAzcTYza3JreHV0ODhvbnkifQ.jYF4Mv6k_QGiEItFFlYZVw', {
  		maxZoom: 18,

  		id: 'mapbox.light'
  	}).addTo(mymap);
    getlocation();

}

function getlocation(){
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var url = "https://api.foursquare.com/v2/users/self/checkins?oauth_token=E5PEEUUOBGQAAUN4VYJFZ5NZ1Q3AAYZWMD135ECB5KP5AFKH&v=20180828&limit=3";
  fetch(url)
  .then(res => res.json())
    .then(function(data) {
        // Code for handling API response


        //var var1 = data['response']


        for(var i=0;i<data.response.checkins.count;i++){
          var checkin =  data.response.checkins.items[i];
          if(checkin.venue.location.lat){
            var dt = new Date(checkin.createdAt * 1000);
            mymap.setView([checkin.venue.location.lat, checkin.venue.location.lng],13)
            var circle = L.circle([checkin.venue.location.lat, checkin.venue.location.lng], {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: 100
            }).addTo(mymap).bindPopup("Last found here on "+ months[dt.getMonth()] + " " + dt.getDate()+" around " +(dt.getHours()+parseInt(Math.round(dt.getMinutes()/60.0))) +":00").openPopup();;
            break;
          }
        }
    })
    .catch(error => console.error('Error:', error));



}
