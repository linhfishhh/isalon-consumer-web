/**
 *
 * StepOne
 *
 */
import React, { memo, useCallback } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

import SelectTime from './SelectTime';
import ServiceBooking from './ServiceBooking';
import SalonInfo from './SalonInfo';

const useStyle = makeStyles(theme => ({
  wrapper: {},
  leftColumn: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: isMobileOnly ? theme.spacing(7) : 0,
    overflow: 'hidden',
  },
  rightColumn: {
    backgroundColor: theme.palette.background.paper,
    marginTop: isMobileOnly ? theme.spacing(4) : 0,
    marginLeft: theme.spacing(4),
    borderRadius: isMobileOnly ? theme.spacing(7) : 0,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
      marginLeft: 0,
    },
  },
  salonInfoWrapper: {
    padding: theme.spacing(4),
  },

  total: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: theme.spacing(2),
  },
  button: {
    color: theme.palette.textColor[6],
    backgroundColor: theme.palette.primary.main,
    textTransform: 'uppercase',
    boxShadow: `0 8px 5px rgba(${theme.hexToRgb(
      theme.palette.primary.main,
    )}, 0.2)`,
    fontSize: 18,
    padding: theme.spacing(2, 6),
    borderRadius: isMobileOnly ? theme.spacing(6) : 6,
    '&:hover': {
      backgroundColor: `rgba(${theme.hexToRgb(
        theme.palette.primary.main,
      )}, 0.7)`,
    },
  },
  bottomView: {
    padding: theme.spacing(4),
    borderTop: `solid 1px ${theme.palette.borderColor[1]}`,
  },
}));

function StepOne(props) {
  const {
    salonInfo,
    bookingInfo,
    openTime,
    bookingItems,
    onSelectedDateTime,
    onNextStep,
    onChangeQuantity,
    onRemoveService,
  } = props;
  const classes = useStyle();

  const { salonId, date, time, url } = bookingInfo;

  const handleChangeQuantityService = useCallback((id, qty) => {
    onChangeQuantity({ salonId, id, qty });
  }, []);

  const handleRemoveService = useCallback(id => {
    onRemoveService({ salonId, id });
  }, []);

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12} md lg={5} className={classes.leftColumn}>
        <SelectTime
          openTime={openTime}
          onSelected={onSelectedDateTime}
          bookingDate={date || new Date()}
          bookingTime={time}
        />
      </Grid>
      <Grid item xs={12} md lg className={classes.rightColumn}>
        <Grid container>
          <Grid item xs={12} className={classes.salonInfoWrapper}>
            <SalonInfo salonInfo={salonInfo} />
          </Grid>
          <Grid item xs={12}>
            <ServiceBooking
              title="Dịch vụ"
              height={isMobileOnly ? 0 : 350}
              services={bookingItems.items}
              onChangeQuantity={handleChangeQuantityService}
              onRemoveService={handleRemoveService}
              url={url}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" className={classes.bottomView}>
              <Grid item xs={isMobileOnly ? true : 6}>
                <Button
                  disabled={isEmpty(bookingItems.items)}
                  fullWidth
                  variant="contained"
                  className={classes.button}
                  onClick={onNextStep}
                >
                  Tiếp tục
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

StepOne.propTypes = {
  salonInfo: PropTypes.object,
  bookingInfo: PropTypes.object,
  openTime: PropTypes.object,
  bookingItems: PropTypes.object,
  onSelectedDateTime: PropTypes.func,
  onNextStep: PropTypes.func,
  onRemoveService: PropTypes.func,
  onChangeQuantity: PropTypes.func,
};

export default memo(StepOne);
