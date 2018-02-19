import React from "react";
import PlacesAutocomplete from 'react-places-autocomplete';

class RealEstateAgencyLocatorForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { address: 'San Francisco, CA' }
    }

    onChange(address) {
        this.setState({ address });
    }

    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange.bind(this)
        };

        return (
            <form>
                <h4 className="form-header"> Real Estate  Agency Locator </h4>
                <div className="form-group">
                    <PlacesAutocomplete className="form-control" inputProps={inputProps}/>
                </div>
                <div className="form-group">
                    {/*<PlacesAutocomplete className="form-control"/>*/}
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-lg btn-block btn-success"/>
                </div>
            </form>
        )
    }
}

export default RealEstateAgencyLocatorForm;