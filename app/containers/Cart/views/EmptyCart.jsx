import React, { memo } from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Img from 'components/Img';
import EmptyImage from 'assets/images/empty_cart.png';
import { useHistory } from 'react-router-dom';
import { path } from 'routers/path';
import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  text: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isMobileOnly ? 0 : 50,
    background: 'white',
    border: '0.5px solid #d2d2d2aa',
    borderRadius: 4,
  },
  imageMobile: {
    width: '100%',
    height: '30%',
  },
  image: {
    width: '30%',
    height: '30%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    marginTop: theme.spacing(6),
    height: 50,
    // padding: '8px 150px 8px 150px',
    width: isMobileOnly ? '100%' : '50%',
  },
}));

function EmptyCart() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Img
        className={isMobileOnly ? classes.imageMobile : classes.image}
        src={EmptyImage}
        resizeMode="cover"
      />
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => history.push(path.productHome)}
        disableElevation
        fullWidth={isMobileOnly}
      >
        TIẾP TỤC MUA SẮM
      </Button>
      <Typography className={classes.text}>
        Bạn chưa có sản phẩm nào trong giỏ hàng
      </Typography>
    </div>
  );
}

EmptyCart.propTypes = {};

export default memo(EmptyCart);
