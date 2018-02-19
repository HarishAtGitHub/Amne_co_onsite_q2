import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore,applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import Layout from "./components/common/Layout";
import rootReducer from "./reducers/rootReducer";

let app = document.getElementById("app");
let store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk),
        window.devToolsExtension? window.devToolsExtension(): f=>f)

)

ReactDOM.render(
    <Provider store={store}>
        <Layout/>
    </Provider>,
    app
);