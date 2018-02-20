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
            let colors = ["DC143C", "0000FF", "FE7569", "006400", "FF8C00"];

            let infowindow = new google.maps.InfoWindow();
            for(let place of this.props.locations) {
                let pinColor;
                if(colors.length >= place.cluster) {
                    pinColor = colors[place.cluster % colors.length]
                } else {
                    pinColor = colors[place.cluster]
                }

                let pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                    new google.maps.Size(21, 34),
                    new google.maps.Point(0,0),
                    new google.maps.Point(10, 34));
                let marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    icon: pinImage
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