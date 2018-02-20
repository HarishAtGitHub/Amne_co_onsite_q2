import {geocodeByAddress, getLatLng} from "react-places-autocomplete";

export function getNearestNeighbors(address, placetype, radius, mapref) {
    return (dispatch) => {
        console.log(address);
        return getAddressListAsLatLngs(address)
            .then((latLngs) => {
                let results = []
                for(let j =0; j< latLngs.length; j++) {
                    console.log(j);
                    console.log(latLngs[j])
                    let neighbors= nearbySearch(latLngs[j], placetype, radius, mapref);
                    console.log(neighbors);
                    results.push(neighbors);
                }
                return results;
            })
    };
}

export function getAddressListAsLatLngs(address) {
    console.log(address);
    let latLngPromises = []
    for(let i = 0; i < address.length; i++) {
        latLngPromises.push(getLatLngFromAddress(address[i]))
    }
    return Promise.all(latLngPromises);
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
    //console.log(loc1);
    //console.log(loc2);
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
        console.log("********************")
        for(let i = 0; i < points.length; i++) {
            let currentPoint = points[i];
            let temp = computeDistanceBetweenLocations(currentLocation, currentPoint);
            console.log(temp);
            sumDistance += temp;
        }
        console.log("sum " + sumDistance);
        locations[j].sumDistance = sumDistance;
        console.log(locations[j].sumDistance);
    }
}