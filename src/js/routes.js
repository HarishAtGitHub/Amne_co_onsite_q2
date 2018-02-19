import React from "react";
import {Route} from "react-router";

import Layout from "./components/common/Layout";
import RealEstateAgencyLocatorPage from "./components/realestate/RealEstateAgencyLocatorPage";

export default (
    <Route path="/" components={Layout}>
        <Route path="agencylocator" components={RealEstateAgencyLocatorPage}/>
    </Route>
)