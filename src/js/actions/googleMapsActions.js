import {geocodeByAddress, getLatLng} from "react-places-autocomplete";

export function getNearestNeighbors(address, placetype, radius, mapref) {
    return (dispatch) => {
        console.log(address);
        let latLngPromises = []
        for(let i = 0; i < address.length; i++) {
            latLngPromises.push(getLatLngFromAddress(address[i]))
        }
        return Promise.all(latLngPromises)
            .then((latLngs) => {
                let results = []
                for(let j =0; j< latLngs.length; j++) {
                    console.log(j);
                    console.log(latLngs[j])
                    let neighbors= nearbySearch(latLngs[j], placetype, radius, mapref);
                    results.push(neighbors);
                }
                return results;
            })
    };
}

export function getLatLngFromAddress(address) {
    return geocodeByAddress(address)
        .then((geocode) => {
            return getLatLng(geocode[0])
        })
}

export function nearbySearch(loc, placetype, radius, mapdiv) {
    console.log(loc.lat);
    console.log(loc.lng);
    console.log(placetype);
    let center = new google.maps.LatLng(loc.lat, loc.lng);

    let map = new google.maps.Map(mapdiv, {
        center: center,
        zoom: 15
    });

    var request = {
        location: center,
        radius: radius,
        types: [placetype]
    };
    let service = new google.maps.places.PlacesService(map);
    let neighbors = []
    service.nearbySearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                let place = results[i];
                neighbors.push(place);
            }
        }
    });
    return neighbors;
}
