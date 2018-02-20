import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class LocationsMap extends React.Component {
    componentDidUpdate() {
        this.populateMap();
    }

    componentDidMount() {
        this.populateMap();
    }

    populateMap() {
        if(this.props.locations.length > 0) {
            let center = new google.maps.LatLng(
                this.props.locations[0].geometry.location.lat(),
                this.props.locations[0].geometry.location.lng());

            let map = new google.maps.Map(this.refs.locationsmap, {
                center: center,
                zoom: 11
            });

            let infowindow = new google.maps.InfoWindow();
            for(let place of this.props.locations) {
                let marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
            }
        }
    }

    render() {
        return (
            <div ref="locationsmap" id={this.props.id}>
            </div>
        )
    }
}

LocationsMap.propTypes = {
    locations : React.PropTypes.array.isRequired,
    id: React.PropTypes.string.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationsMap);