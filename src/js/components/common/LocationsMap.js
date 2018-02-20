import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
/*
 Reusable component to draw locations  on the map.
 It is responsive with the value of the locations
 */
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
                zoom: this.props.zoom
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
                let viewOnMapsUrl =`http://www.google.com/search?q=${encodeURIComponent(place.name+ ' '+ place.vicinity)}`
                let viewOnMapsTag =  `<a target='_blank' href=${viewOnMapsUrl}>view on google maps</a>`

                let marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    icon: pinImage
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent('<b>' + place.name + '</b>' + '<br/><br/>' +
                        place.vicinity + '<br/><br/>' +
                        viewOnMapsTag );
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
    id: React.PropTypes.string.isRequired,
    zoom: React.PropTypes.number.isRequired
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