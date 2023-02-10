/**
 *
 * LocationMarker
 *
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

const iconMarker = () => ({
  path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
  fillColor: '#4285f4',
  fillOpacity: 1,
  anchor: { x: 0, y: 0 },
  strokeWeight: 1.4,
  strokeOpacity: 1,
  strokeColor: '#fff',
  scale: 0.6,
});

const iconMarker2 = () => ({
  path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
  fillColor: '#4285f4',
  fillOpacity: 0.3,
  anchor: { x: 6, y: 6 },
  strokeWeight: 0,
  scale: 1.2,
});

function LocationMarker(props) {
  const { position } = props;
  const icon = useMemo(() => iconMarker(), []);
  const icon2 = useMemo(() => iconMarker2(), []);

  return (
    <>
      <Marker position={position} icon={icon2} />
      <Marker position={position} icon={icon} />
    </>
  );
}

LocationMarker.propTypes = {
  position: PropTypes.object,
};

export default memo(LocationMarker);
