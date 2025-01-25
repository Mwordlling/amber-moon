let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

map2 = new maplibregl.Map({
    container: 'map2',
    zoom: 8,
    minZoom: 8,
    maxZoom: 18.5,
    maxBounds: [
        [25.433, 50.965],
        [29.342, 51.956]
    ],
    // Тестова мапа, треба змінити на свій MapTiler
    style: 'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    renderWorldCopies: false,
    maxBoundsViscosity: 0.9
});

// Зум
map2.scrollZoom.disable();

const navigation = new maplibregl.NavigationControl({
    showCompass: false,
    visualizePitch: false
});
map2.addControl(navigation, 'top-right');

// Можна змінювати зум кнопками + та -
document.addEventListener('keydown', (e) => {
    if (e.key === '+') {
        map2.zoomIn({ duration: 300 });
    } else if (e.key === '-') {
        map2.zoomOut({ duration: 300 });
    }
});
//

map2.on('load', () => {
    for (let i = 1; i <= 28; i++) {
        const sourceId = `pmtiles_raster_source_${i}`;
        const layerId = `pmtiles_raster_layer_${i}`;
        const filePath = `pmtiles://data/tiles/${i}.pmtiles`;

        map2.addSource(sourceId, {
            type: 'raster',
            url: filePath,
            tileSize: 256
        });

        map2.addLayer({
            id: layerId,
            type: 'raster',
            source: sourceId,
            paint: {
                'raster-opacity': 0.8
            }
        });
    }

    fetch(`/data/data9.geojson`)
    .then(response => response.json())
    .then(data9 => {

        map2.addSource('file9', {
            type: 'geojson',
            data: data9
        });
        map2.addLayer({
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
    });

    fetch(`/data/data1.geojson`)
    .then(response => response.json())
    .then(data1 => {

        map2.addSource('file1', {
            type: 'geojson',
            data: data1
        });
        map2.addLayer({
            id: 'polygon1-outline',
            type: 'line',
            source: 'file1',
            paint: {
                'line-color': '#98c336',
                'line-width': 1
            }
        });
        map2.addLayer({
            id: 'polygon1-fill',
            type: 'fill',
            source: 'file1',
            paint: {
                'fill-color': '#000000',
                'fill-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    8, 0.5,
                    14, 0
                ]
            }
        });
    });

});
