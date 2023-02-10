/**
 *
 * MinimalItem
 *
 */

import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { currencyFormat } from 'utils/stringFormat';
import { FlashIcon } from 'assets/svgIcon';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    cursor: 'pointer',
    minHeight: 44,
    '&:hover $title': {
      color: theme.palette.primary.main,
    },
  },
  title: {
    fontSize: 14,
    padding: theme.spacing(1, 2, 1, 0),
    color: theme.palette.grey[800],
  },
  time: {
    color: theme.palette.textColor[2],
    display: 'inline',
  },
  price: {
    fontSize: 18,
    color: theme.palette.primary.main,
    display: 'inline',
    fontWeight: theme.typography.fontWeightMedium,
  },
  oldPrice: {
    paddingRight: theme.spacing(2),
    color: theme.palette.textColor[2],
    textDecoration: 'line-through',
  },
  discount: {
    backgroundColor: theme.palette.backgroundColor[8],
    borderRadius: theme.shape.borderRadius,
    display: 'inline',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.primary.main,
  },
  flash: {
    width: 8,
    margin: theme.spacing(1),
  },
}));

function MinimalItem(props) {
  const { className = '', data, onShowDetail } = props;
  const classes = useStyle();

  const handleShowServiceDetail = useCallback(() => {
    if (onShowDetail) {
      onShowDetail(data);
    }
  }, []);

  return (
    <Grid
      container
      className={`${classes.wrapper} ${className}`}
      alignItems="center"
      onClick={handleShowServiceDetail}
    >
      <Grid item xs>
        <Typography className={classes.title}>{data.name}</Typography>
        {/* <Typography className={classes.time}>{data.time}</Typography> */}
      </Grid>
      <Grid item>
        <Grid container justify="flex-end">
          <Grid
            item
            xs
            container
            direction="column"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item>
              <Typography className={classes.price}>
                {data.price_from !== data.final_price && (
                  <Typography
                    component="span"
                    className={classes.oldPrice}
                    align="right"
                  >
                    {currencyFormat(data.price_from)}
                  </Typography>
                )}
                {currencyFormat(data.final_price)}
              </Typography>
            </Grid>
            {data.sale_off_up_to !== 0 && (
              <Grid item>
                <Typography className={classes.discount}>
                  <FlashIcon className={classes.flash} />
                  {`- ${data.sale_off_up_to}%`}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

MinimalItem.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  onShowDetail: PropTypes.func,
};

export default memo(MinimalItem);
