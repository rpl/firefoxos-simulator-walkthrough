var whereami = document.getElementById('where-am-i');

whereami.onclick = function() {
  navigator.geolocation.getCurrentPosition(getMap, error);
};

function error(error) {
  console.log("navigator.geolocation.getCurrentPosition returned an error");
}

function getMap(position) {
  if (window.map) {
    window.map.dispose();
  }

  var options={
    elt:document.getElementById('map'),
    zoom:13,
    latLng:{lat:position.coords.latitude, lng:position.coords.longitude},
    mtype:'osm'
  };

  window.map = new MQA.TileMap(options);

  MQA.withModule('largezoom', function() {
    map.addControl(
      new MQA.LargeZoom(),
      new MQA.MapCornerPlacement(MQA.MapCorner.TOP_LEFT, new MQA.Size(5,5))
    );

  });

  var whereiam=new MQA.Poi( {lat:position.coords.latitude, lng:position.coords.longitude} );

  map.addShape(whereiam);
}

