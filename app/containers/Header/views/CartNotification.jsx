import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, IconButton, Button, Paper } from '@material-ui/core';
import CheckmarkIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { path } from 'routers/path';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));

function CartNotification(props) {
  const classes = useStyles();
  const { closeNotification, onGoToCart } = props;
  const history = useHistory();
  return (
    <Paper className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <CheckmarkIcon color="secondary" />
            </Grid>
            <Grid item xs>
              <Typography display="inline">
                Thêm vào giỏ hàng thành công
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={closeNotification}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={() => {
              onGoToCart();
              history.push(path.cart);
            }}
          >
            XEM GIỎ HÀNG VÀ THANH TOÁN
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

CartNotification.propTypes = {
  closeNotification: PropTypes.func,
  onGoToCart: PropTypes.func,
};

export default memo(CartNotification);
