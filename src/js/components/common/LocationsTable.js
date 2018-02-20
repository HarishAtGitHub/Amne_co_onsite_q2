import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class LocationsTable extends React.Component {
    render() {
        const {locations} = this.props;
        let tableBody = locations.map((location, index) => {
            return (
                <tr key={location.place_id}>
                    <th scope="row">{index + 1}</th>
                    <td>{location.name}</td>
                    <td>{location.vicinity}</td>
                    <td>{location.sumDistance}</td>
                </tr>
            )
        })
        return (
            <div>
                <table className="table table-responsive tablebodyscroll">
                    <thead>
                    <tr>
                        <th> # </th>
                        <th>Place Name</th>
                        <th>Address</th>
                        <th>Sum Distance (meters)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableBody}
                    </tbody>
                </table>
            </div>
        )
    }
}

LocationsTable.propTypes = {
    locations : React.PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        locations: state.locations
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsTable);