import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";

import Layout from "./components/common/Layout";
import rootReducer from "./reducers/rootReducer";

let app = document.getElementById("app");
let store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <Layout/>
    </Provider>,
    app
);