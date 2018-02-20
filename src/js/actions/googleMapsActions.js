import {geocodeByAddress, getLatLng} from "react-places-autocomplete";

/*
 Gets list of addresses and then find's its neighors of a particular place type
 in a particular radius
 */
export function getNearestNeighbors(address, placetype, radius, mapref) {
    return (dispatch) => {
        return getAddressListAsLatLngs(address)
            .then((latLngs) => {
                let results = []
                for(let j =0; j< latLngs.length; j++) {
                    let neighbors= nearbySearch(latLngs[j], placetype, radius, mapref);
                    results.push(neighbors);
                }
                return results;
            })
    };
}

/*
 Function to convert  list of addresses to object of latitudes and longitudes
 */
export function getAddressListAsLatLngs(address) {
    let latLngPromises = []
    for(let i = 0; i < address.length; i++) {
        latLngPromises.push(getLatLngFromAddress(address[i]))
    }
    return Promise.all(latLngPromises);
}

/*
 Function that takes and address and gives it's latitude and longitude
 */
export function getLatLngFromAddress(address) {
    return geocodeByAddress(address)
        .then((geocode) => {
            return getLatLng(geocode[0])
        })
}

/*
 Internal method that uses google api to get nearby locations of a particular
 place type and in a given radius
 */
export function nearbySearch(loc, placetype, radius, mapdiv) {
    let center = new google.maps.LatLng(loc.lat, loc.lng);

    let map = new google.maps.Map(mapdiv, {
        center: center,
        zoom: 15
    });

    let request = {
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

export function computeDistanceBetweenLocations(loc1, loc2) {
    return google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(loc1.lat, loc1.lng),
        new google.maps.LatLng(loc2.lat, loc2.lng)
    );
}

export function setSumDistanceFromPts(locations, points) {
    for(let j = 0; j < locations.length; j++) {
        let currentLocation = {
            lat:locations[j].geometry.location.lat(),
            lng:locations[j].geometry.location.lng()
        };
        let sumDistance = 0;
        for(let i = 0; i < points.length; i++) {
            let currentPoint = points[i];
            let temp = computeDistanceBetweenLocations(currentLocation, currentPoint);
            sumDistance += temp;
        }
        locations[j].sumDistance = sumDistance;
    }
}