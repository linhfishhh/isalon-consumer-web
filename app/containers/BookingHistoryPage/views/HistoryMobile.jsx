import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import BookingItem from 'components/BookingItem';
import EmptyPage from 'components/EmptyPage';

const useStyles = makeStyles(theme => ({
  list: {
    flexFlow: 1,
    padding: theme.spacing(4),
  },
}));

function HistoryMobile(props) {
  const { loading, items, onShowBookingDetail } = props;

  const classes = useStyles();

  return (
    <>
      {isEmpty(items) ? (
        <>
          {loading ? (
            <>{/* Placeholder */}</>
          ) : (
            <EmptyPage
              title="Không có đơn đặt chỗ"
              subTitle="Bạn chưa có đơn đặt chỗ nào sẽ thực hiện sắp tới, khi
          nào có chúng sẽ hiển thị tại đây"
            />
          )}
        </>
      ) : (
        <List className={classes.list} component="div">
          {items.map(item => (
            <BookingItem
              key={item.id}
              data={item}
              onClick={onShowBookingDetail}
            >
              {item.name}
            </BookingItem>
          ))}
        </List>
      )}
    </>
  );
}

HistoryMobile.defaultProps = {
  items: [],
};

HistoryMobile.propTypes = {
  loading: PropTypes.bool,
  items: PropTypes.array,
  onShowBookingDetail: PropTypes.func,
};

export default memo(HistoryMobile);
