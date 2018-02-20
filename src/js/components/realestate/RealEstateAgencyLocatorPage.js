import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import RealEstateAgencyLocatorForm from "./RealEstateAgencyLocatorForm";
import {getNearestNeighbors} from "../../actions/googleMapsActions";
import {setLocations} from "../../actions/locationsActions";

class RealEstateAgencyLocatorPage extends React.Component {
    render() {
        const {getNearestNeighbors, setLocations} = this.props;
        return (
            <div className="container agencylocator-container">
                <h1 className="page-header">Amne.co</h1>
                <div className="row top-buffer">
                    <div className="col-md-5">
                        <div className="panel panel-default form-panel">
                            <div className="panel-body">
                                <RealEstateAgencyLocatorForm
                                    getNearestNeighbors={getNearestNeighbors}
                                    setLocations={setLocations}/>
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

RealEstateAgencyLocatorPage.propTypes = {
    getNearestNeighbors: React.PropTypes.func.isRequired,
    setLocations: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            getNearestNeighbors: getNearestNeighbors,
            setLocations: setLocations
        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(RealEstateAgencyLocatorPage);