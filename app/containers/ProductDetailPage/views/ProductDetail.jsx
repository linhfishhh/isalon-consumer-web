import React, { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import useStyles from '../styles';

function ProductDetail(props) {
  const classes = useStyles();
  const { data } = props;
  const [minimize, setMinimize] = useState(true);
  const html = useMemo(
    () => ({
      __html: data,
    }),
    [data],
  );
  const onMinimize = () => {
    setMinimize(!minimize);
  };
  return (
    <div className={`${classes.root} ${classes.padding_4}`}>
      <Typography className={classes.title}>Chi tiết sản phẩm</Typography>
      <div
        className={
          minimize
            ? `${classes.productDetailContainer} ${classes.productDescMinimize}`
            : classes.productDetailContainer
        }
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={html}
      />
      <div className={classes.minimizeButton}>
        <Button variant="outlined" color="secondary" onClick={onMinimize}>
          {minimize ? 'MỞ RỘNG' : 'THU GỌN'}
        </Button>
      </div>
    </div>
  );
}

ProductDetail.propTypes = {
  data: PropTypes.string,
};

export default memo(ProductDetail);
