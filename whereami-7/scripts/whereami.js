var whereami = document.getElementById('where-am-i');

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


var verifier = new mozmarket.receipts.Verifier({
  installs_allowed_from: '*',
  typsAllowed: 'test-receipt',
  logLevel: mozmarket.receipts.Verifier.levels.DEBUG,
  onlog: mozmarket.receipts.Verifier.consoleLogger
});
verifier.clearCache();

function verifyPaymentReceipts(cb) {
  verifier.verify(function (verifier) {
    if (verifier.state instanceof verifier.states.OK) {
      cb(null); // valid payment
    } else {
      cb("invalid-payment"); // invalid payment
    }
  });
  setTimeout(function checkNoReceipts() {
    if (verifier.state instanceof verifier.states.NoReceipts) {
      cb("no-receipts");
    }
  }, 2000);
}

whereami.onclick = function() {
  verifyPaymentReceipts(function (err) {
    if (err) {
      alert("Invalid Payment Receipt.");
    } else {
      navigator.geolocation.getCurrentPosition(getMap, error);
    }
  });
};
