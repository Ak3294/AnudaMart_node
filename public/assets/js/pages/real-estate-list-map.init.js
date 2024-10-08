var previewTemplate,
    dropzone,
    cities = L.layerGroup(),
    mbAttr =
        (L.marker([39.61, -105.02])
            .bindPopup("This is Littleton, CO.")
            .addTo(cities),
        L.marker([39.63, -105.09])
            .bindPopup("This is Littleton, CO.")
            .addTo(cities),
        L.marker([39.74, -104.99])
            .bindPopup("This is Denver, CO.")
            .addTo(cities),
        L.marker([39.77, -105.01])
            .bindPopup("This is Denver, CO.")
            .addTo(cities),
        L.marker([39.9, -105.03])
            .bindPopup("This is Denver, CO.")
            .addTo(cities),
        L.marker([39.96, -105.04])
            .bindPopup("This is Denver, CO.")
            .addTo(cities),
        L.marker([39.73, -104.8])
            .bindPopup("This is Aurora, CO.")
            .addTo(cities),
        L.marker([39.7, -104.9]).bindPopup("This is Aurora, CO.").addTo(cities),
        L.marker([39.77, -105.23])
            .bindPopup("This is Golden, CO.")
            .addTo(cities),
        L.marker([39.8, -105.01])
            .bindPopup("This is Golden, CO.")
            .addTo(cities),
        L.marker([39.95, -105.09])
            .bindPopup("This is Golden, CO.")
            .addTo(cities),
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'),
    mbUrl =
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w",
    grayscale = L.tileLayer(mbUrl, {
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: -1,
        attribution: mbAttr,
    }),
    streets = L.tileLayer(mbUrl, {
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        attribution: mbAttr,
    }),
    layergroupcontrolmap = L.map("leaflet-map-group-control", {
        center: [39.73, -104.99],
        zoom: 10,
        layers: [streets, cities],
    }),
    baseLayers = { Grayscale: grayscale, Streets: streets },
    overlays = { Cities: cities },
    dropzonePreviewNode =
        (L.control.layers(baseLayers, overlays).addTo(layergroupcontrolmap),
        document.querySelector("#property-preview-list"));
(dropzonePreviewNode.id = ""),
    dropzonePreviewNode &&
        ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
        dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
        (dropzone = new Dropzone(".property-dropzone", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate,
            previewsContainer: "#property-preview",
        })));
