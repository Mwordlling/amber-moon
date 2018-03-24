function finalmap() {

    var
        map
        ;

    var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';

    function my(selection) {

        selection.each(function() {

            var container = d3.select(this);
            
            d3.queue()
                .defer(d3.csv, "coordinates.csv")
                .defer(d3.json, "data/squares.1.geojson")
                .defer(d3.json, "data/squares.9.geojson")
                .await(function(err, points, squares1, squares9) {
                    if (err) throw err;

                    map = L.map(container.node(), {
                        minZoom: 6,
                        scrollWheelZoom: false
                    });

                    window.final_map = map;
    
                    // BING 11+
                    var bingLayer = L.tileLayer.bing({
                        bingMapsKey: BING_KEY,
                        minZoom: 10,
                        imagerySet: "AerialWithLabels"
                    });
                    bingLayer.addTo(map);


                    // Light raster 6 - 10
                    L.tileLayer('http://{s}.texty.org.ua/maps/t3/{z}/{x}/{y}.png', {
                        maxZoom: 9
                    }).addTo(map);

                    // map.setView([51.081851400000005, 27.3154423], 8, true);
                    map.fitBounds([[50.25022980000001,25.4251606],[51.913472999999996,29.205724]]);

                    // Squares1: 10+
                    var squares1_layer = L.geoJSON(squares1, {
                        style: {
                                fillColor: "black" ,
                                color: "#98c336",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.5,
                                stroke: 1
                        }
                    });
                    squares1_layer.addTo(map);

                    // Squares9: 6 -- 10
                    var squares9_layer = L.geoJSON(squares9, {
                        style: {
                            fillColor: "black" ,
                            color: "red",
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.5,
                            stroke: 0
                        }
                    });
                    squares9_layer.addTo(map);

                    // Для всіх НЕ TileLayer треба прописувати minZoom і maxZoom через хаки
                    map.on("zoomend", onZoomEnd);
                    onZoomEnd();

                    function onZoomEnd() {
                        var z = map.getZoom();

                        if (z < 16) {
                            squares1_layer.setStyle({fillOpacity: 0.5})
                        } else if (z >= 16 && z < 17) {
                            squares1_layer.setStyle({fillOpacity: 0.3})
                        } else {
                            squares1_layer.setStyle({fillOpacity: 0})
                        }

                        if (z < 10 ) {
                            squares9_layer.addTo(map);
                            squares1_layer.removeFrom(map);
                        } else if (z >= 10 &&  z < 12) {
                            squares9_layer.addTo(map);
                            squares1_layer.addTo(map);
                        } else {
                            squares1_layer.addTo(map);
                            squares9_layer.removeFrom(map);
                        }
                    }
                });


        });
    }

    return my;
}

