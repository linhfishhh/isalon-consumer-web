/**
 *
 * DrawerView
 *
 */

import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import AreaSafe from 'components/AreaSafe';

const useStyle = makeStyles(theme => ({
  wrapper: {},
  paper: {
    width: isMobileOnly ? '100%' : 'auto',
  },
  button: {
    position: 'fixed',
    color: theme.palette.textColor[6],
    backgroundColor: theme.palette.backgroundColor[6],
    padding: theme.spacing(1),
    borderRadius: 0,
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: theme.palette.backgroundColor[6],
    },
  },
  iconbutton: {
    padding: theme.spacing(2.5),
  },
  header: {
    borderBottom: 'solid 1px #cccccc',
    flexShrink: 0,
  },
}));

function DrawerView(props) {
  const {
    className,
    children,
    open,
    anchor,
    title,
    classNamePaper,
    height,
    onClose,
    hideAreaSafe,
  } = props;
  const classes = useStyle();

  const stylePaper = height ? { height } : {};

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      className={`${classes.wrapper} ${className}`}
      PaperProps={{
        className: `${classes.paper} ${classNamePaper}`,
        style: stylePaper,
      }}
    >
      {isMobileOnly ? (
        <>
          <AreaSafe hide={hideAreaSafe} />
          <Grid container alignItems="center" className={classes.header}>
            <Grid item>
              <IconButton className={classes.iconbutton} onClick={onClose}>
                <CloseRoundedIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" align="center">
                {title}
              </Typography>
            </Grid>
            <Grid item style={{ width: 44 }} />
          </Grid>
        </>
      ) : (
        <Button className={classes.button} onClick={onClose}>
          <CloseRoundedIcon />
        </Button>
      )}
      {children}
    </Drawer>
  );
}

DrawerView.defaultProps = {
  className: '',
  anchor: 'right',
  classNamePaper: '',
  hideAreaSafe: false,
};

DrawerView.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  open: PropTypes.bool,
  classNamePaper: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func,
  title: PropTypes.string,
  hideAreaSafe: PropTypes.bool,
};

export default memo(DrawerView);
