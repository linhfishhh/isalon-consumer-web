import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitBox: {
    backgroundColor: '#000',
    borderRadius: 3,
    width: isMobileOnly ? 14 : 15,
    height: isMobileOnly ? 20 : 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: isMobileOnly ? 0 : 4,
  },
  number: {
    color: '#fff',
    fontSize: isMobileOnly ? 12 : 16,
    fontWeight: 'bold',
  },
  second: {
    marginLeft: 2,
  },
}));

function Unit(props) {
  const { value = 0 } = props;
  const classes = useStyles();
  const first = value >= 10 ? Math.floor(value / 10) : 0;
  const second = value - first * 10;
  return (
    <div className={classes.container}>
      <div className={classes.unitBox}>
        <span className={classes.number}>{first}</span>
      </div>
      <div
        className={`${classes.unitBox} ${isMobileOnly ? classes.second : ''}`}
      >
        <span className={classes.number}>{second}</span>
      </div>
    </div>
  );
}

Unit.propTypes = {
  value: PropTypes.number,
};

export default memo(Unit);
