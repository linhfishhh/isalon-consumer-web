import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: theme.spacing(7),
    position: 'fixed',
    top: props => props.offsetTop,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  area: {
    height: theme.spacing(7),
    borderTopLeftRadius: theme.spacing(7),
    borderTopRightRadius: theme.spacing(7),
  },
  primary: {
    boxShadow: `0 -10px 0 10px ${theme.palette.primary.main}`,
  },
  grey: {
    boxShadow: '0 -10px 0 10px #cccccc',
  },
}));

function TopCornerRadius(props) {
  const { color } = props;

  const classes = useStyles(props);

  return (
    <div className={classes.wrapper}>
      <div className={classes.overflowHidden}>
        <div className={`${classes.area} ${classes[color]}`} />
      </div>
    </div>
  );
}

TopCornerRadius.propTypes = {
  color: PropTypes.oneOf(['primary', 'grey']),
  // eslint-disable-next-line react/no-unused-prop-types
  offsetTop: PropTypes.number,
};

export default memo(TopCornerRadius);
