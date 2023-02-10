/**
 *
 * ServiceBookingItem
 *
 */

import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { currencyFormat } from 'utils/stringFormat';

import Button from 'components/Button';
import AmountCounter from 'components/AmountCounter';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: isMobileOnly ? theme.spacing(2, 0) : theme.spacing(2),
    borderTop: `solid 1px ${theme.palette.borderColor[1]}`,
  },
  name: {
    paddingBottom: isMobileOnly ? 0 : theme.spacing(1),
  },
  promo: {
    color: theme.palette.textColor[2],
  },
  time: {
    color: theme.palette.textColor[2],
    marginRight: isMobileOnly ? theme.spacing(2) : theme.spacing(3),
    minWidth: isMobileOnly ? 0 : 100,
    display: 'inline-block',
  },
  amount: {
    display: 'inline',
  },
  price: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: isMobileOnly ? 16 : 18,
  },
  qty: {
    fontSize: isMobileOnly ? 14 : 16,
    marginLeft: theme.spacing(2),
  },
  close: {
    padding: theme.spacing(1.5),
  },
  rightView: {
    marginLeft: theme.spacing(2),
  },
}));

function ServiceBookingItem(props) {
  const { isModify = true, data, onChange, onRemove } = props;
  const classes = useStyle();

  const handleChangeQuantity = amount => {
    const { count } = amount;
    onChange(data.id, count);
  };

  const handleRemove = () => {
    onRemove(data.id);
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs>
        <Grid container>
          <Grid item xs>
            <Typography variant="h6" className={classes.name}>
              {data.name}
              {data.promo && (
                <Typography component="span" className={classes.promo}>
                  {data.promo_text}
                </Typography>
              )}
            </Typography>
            {data.option && <Typography>{data.option.name}</Typography>}
            <Typography className={classes.time}>{data.time}</Typography>
            {isModify ? (
              <AmountCounter
                align="center"
                initialValue={data.qty}
                onChange={handleChangeQuantity}
              />
            ) : (
              <Typography display="inline" className={classes.amount}>
                Số lượng:
                <Typography component="span" className={classes.qty}>
                  {data.qty}
                </Typography>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.rightView}>
        <Grid container direction="column" alignItems="flex-end">
          {isModify && (
            <Grid item>
              <Button
                icon="delete"
                type="iconButton"
                onClick={handleRemove}
                className={classes.close}
              />
            </Grid>
          )}
          <Grid item>
            <Typography className={classes.price}>
              {data.option
                ? currencyFormat(data.option.final_price)
                : currencyFormat(data.price)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ServiceBookingItem.propTypes = {
  isModify: PropTypes.bool,
  data: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};

export default memo(ServiceBookingItem);
