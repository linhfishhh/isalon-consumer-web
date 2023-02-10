import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';

import Button from 'components/Button';
import Transition from 'components/Transition';

import GoogleMapView from './GoogleMapView';

const useStyles = makeStyles(theme => ({
  wrapper: {},
  navigation: {
    backgroundColor: theme.palette.primary.main,
    background: `linear-gradient(90deg, rgba(${theme.hexToRgb(
      theme.palette.primary.main,
    )}, 1) 0%, rgba(${theme.hexToRgb(
      theme.palette.backgroundColor[5],
    )}, 1) 100%)`,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  btnClose: {
    color: theme.palette.textColor[6],
  },
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: '#F2F2F2',
  },
}))(MuiDialogContent);

function Map(props) {
  const [open, setOpen] = React.useState(false);
  const { location } = props;

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link onClick={handleClickOpen}>Xem bản đồ chỉ dẫn</Link>
      }
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar position="static" className={classes.navigation}>
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography className={classes.title}>Bản đồ</Typography>
              </Grid>
              <Grid item>
                <Button
                  icon="close"
                  type="iconButton"
                  onClick={handleClose}
                  className={classes.btnClose}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
          <GoogleMapView location={location} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

Map.propTypes = {
  location: PropTypes.object,
};

export default memo(Map);
