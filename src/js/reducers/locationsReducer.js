import {SET_LOCATIONS} from "../actions/types"

export default ((state={}, action={}) => {
    switch(action.type) {
        case SET_LOCATIONS:
            return action.locations

        default:
            return []
    }
})