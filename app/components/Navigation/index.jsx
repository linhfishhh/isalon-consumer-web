/**
 *
 * Navigation
 *
 */

import React, { memo, useMemo } from 'react';
import { isIOS } from 'react-device-detect';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AreaSafe from 'components/AreaSafe';

import DefaultButton from './DefaultButton';

const useStyles = makeStyles(theme => ({
  wrapper: {},
  title: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    paddingLeft: 90,
    paddingRight: 90,
    pointerEvents: 'none',
    transform: 'translateZ(0px)',
    display: 'flex',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'left',
  },
  center: {
    justifyContent: 'center',
  },
  right: {
    justifyContent: 'right',
  },
  grow: {
    flexGrow: 1,
  },
  border: {
    borderBottom: `solid 1px ${theme.palette.grey[300]}`,
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  light: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.grey[800],
  },
  grey: {
    backgroundColor: theme.palette.grey[500],
    color: '#000000',
  },
  dark: {
    backgroundColor: '#000000',
    color: '#ffffff',
  },
}));

function Navigation(props) {
  const {
    className,
    title,
    leftButtons,
    rightButtons,
    custom,
    style,
    color,
    border,
    titleAlign,
    backButtonProps,
  } = props;

  const classes = useStyles();

  const navClass = useMemo(() => {
    const result = [classes.wrapper, classes[color], className];
    if (border) {
      result.push(classes.border);
    }
    return result.join(' ');
  }, []);

  return (
    <AppBar position="static" className={navClass} style={style} elevation={0}>
      <AreaSafe />
      <Toolbar variant={isIOS ? 'dense' : 'regular'}>
        <DefaultButton {...backButtonProps} />
        {leftButtons}
        {title && (
          <div className={`${classes.title} ${classes[titleAlign]}`}>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
          </div>
        )}
        <div className={classes.grow}>{custom}</div>
        {rightButtons}
      </Toolbar>
    </AppBar>
  );
}

Navigation.defaultProps = {
  className: '',
  color: 'primary',
  border: false,
  titleAlign: 'center',
};

Navigation.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  leftButtons: PropTypes.arrayOf(PropTypes.node),
  rightButtons: PropTypes.arrayOf(PropTypes.node),
  custom: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'light', 'grey', 'dark']),
  style: PropTypes.object,
  border: PropTypes.bool,
  titleAlign: PropTypes.oneOf(['left', 'center', 'right']),
  backButtonProps: PropTypes.shape({
    className: PropTypes.string,
    type: PropTypes.oneOf(['back', 'action']),
    icon: PropTypes.oneOf(['back', 'close']),
    action: PropTypes.func,
  }),
};

export default memo(Navigation);
