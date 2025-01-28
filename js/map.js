function map() {
    let hullString, hull, image, img_center;
    let imageOffsetPc = { x: 0, y: 0 };
    let backgroundSize_pc, map;
    let tooltipText = "";
    const tileOriginalSize = 1000, tileOriginalZoom = 18;
    let format = d3.format(".4f")

    function my(selection) {
        selection.each(function() {
            const container = d3.select(this);

            my.showMap = function() {
                const rect = container.node().getBoundingClientRect();
                const imgsize = rect.width * backgroundSize_pc;
                const zoomLevel = tileOriginalZoom + Math.log2(imgsize / tileOriginalSize);              
                const reversed_img_center = [img_center[1], img_center[0]];

                map = new maplibregl.Map({
                    container: 'map3',
                    zoom: zoomLevel,
                    center: reversed_img_center,
                    minZoom: 8,
                    maxZoom: 18.5,
                    maxBounds: [
                        [25.433, 50.965],
                        [29.342, 51.956]
                    ],
                    style: './data/style.json',
                    renderWorldCopies: false,
                    maxBoundsViscosity: 0.9
                });

                //
                const mapDiv = document.querySelector('#map3');
                const mapBack = document.querySelector('.mapBackground');
                if (!map) {
                    mapDiv.classList.add('hidden2');
                    mapBack.classList.add('hidden2');
                } else {
                    mapDiv.classList.remove('hidden2');
                    mapBack.classList.remove('hidden2');
                }

                document.addEventListener('keydown', function (event) {
                    if (event.key === 'Escape') {
                        if (mapDiv) {
                            mapDiv.classList.add('hidden2');
                            mapBack.classList.add('hidden2');
                        }
                    }
                });

                document.querySelector('.close').addEventListener('click', () => {
                    if (mapDiv) {
                        mapDiv.classList.add('hidden2');
                        mapBack.classList.add('hidden2');
                    }
                });
                //

                const half_img = coord_diff(
                    map.unproject([imgsize / 2, imgsize / 2]),
                    map.unproject([0, 0])
                );
                const imageOffset = {
                    x: imageOffsetPc.x * (rect.width - imgsize),
                    y: imageOffsetPc.y * (rect.height - imgsize),
                };

                const newx = img_center[1] + ($(window).width() / 2 - (rect.left + imgsize / 2 + imageOffset.x)) / imgsize * (half_img.lng * 2);
                const newy = img_center[0] + ($(window).height() / 2 - (rect.top + imgsize / 2 + imageOffset.y)) / imgsize * (half_img.lat * 2);

                map.jumpTo({ center: [newx, newy] });

                const one_px_lng = half_img.lng / (imgsize / 2);
                const one_px_lat = half_img.lat / (imgsize / 2);
                const fig_corner_c = {
                    lng: (imageOffset.x + imgsize / 2) * one_px_lng,
                    lat: (imageOffset.y + imgsize / 2) * one_px_lat,
                };

                map.on('load', () => {
                    for (let i = 1; i <= 44; i++) {
                        const sourceId = `pmtiles_raster_source_${i}`;
                        const layerId = `pmtiles_raster_layer_${i}`;
                        const filePath = `pmtiles://./data/tiles/${i}.pmtiles`;
                
                        map.addSource(sourceId, {
                            type: 'raster',
                            url: filePath,
                            tileSize: 256
                        });
                
                        map.addLayer({
                            id: layerId,
                            type: 'raster',
                            source: sourceId,
                            paint: {
                                'raster-opacity': 0.8
                            }
                        });
                    }
                
                    async function loadGeojsonData() {
                        const response9 = await fetch(`/data/data9.geojson`);
                        const data9 = await response9.json();

                        map.addSource('file9', {
                            type: 'geojson',
                            data: data9
                        });
                        map.addLayer({
                            id: 'polygon9-fill',
                            type: 'fill',
                            source: 'file9',
                            paint: {
                                'fill-color': '#c1e600',
                                'fill-opacity': [
                                    'interpolate',
                                    ['linear'],
                                    ['zoom'],
                                    9.5, 0.8,
                                    10, 0
                                ]
                            }
                        });

                        const response1 = await fetch(`/data/data1.geojson`);
                        const data1 = await response1.json();

                        map.addSource('file1', {
                            type: 'geojson',
                            data: data1
                        });
                        map.addLayer({
                            id: 'polygon1-fill',
                            type: 'fill',
                            source: 'file1',
                            paint: {
                                'fill-color': '#000000',
                                'fill-opacity': [
                                    'interpolate',
                                    ['linear'],
                                    ['zoom'],
                                    14, 0.5,
                                    15, 0
                                ]
                            }
                        });
                        map.addLayer({
                            id: 'polygon1-outline',
                            type: 'line',
                            source: 'file1',
                            paint: {
                                'line-color': '#98c336',
                                'line-width': 1,
                                'line-opacity': [
                                    'interpolate',
                                    ['linear'],
                                    ['zoom'],
                                    14, 1,
                                    15, 0
                                ]
                            }
                        });
                    }

                    loadGeojsonData();                    

                    const blocksize = container.select('.elementary-block').node().getBoundingClientRect().width;
                    const geojson_data = geojsonHull(
                        img_center[1] - fig_corner_c.lng,
                        img_center[0] - fig_corner_c.lat,
                        blocksize * one_px_lng,
                        blocksize * one_px_lat
                    );

                    map.addSource('hullSource', {
                        type: 'geojson',
                        data: geojson_data
                    });
                    map.addLayer({
                        id: 'polygonne',
                        type: 'line',
                        source: 'hullSource',
                        paint: {
                            'line-color': 'yellow',
                            'line-width': 1
                        }
                    });

                    const bounds = turf.bbox(geojson_data);
                    const tooltip_coordinates = [bounds[0], bounds[1]];

                    const popup = new maplibregl.Popup({
                        offset: [0, 10],
                        anchor: 'bottom',
                        closeButton: false,
                        closeOnClick: false
                    })
                    .setLngLat(tooltip_coordinates)
                    .setHTML(`<div class='tooltip-wrapper'><span>${tooltipText}<br/>${format(img_center[0])}, ${format(img_center[1])}</span></div>`)
                    .addTo(map);

                    let popupVisible = true;

                    function updatePopupVisibility(zoomLevel) {
                        if (zoomLevel <= 12.5 && popupVisible) {
                            popup.remove();
                            popupVisible = false;
                        } else if (zoomLevel > 12.5 && !popupVisible) {
                            popup.addTo(map);
                            popupVisible = true;
                        }
                    }

                    map.on('zoom', () => {
                        const zoomLevel = map.getZoom();
                        updatePopupVisibility(zoomLevel);
                    });
                });
            };
        });
    }

    my.image = function (value) {
        if (!arguments.length) return image;
        setImage(value);
        return my;
    };

    function setImage(value) {
        image = value;
        img_center = image.replace(/^.*[\\\/]/, '').split("_").slice(0, 2).map(toNumber);
        return my;
    }

    my.imageOffsetPc = function (value) {
        if (!arguments.length) return imageOffsetPc;
        imageOffsetPc = value;
        return my;
    };

    my.backgroundSize_pc = function (value) {
        if (!arguments.length) return backgroundSize_pc;
        backgroundSize_pc = value;
        return my;
    };

    my.tooltipText = function (value) {
        if (!arguments.length) return tooltipText;
        tooltipText = value;
        return my;
    };

    my.hullString = function (value) {
        if (!arguments.length) return hullString;
        setHullString(value);
        return my;
    };

    function setHullString(value) {
        hullString = value;
        hull = hullString.split(/\s+/).map(pair => {
            const [x, y] = pair.split(",");
            return { x: +x, y: +y };
        });
    }

    function coord_diff(c1, c2) {
        return { lat: c1.lat - c2.lat, lng: c1.lng - c2.lng };
    }

    function geojsonHull(left, top, block_w, block_h) {
        const points = hull.map(p => [left + block_w * p.x, top + block_h * p.y]);
        return {
            type: "Feature",
            geometry: { type: "MultiPolygon", coordinates: [[points]] },
        };
    }

    function toNumber(v) {
        return +v;
    }

    return my;
}