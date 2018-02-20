import React from "react";
import {combineReducers} from "redux";

import locationsReducer from "./locationsReducer";

export default combineReducers({
    locations: locationsReducer
});