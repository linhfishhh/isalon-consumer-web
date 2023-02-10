import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import { isMobileOnly } from 'utils/platform';
import SalonMarker from './SalonMarker';
import LocationMarker from './LocationMarker';
import ListSalon from './ListSalon';

const googleMapKey = process.env.GOOGLE_MAP_API_KEY;

const containerMap = <div style={{ height: '100%' }} />;
const options = {
  fullscreenControl: false,
  mapTypeControl: false,
  gestureHandling: 'greedy',
  disableDefaultUI: isMobileOnly,
};

function MapView(props) {
  const { location, salons, colors, active } = props;
  const googleMap = useRef();

  const [currentActive, setCurrentActive] = useState(active);
  const [centerMap, setCenterMap] = useState(location);

  useEffect(() => {
    handleFitBounds(salons);
  }, []);

  useEffect(() => {
    if (active > 0) {
      handleChangeActive(active);
    } else {
      setCurrentActive(active);
    }
  }, [active]);

  const handleChangeActive = useCallback(
    (index, center = false) => {
      setCurrentActive(index);
      const salonActive = salons[index];
      if (center) {
        setCenterMap({
          lat: salonActive.location.latitude,
          lng: salonActive.location.longitude,
        });
      }
      // const getProvince = salon => salon.address.split(',').pop();
      // const provinceSalonActive = getProvince(salonActive);
      // const salonsInProvince = salons.filter(
      //   item => getProvince(item) === provinceSalonActive,
      // );
      // handleFitBounds(salonsInProvince);
    },
    [salons],
  );

  const handleFitBounds = useCallback(
    salonList => {
      const map = googleMap.current;
      if (map) {
        const bounds = new google.maps.LatLngBounds();
        const positions = compact(salonList.map(item => item.location));
        if (!isEmpty(positions)) {
          forEach(positions, position => {
            bounds.extend({ lat: position.latitude, lng: position.longitude });
          });
          map.fitBounds(bounds);
        }
      }
    },
    [googleMap.current],
  );

  return (
    <>
      <GoogleMap
        ref={googleMap}
        defaultZoom={10}
        defaultCenter={location}
        center={centerMap}
        options={options}
      >
        <LocationMarker position={location} />
        {salons.map((item, index) => (
          <SalonMarker
            key={item.id}
            index={index}
            position={item.location}
            colors={colors}
            isActive={currentActive === index}
            onClick={handleChangeActive}
          />
        ))}
      </GoogleMap>
      <ListSalon
        data={salons}
        active={currentActive}
        onChange={handleChangeActive}
      />
    </>
  );
}

MapView.defaultProps = {
  salons: [],
  colors: {},
};

MapView.propTypes = {
  location: PropTypes.object,
  salons: PropTypes.array,
  active: PropTypes.number,
  colors: PropTypes.object,
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
)(MapView);
