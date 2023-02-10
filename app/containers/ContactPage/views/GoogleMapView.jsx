import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import LocationMarker from 'components/MapView/LocationMarker';
import get from 'lodash/get';
import { compose, withProps } from 'recompose';

const containerMap = <div style={{ height: '100%' }} />;
const options = {
  fullscreenControl: false,
  mapTypeControl: false,
};

const googleMapKey = process.env.GOOGLE_MAP_API_KEY;

function GoogleMapView(props) {
  const { location } = props;
  return (
    <GoogleMap
      defaultZoom={get(location, 'zoom', 10)}
      defaultCenter={location}
      center={location}
      options={options}
    >
      <LocationMarker position={location} />
    </GoogleMap>
  );
}

GoogleMapView.propTypes = {
  location: PropTypes.object,
};

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: containerMap,
    containerElement: containerMap,
    mapElement: containerMap,
  }),
  withScriptjs,
  withGoogleMap,
)(GoogleMapView);
