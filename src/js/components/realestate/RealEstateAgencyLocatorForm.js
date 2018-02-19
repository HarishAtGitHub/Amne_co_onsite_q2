import React from "react";

class RealEstateAgencyLocatorForm extends React.Component {
    render() {
        return (
            <form>
                <h4 className="form-header"> Real Estate  Agency Locator </h4>
                <div className="form-group">
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-lg btn-block btn-success"/>
                </div>
            </form>
        )
    }
}

export default RealEstateAgencyLocatorForm;