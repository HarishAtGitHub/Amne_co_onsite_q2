import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore,applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {Router} from "react-router";

import Layout from "./components/common/Layout";
import rootReducer from "./reducers/rootReducer";
import routes from "./routes";

let app = document.getElementById("app");
let store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk),
        window.devToolsExtension? window.devToolsExtension(): f=>f)

)

ReactDOM.render(
    <Provider store={store}>
        <Router routes={routes}/>
    </Provider>,
    app
);