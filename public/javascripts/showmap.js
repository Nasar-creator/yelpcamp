mapboxgl.accessToken = maptoken

const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: campground.geometry.coordinates,
    zoom: 8
    });
    //Add constrol
map.addControl(new mapboxgl.NavigationControl());

// 'mapbox://styles/mapbox/light-v10'
const marker2 = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )
    )
    .addTo(map);