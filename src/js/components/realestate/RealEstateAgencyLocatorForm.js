import React from "react";
import PlacesAutocomplete from 'react-places-autocomplete';

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
        alert(this.state.address[0] + " && " + this.state.address[1]);
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
            placeholder: 'Location 1...'
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
            </form>
        )
    }
}

export default RealEstateAgencyLocatorForm;