import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Img from 'components/Img';

import { path } from 'routers/path';

import shopping from 'assets/icons/history_empty_shopping.svg';
import card from 'assets/icons/history_empty_card.svg';
import shipping from 'assets/icons/history_empty_shipping.svg';

const useStyles = makeStyles(theme => ({
  emptyView: {
    height: '100%',
    flexGrow: 1,
  },
  lightView: {
    height: 215,
  },
  icon: {
    marginTop: 140,
    height: 120,
    zIndex: 1,
  },
  grayView: {
    backgroundColor: theme.palette.grey[200],
    flexGrow: 1,
  },
  title: {
    color: '#A6A8AB',
    marginTop: 70,
  },
  button: {
    marginTop: 40,
    borderRadius: 25,
    fontWeight: 'bold',
    boxShadow: 'none',
    margin: theme.spacing(0, 10),
    height: 50,
    fontSize: 17,
  },
}));

const dataEmptyView = orderStatus => {
  switch (orderStatus) {
    case 'pending':
      return {
        icon: shipping,
        title: 'Không có đơn hàng nào chờ thanh toán',
      };
    case 'paid':
      return {
        icon: card,
        title: 'Không có đơn hàng nào đã thanh toán',
      };
    case 'cancel':
      return {
        icon: shopping,
        title: 'Không có đơn hàng nào đã huỷ',
      };
    default:
      return {
        icon: shopping,
        title: 'Bạn chưa mua hàng tại isalon',
      };
  }
};

function HistoryOrderEmpty(props) {
  const { orderStatus, isGoBack = false } = props;
  const classes = useStyles();
  const data = dataEmptyView(orderStatus);
  const history = useHistory();

  const onContinue = () => {
    if (isGoBack) {
      history.goBack();
    } else {
      history.replace(path.productHome);
    }
  };

  return (
    <Grid container direction="column" className={classes.emptyView}>
      <Grid item container justify="center" className={classes.lightView}>
        <Img src={data.icon} className={classes.icon} resizeMode="contain" />
      </Grid>
      <Grid
        item
        container
        justify="center"
        alignContent="flex-start"
        className={classes.grayView}
      >
        <Typography className={classes.title}>{data.title}</Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onContinue}
        >
          TIẾP TỤC MUA SẮM
        </Button>
      </Grid>
    </Grid>
  );
}

HistoryOrderEmpty.propTypes = {
  orderStatus: PropTypes.string,
  isGoBack: PropTypes.bool,
};

export default memo(HistoryOrderEmpty);
