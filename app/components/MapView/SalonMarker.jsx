/**
 *
 * SalonMarker
 *
 */

import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';
import { useTheme } from '@material-ui/styles';

const iconMarker = ({ isActive, colors, defaultColor }) => {
  const color = isActive ? colors.normal : colors.active;
  return {
    path:
      'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillColor: color || defaultColor,
    fillOpacity: 1,
    anchor: { x: 14, y: 14 },
    strokeWeight: 1.5,
    scale: 1.5,
    strokeColor: '#fff',
  };
};

function SalonMarker(props) {
  const { index, position, isActive, colors, onClick } = props;
  const location = { lat: position.latitude, lng: position.longitude };
  const theme = useTheme();
  const defaultColor = theme.palette.primary.main;
  const icon = useMemo(() => iconMarker({ isActive, colors, defaultColor }), [
    isActive,
  ]);

  const handleOnClick = useCallback(() => {
    onClick(index);
  }, []);

  return <Marker position={location} icon={icon} onClick={handleOnClick} />;
}

SalonMarker.propTypes = {
  index: PropTypes.number,
  position: PropTypes.object,
  colors: PropTypes.object,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(SalonMarker);
