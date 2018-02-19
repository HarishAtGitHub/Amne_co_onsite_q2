import React from "react";

import RealEstateAgencyLocatorForm from "./RealEstateAgencyLocatorForm";

class RealEstateAgencyLocatorPage extends React.Component {
    render() {
        return (
            <div className="container agencylocator-container">
                <h1 className="page-header">Amne.co</h1>
                <div className="row top-buffer">
                    <div className="col-md-5">
                        <div className="panel panel-default form-panel">
                            <div className="panel-body">
                                <RealEstateAgencyLocatorForm/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        SHOW  RESULTS HERE
                    </div>
                </div>
            </div>
        )
    }
}

export default RealEstateAgencyLocatorPage;