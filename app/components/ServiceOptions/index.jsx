/**
 *
 * ServiceOptions
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';

import DrawerView from 'components/DrawerView';
import SelectionList from 'components/SelectionList';
import ServicePrice from 'components/ServicePrice';

import { currencyFormat } from 'utils/stringFormat';

const useStyle = makeStyles(theme => ({
  wrapper: {
    width: isMobileOnly ? '100%' : theme.breakpoints.values.sm,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  option: {
    flexGrow: 1,
    overflow: 'auto',
    padding: isMobileOnly ? theme.spacing(0) : theme.spacing(15),
  },
  title: {
    padding: theme.spacing(5),
  },
  name: {
    fontSize: isMobileOnly ? 14 : 16,
    fontWeight: isMobileOnly ? 'normal' : theme.typography.fontWeightMedium,
  },
  finalPrice: {
    color: theme.palette.primary.main,
    fontSize: isMobileOnly ? 16 : 18,
    fontWeight: isMobileOnly ? 'bold' : 'normal',
    paddingRight: isMobileOnly ? theme.spacing(4) : 0,
  },
  orgPrice: {
    color: theme.palette.textColor[2],
    textDecoration: 'line-through',
    fontSize: isMobileOnly ? 12 : 14,
    paddingRight: isMobileOnly ? theme.spacing(4) : theme.spacing(2),
  },
}));

function ServiceOptions(props) {
  const { open, bookingNow = false, onClose, service, onBooking } = props;
  const classes = useStyle();

  const [option, setOption] = useState({});

  useEffect(() => {
    if (service.options && service.options.length > 0) {
      setOption(service.options[0]);
    }
  }, [service]);

  const handleBooking = () => {
    onBooking(option);
  };

  const renderLabel = item => (
    <Grid container alignItems="center">
      <Grid item xs>
        <Typography className={classes.name}>{item.name}</Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems="flex-end" direction="column">
          <Typography className={classes.finalPrice}>
            {!isMobileOnly && item.org_price !== item.final_price && (
              <Typography component="span" className={classes.orgPrice}>
                {currencyFormat(item.org_price)}
              </Typography>
            )}
            {currencyFormat(item.final_price)}
          </Typography>
          {isMobileOnly && item.org_price !== item.final_price && (
            <Typography className={classes.orgPrice}>
              {currencyFormat(item.org_price)}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <DrawerView
      open={open}
      onClose={onClose}
      title={service.name}
      anchor={isMobileOnly ? 'bottom' : 'right'}
      height={isMobileOnly ? '65%' : '100%'}
      hideAreaSafe={isMobileOnly}
    >
      <Grid container className={classes.wrapper}>
        <Grid item xs={12} className={classes.option}>
          <Grid container direction="column">
            {!isMobileOnly && (
              <>
                <Grid item xs>
                  <Divider />
                </Grid>
                <Grid item xs>
                  <Typography variant="h4" className={classes.title}>
                    {service.name}
                  </Typography>
                </Grid>
              </>
            )}
            <Grid item xs>
              <SelectionList
                data={service.options}
                renderLabel={renderLabel}
                selected={[option]}
                onSelected={selected => setOption(selected[0])}
                listItemProps={
                  isMobileOnly ? { dense: true, disableGutters: true } : {}
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {!isEmpty(option) && (
        <ServicePrice
          bookingNow={bookingNow}
          price={option.final_price}
          oldPrice={option.org_price}
          salePercent={service.sale_percent}
          onBooking={handleBooking}
        />
      )}
    </DrawerView>
  );
}

ServiceOptions.propTypes = {
  open: PropTypes.bool,
  bookingNow: PropTypes.bool,
  onClose: PropTypes.func,
  service: PropTypes.object,
  onBooking: PropTypes.func,
};

export default memo(ServiceOptions);
