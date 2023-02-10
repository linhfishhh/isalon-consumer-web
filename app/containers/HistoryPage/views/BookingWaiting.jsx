import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import BookingItem from 'components/BookingItem';
import EmptyPage from 'components/EmptyPage';

const useStyles = makeStyles(theme => ({
  list: {
    padding: theme.spacing(4),
  },
}));

const BookingWaiting = props => {
  const { loading, data, onClick } = props;

  const classes = useStyles();

  const handleShowDetail = item => {
    onClick(item.id, 'booking');
  };

  return (
    <>
      {isEmpty(data) ? (
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
          {data.map(item => (
            <BookingItem key={item.id} data={item} onClick={handleShowDetail}>
              {item.name}
            </BookingItem>
          ))}
        </List>
      )}
    </>
  );
};

BookingWaiting.defaultProps = {
  data: [],
};

BookingWaiting.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  onClick: PropTypes.func,
};

export default memo(BookingWaiting);
