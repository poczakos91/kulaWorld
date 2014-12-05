/**
 * Created by poczakos on 11/11/2014.
 */
kw.MapLoader = {};

kw.MapLoader.loadMap = function(mapName,callback) {
    this.callback = callback;
    $.ajax({
        "url": "src/PHP/mapLoader.php",
        "type": "POST",
        "data": {"mapName" : mapName},
        "context" : this
    }).done(this.receiveRawMap);
};

kw.MapLoader.receiveRawMap = function(data) {
    var jsonMap = JSON.parse(data);
    kw.map.generateModel(jsonMap);

    kw.scene.add(kw.map.getView());
    this.callback.call();
};