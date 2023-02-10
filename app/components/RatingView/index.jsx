import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import times from 'lodash/times';
import {
  StarIcon,
  StarBorderIcon,
  HaftStarBorderIcon,
} from 'assets/svgIcon/StarIcon';

const ratePercent = value => {
  const d = Math.floor(value / 5.0);
  const f = value / 5.0 - d;
  return d + (f >= 0.5 ? 0.5 : 0);
};

const useStyles = makeStyles(() => ({
  star: {
    width: 20,
    height: 20,
  },
  starSmall: {
    width: 10,
    height: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // transform: 'translate(0%, 50%)',
  },
  frontContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflowX: 'hidden',
    transform: 'translate(0%, -50%)',
    width: props => `${ratePercent(props.value) * 100}%`,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
    marginRight: 1,
  },
}));

function RatingView(props) {
  const { size, value, className } = props;
  const classes = useStyles({ value });
  const v = Math.floor(value);
  const r = value - v;
  return (
    <div className={className}>
      <div className={classes.container}>
        {times(5, index => (
          <div className={classes.item} key={index}>
            {index < v && <StarIcon size={size} />}
            {index === v && r > 0 && <HaftStarBorderIcon size={size} />}
            {index === value && <StarBorderIcon size={size} />}
            {index > v && <StarBorderIcon size={size} />}
          </div>
        ))}
      </div>
    </div>
  );
}

RatingView.propTypes = {
  size: PropTypes.string,
  value: PropTypes.number,
  className: PropTypes.string,
};

RatingView.defaultProps = {
  size: 'medium',
  value: 0,
  className: '',
};

export default RatingView;
