/**
 *
 * DefaultButton
 *
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isIOS } from 'react-device-detect';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';
import { path } from 'routers/path';

const useStyles = makeStyles(theme => ({
  root: {
    padding: isIOS ? theme.spacing(2) : theme.spacing(3),
  },
}));

function DefaultButton(props) {
  const { className, type, icon, action } = props;

  const history = useHistory();
  const classes = useStyles();

  const onClick = () => {
    if (window.history.length > 1) {
      history.goBack();
    } else {
      history.push(path.home);
    }
  };

  const iconDefault = useMemo(() => {
    if (icon === 'close') {
      return <CloseIcon />;
    }
    return isIOS ? <ArrowBackIosIcon /> : <ArrowBackIcon />;
  }, []);

  return (
    <>
      {type === 'action' && (
        <IconButton
          onClick={action || onClick}
          className={`${classes.root} ${className}`}
          color="inherit"
        >
          {iconDefault}
        </IconButton>
      )}
      {type === 'back' && (
        <IconButton
          onClick={action || onClick}
          className={`${classes.root} ${className}`}
          color="inherit"
        >
          {iconDefault}
        </IconButton>
      )}
    </>
  );
}

DefaultButton.defaultProps = {
  className: '',
  type: 'back',
  icon: 'back',
};

DefaultButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['back', 'action']),
  icon: PropTypes.oneOf(['back', 'close']),
  action: PropTypes.func,
};

export default memo(DefaultButton);
