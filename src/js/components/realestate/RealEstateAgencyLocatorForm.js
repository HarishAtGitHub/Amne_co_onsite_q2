import React from "react";
import PlacesAutocomplete from 'react-places-autocomplete';

import {
    getNearestNeighbors,
    getAddressListAsLatLngs,
    computeDistanceBetweenLocations,
    setSumDistanceFromPts} from "../../actions/googleMapsActions"

class RealEstateAgencyLocatorForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { address: ['', ''] }
    }

    onChangeloc1(address) {
        let deepcopyaddress = [...this.state.address];
        deepcopyaddress[0] = address;
        this.setState({address: deepcopyaddress})
    }

    onChangeloc2(address) {
        let deepcopyaddress = [...this.state.address];
        deepcopyaddress[1] = address;
        this.setState({address: deepcopyaddress})
    }

    onSubmit(event) {
        event.preventDefault();
        //alert(this.state.address[0] + " && " + this.state.address[1]);
        const placetype = 'real_estate_agency';
        const radius = '17000' // 17 km ~ 10 miles
        this.props.getNearestNeighbors([...this.state.address], placetype, radius, this.refs.map)
            .then((results) => {
                getAddressListAsLatLngs(this.state.address)
                    .then((latLngList) => {
                        let points = latLngList;

                        // the googe api's only way to get places is through call back
                        // but we cannot return value from call back
                        // even the way to use API is blocked due to cors by google
                        // and it does not  entertain json api's
                        // so only way is to wait
                        // we will make a decision to get only what is available in 4 seconds
                        // this is not a harm as it will not block.. we will just wait for results
                        setTimeout(this.setSumDistancesResults, 4000, this, results, points);
                    })
            })
            .catch((error) => {
                alert(error);
            })
    }

    setSumDistancesResults(context, locations, points) {
        // computer distance between each near neighbor to location1
        let locationsNearByAddress1 = locations[0];
        setSumDistanceFromPts(locationsNearByAddress1, points);
        let locationsNearByAddress2 = locations[1];
        setSumDistanceFromPts(locationsNearByAddress2, points);
        let results = [...locations[0], ...locations[1]]
        console.log(results)
    }

    render() {
        const inputPropsloc1 = {
            value: this.state.address[0],
            onChange: this.onChangeloc1.bind(this),
            placeholder: 'Location 1...'
        };

        const inputPropsloc2 = {
            value: this.state.address[1],
            onChange: this.onChangeloc2.bind(this),
            placeholder: 'Location 2...'
        };

        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <h4 className="form-header"> Real Estate  Agency Locator </h4>
                <div className="form-group">
                    <PlacesAutocomplete className="form-control" inputProps={inputPropsloc1}/>
                </div>
                <div className="form-group">
                    <PlacesAutocomplete className="form-control" inputProps={inputPropsloc2}/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-lg btn-block btn-success"/>
                </div>
                <div id="mapnotused" ref="map"></div>
            </form>
        )
    }
}

RealEstateAgencyLocatorForm.propTypes = {
    getNearestNeighbors: React.PropTypes.func.isRequired
}

export default RealEstateAgencyLocatorForm;