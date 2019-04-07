const weatherApi = "7218a65e0039578c26014d85b9af7532"; 
const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?";
const weatherImgUrl = "http://openweathermap.org/img/w/"

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), { // 地図を埋め込む
    center: { // 地図の中心を指定
      lat: 35.6812362, // 緯度
      lng: 139.7671248 // 経度
    },
    zoom: 5 // 地図のズームを指定
  });
  
  // クリックイベントを追加
  map.addListener('click', function(e) {
    getClickLatLng(e.latLng, map);
  })

}

var marker;

function getClickLatLng(lat_lng, map) {
  //console.log(lat_lng.lat() + " , " + lat_lng.lng());
  const lat = lat_lng.lat();
  const lon = lat_lng.lng();
  //console.log(lat + " , " + lon);
  
  // 座標を表示
  //document.getElementById('lat').textContent = lat_lng.lat();
  //document.getElementById('lng').textContent = lat_lng.lng();

  // マーカーを消す
  if (marker) marker.setMap(null);

  // マーカーを設置
  marker = new google.maps.Marker({
    position: lat_lng,
    map: map
  });

  // 座標の中心をずらす
  // http://syncer.jp/google-maps-javascript-api-matome/map/method/panTo/
  map.panTo(lat_lng);
  map.setZoom(10);
  
  // 天気予報取得
  //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
  const parameters = $.param({
    lat: lat,
    lon: lon,
    appid: weatherApi,
    units: "metric",
    //mode: "html"
  });

  const get_url = weatherUrl + parameters;
  console.log(get_url);

  $("#weather").empty();

  $.getJSON(get_url, function(data) {
    console.log(data);
    
    let $div = $("<div>", {"class": "weather-item"});

    $div.append('<div class="weather-name">' + data.name + '</div>');
    $div.append('<div class="weather-main">' + data.weather[0].main + '</div>');
    $div.append('<div class="weather-description">' + data.weather[0].description + '</div>');
    $div.append($("<div>", {"class": "weather-image"}).
      append($("<img>", {"src": weatherImgUrl + data.weather[0].icon + '.png', "class": "weather-icon" ,}))
    );
    $div.append('<div class="weather-temp">' + data.main.temp + '&deg;C' + '</div>');

    $div.appendTo("#weather");

  });

}
