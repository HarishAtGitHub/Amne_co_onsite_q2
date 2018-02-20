import {SET_LOCATIONS} from "./types"

export function setLocations(locations) {
    return {
        type: SET_LOCATIONS,
        locations: locations
    }
}