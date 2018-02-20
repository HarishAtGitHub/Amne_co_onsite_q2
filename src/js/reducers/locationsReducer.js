import {SET_LOCATIONS} from "../actions/types"

export default ((state={}, action={}) => {
    switch(action.type) {
        case SET_LOCATIONS:
            console.log(action.locations)
            return action.locations

        default:
            return []
    }
})