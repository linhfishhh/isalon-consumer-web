import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import EmptyPage from 'components/EmptyPage';
import ShoppingItem from 'components/HistoryOrderItem/ShoppingItem';

const useStyles = makeStyles(theme => ({
  list: {
    padding: theme.spacing(4),
  },
}));

const ShoppingWaitting = props => {
  const { loading, data, onClick } = props;

  const classes = useStyles();

  const handleShowDetail = item => {
    onClick(item.orderId, 'shoping');
  };

  return (
    <>
      {isEmpty(data) ? (
        <>
          {loading ? (
            <>{/* Placeholder */}</>
          ) : (
            <EmptyPage
              title="Không có đơn hàng"
              subTitle="Bạn chưa có đơn đang xử lý hoắc đang vận chuyển, khi
      nào có chúng sẽ hiển thị tại đây"
            />
          )}
        </>
      ) : (
        <List className={classes.list} component="div">
          {data.map(item => (
            <ShoppingItem
              key={item.orderId}
              data={item}
              onClick={handleShowDetail}
            >
              {item.name}
            </ShoppingItem>
          ))}
        </List>
      )}
    </>
  );
};

ShoppingWaitting.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  onClick: PropTypes.func,
};

export default memo(ShoppingWaitting);
