import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

import { isMobileOnly } from 'utils/platform';

import Checkbox from 'components/Checkbox';
import CartItem from './CartItem';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    marginTop: isMobileOnly ? 0 : theme.spacing(4),
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
    marginLeft: theme.spacing(2),
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    borderBottom: '1px solid #d2d2d2aa',
    padding: theme.spacing(3, 4),
  },
  textSelect: {
    marginLeft: theme.spacing(2),
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
}));

const MainContent = props => {
  const classes = useStyles();
  const {
    cart,
    onCheckboxChanged,
    totalSelected,
    onCheckboxSelectAllChanged,
    isCheckedAll,
    removeItem,
    addProduct,
    removeProduct,
    likeProduct,
    unlikeProduct,
  } = props;
  const { items } = cart;
  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.header}
        alignItems="center"
        justify="flex-start"
      >
        <Grid item>
          <Checkbox
            onChange={onCheckboxSelectAllChanged}
            checked={isCheckedAll}
          />
        </Grid>
        <Grid item>
          <Typography className={classes.textSelect}>
            CHỌN TẤT CẢ ({totalSelected} SẢN PHẨM)
          </Typography>
          <Typography className={classes.shipHint}>
            Miễn phí vận chuyển cho giao hàng tiêu chuẩn
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.cartItems}>
        {items.map(item => (
          <CartItem
            key={item.cartItemId}
            item={item}
            onCheckboxChanged={onCheckboxChanged}
            removeItem={removeItem}
            addProduct={addProduct}
            removeProduct={removeProduct}
            likeProduct={likeProduct}
            unlikeProduct={unlikeProduct}
          />
        ))}
      </div>
    </div>
  );
};

MainContent.propTypes = {
  cart: PropTypes.object,
  onCheckboxChanged: PropTypes.func,
  totalSelected: PropTypes.number,
  onCheckboxSelectAllChanged: PropTypes.func,
  isCheckedAll: PropTypes.bool,
  removeItem: PropTypes.func,
  addProduct: PropTypes.func,
  removeProduct: PropTypes.func,
  likeProduct: PropTypes.func,
  unlikeProduct: PropTypes.func,
};

export default memo(MainContent);
