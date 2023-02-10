/**
 *
 * AccountBooking
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router-dom';

import { path } from 'routers/path';

import BookingItem from 'components/BookingItem';
import EmptyPage from 'components/EmptyPage';

const useStyle = makeStyles(() => ({
  wrapper: {
    width: 360,
    maxHeight: 350,
    padding: 25,
  },
  empty: {
    padding: 0,
  },
  list: {
    padding: 0,
  },
}));

const AccountBooking = props => {
  const { data } = props;

  const classes = useStyle();
  const history = useHistory();

  const handleOnClick = item => {
    const detailPath = `${path.bookingHistory}?id=${item.id}`;
    history.push(detailPath);
  };

  return (
    <div className={classes.wrapper}>
      {isEmpty(data) ? (
        <EmptyPage
          className={classes.empty}
          title="Không có đơn đặt chỗ"
          subTitle="Bạn chưa có đơn đặt chỗ nào sẽ thực hiện sắp tới, khi nào có chúng sẽ hiển thị tại đây"
        />
      ) : (
        <List className={classes.list} component="div">
          {data.map(item => (
            <BookingItem key={item.id} data={item} onClick={handleOnClick}>
              {item.name}
            </BookingItem>
          ))}
        </List>
      )}
    </div>
  );
};

AccountBooking.propTypes = {
  data: PropTypes.array,
};

export default memo(AccountBooking);
