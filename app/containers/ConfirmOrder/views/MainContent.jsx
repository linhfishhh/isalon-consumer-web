import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    marginTop: theme.spacing(4),
    border: '0.5px solid #d2d2d2aa',
    borderRadius: 3,
    overflow: 'hidden',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  shipHint: {
    color: '#8E8E93',
    fontSize: 12,
    alignSelf: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    borderBottom: '1px solid #d2d2d2aa',
    padding: theme.spacing(4),
  },
  textSelect: {
    alignSelf: 'center',
    marginLeft: theme.spacing(2),
  },
  orderItems: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
}));

const MainContent = props => {
  const classes = useStyles();
  const { order } = props;
  return (
    <div className={classes.root}>
      <Grid container className={classes.header}>
        <Typography className={classes.textSelect}>
          {order.items.length} SẢN PHẨM
        </Typography>
      </Grid>
      <div className={classes.orderItems}>
        {order.items.map(item => (
          <OrderItem
            key={`${item.productId}-${item.productVariantId}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

MainContent.propTypes = {
  order: PropTypes.object,
};

export default memo(MainContent);
