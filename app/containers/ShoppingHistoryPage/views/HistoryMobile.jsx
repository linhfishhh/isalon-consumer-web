import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CancelOrder from 'components/CancelOrder';
import HistoryOrderItem from 'components/HistoryOrderItem';
import HistoryOrderEmpty from 'components/HistoryOrderEmpty';

const useStyles = makeStyles(theme => ({
  list: {
    padding: theme.spacing(4, 0),
    '& div:last-child': {
      border: 'none',
    },
  },
}));

function HistoryMobile(props) {
  const {
    loading,
    orderStatus,
    items,
    onShowShoppingDetail,
    onCancelOrder,
  } = props;
  const [openConfirmCancel, setOpenConfirmCancel] = useState(false);
  const [orderDetail, setOrderDetail] = useState();
  const classes = useStyles();

  const onClickCancelOrder = useCallback(order => {
    setOrderDetail(order);
    setOpenConfirmCancel(true);
  }, []);

  const onCloseConfirmCancel = useCallback(() => {
    setOpenConfirmCancel(false);
  }, []);

  const onConfirmCancelOrder = useCallback((order, reason) => {
    onCancelOrder(order, reason);
    setOpenConfirmCancel(false);
  }, []);

  return (
    <>
      {isEmpty(items) ? (
        <>
          {loading ? (
            <>{/* Placeholder */}</>
          ) : (
            <HistoryOrderEmpty orderStatus={orderStatus} isGoBack />
          )}
        </>
      ) : (
        <>
          <List className={classes.list} component="div">
            {items.map(item => (
              <HistoryOrderItem
                key={item.orderId}
                data={item}
                onOpenDetail={() => onShowShoppingDetail(item)}
                onCancel={onClickCancelOrder}
              >
                {item.name}
              </HistoryOrderItem>
            ))}
          </List>
          <CancelOrder
            open={openConfirmCancel}
            order={orderDetail}
            onClose={onCloseConfirmCancel}
            onConfirmCancel={onConfirmCancelOrder}
          />
        </>
      )}
    </>
  );
}

HistoryMobile.defaultProps = {
  items: [],
};

HistoryMobile.propTypes = {
  loading: PropTypes.bool,
  orderStatus: PropTypes.string,
  items: PropTypes.array,
  onShowShoppingDetail: PropTypes.func,
  onCancelOrder: PropTypes.func,
};

export default memo(HistoryMobile);
