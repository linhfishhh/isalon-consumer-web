/**
 *
 * SalonServiceDetail
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { Grid, Avatar, Typography, Divider } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import DrawerView from 'components/DrawerView';
import ServiceOptions from 'components/ServiceOptions';
import ServiceDetailPlaceHolder from 'components/Placeholder/ServiceDetailPlaceHolder';
import BookingReview from 'containers/BookingReview';
import ServicePrice from 'components/ServicePrice';
import Img from 'components/Img';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { convertToSlug } from 'utils/stringFormat';
import { useAuthentication } from 'utils/hooks';

import {
  createServiceBookingLS,
  addServiceBookingLS,
  addBookingInfoLS,
} from 'utils/localStorage/booking';
import { path, createPath } from 'routers/path';

import { getRequest, cleanDataAction } from './actions';

import { makeSelectSalonServiceDetail } from './selectors';

import { CONTEXT } from './constants';

import reducer from './reducer';
import saga from './saga';

const useStyle = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  paperDrawer: {
    width: theme.breakpoints.values.md,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  section: {
    flexGrow: 1,
    overflow: 'auto',
    padding: isMobileOnly ? theme.spacing(0) : theme.spacing(5, 20),
  },
  title: {
    padding: isMobileOnly ? theme.spacing(4) : theme.spacing(5, 15),
  },
  wrapperContent: {
    padding: isMobileOnly ? theme.spacing(0) : theme.spacing(5, 15),
  },
  cover: {
    height: 250,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: theme.spacing(2),
  },
  name: {
    fontSize: 18,
    fontWeight: theme.typography.fontWeightMedium,
  },
  time: {
    color: theme.palette.textColor[2],
    display: 'inline',
  },
  titleDesc: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& *': {
      display: 'inline',
    },
  },
  description: {
    padding: isMobileOnly ? theme.spacing(4) : 0,
  },
  separator: {
    height: theme.spacing(1),
  },
  placeHolder: {
    margin: isMobileOnly ? theme.spacing(4) : 0,
  },
}));

export function SalonServiceDetail(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyle();
  const history = useHistory();

  const {
    bookingNow,
    serviceId,
    getServiceDetail,
    serviceDetail,
    booking,
    onSelectService,
    cleanData,
    onClosed,
    onlyOption,
  } = props;

  const { authenticated, showSignInDialog } = useAuthentication();

  const [open, setOpen] = useState(false);
  const [openOption, setOpenOption] = useState(false);

  const isBooking = !isEmpty(
    booking.find(item => item.id === serviceDetail.id),
  );

  useEffect(() => {
    if (serviceId) {
      if (onlyOption) {
        setOpenOption(true);
      } else {
        setOpen(true);
      }
    }
  }, [serviceId]);

  useEffect(() => {
    if (open) {
      getServiceDetail({ serviceId });
    } else {
      cleanData();
      onClosed();
    }
  }, [open]);

  useEffect(() => {
    if (onlyOption) {
      if (openOption) {
        getServiceDetail({ serviceId });
      } else {
        cleanData();
        onClosed();
      }
    }
  }, [openOption]);

  const handleClose = useCallback(() => {
    setOpenOption(false);
    setOpen(false);
  }, []);

  const handleCloseOption = useCallback(() => {
    setOpenOption(false);
  }, []);

  const handleBooking = option => {
    if (authenticated) {
      if (!isBooking && isEmpty(option) && !isEmpty(serviceDetail.options)) {
        setOpenOption(true);
      } else if (bookingNow) {
        handleBookingNow(option);
      } else {
        onSelectService(isBooking, serviceDetail, option);
        if (!isBooking) {
          handleClose();
        }
      }
    } else {
      showSignInDialog();
    }
  };

  const handleBookingNow = option => {
    const { salon } = serviceDetail;
    const { id: salonId, name } = salon;
    const province = salon.address.split(',').pop();
    const link = createPath(path.salonDetail, {
      salonId: `${salonId}`,
      salonName: convertToSlug(name),
      provinceName: convertToSlug(province),
    });
    const serviceBooking = createServiceBookingLS(serviceDetail, option);
    addServiceBookingLS(salonId, serviceBooking);
    addBookingInfoLS(salon.id, {
      salonId,
      url: link,
      step: 0,
    });
    history.push(createPath(path.booking, { salonId }));
  };

  return (
    <>
      <DrawerView
        open={open}
        anchor={isMobileOnly ? 'bottom' : 'right'}
        onClose={handleClose}
        title={serviceDetail.name}
        classNamePaper={classes.paperDrawer}
        height="100%"
      >
        <Grid container className={classes.wrapper} direction="column">
          <Grid item xs={12} className={classes.section}>
            <Grid container direction="column">
              {isMobileOnly ? (
                <Grid item xs>
                  {serviceDetail.cover && (
                    <Img src={serviceDetail.cover} className={classes.cover} />
                  )}
                </Grid>
              ) : (
                <Grid item xs>
                  {!isEmpty(serviceDetail.salon) ? (
                    <Typography variant="h2" className={classes.title}>
                      {serviceDetail.salon && serviceDetail.salon.name}
                    </Typography>
                  ) : (
                    <Skeleton
                      animation="wave"
                      height={50}
                      style={{ margin: '20px 60px' }}
                    />
                  )}
                </Grid>
              )}
              <Grid item xs>
                <Divider />
              </Grid>
              <Grid item xs>
                <Grid container className={classes.wrapperContent}>
                  {!isEmpty(serviceDetail) ? (
                    <>
                      {!isMobileOnly && (
                        <>
                          <Grid item>
                            <Avatar
                              src={serviceDetail.cover}
                              className={classes.avatar}
                            />
                          </Grid>
                          <Grid item xs>
                            <Typography className={classes.name}>
                              {serviceDetail.name}
                            </Typography>
                            <Typography className={classes.time}>
                              {serviceDetail.time}
                            </Typography>
                          </Grid>
                        </>
                      )}
                      <Grid item xs={12} className={classes.description}>
                        {isMobileOnly && (
                          <div className={classes.titleDesc}>
                            <Typography variant="h5">
                              Chi tiết dịch vụ
                            </Typography>
                            <Typography className={classes.time}>
                              {serviceDetail.time}
                            </Typography>
                          </div>
                        )}
                        <Typography
                          component="div"
                          className="content"
                          dangerouslySetInnerHTML={{
                            __html: serviceDetail.info,
                          }}
                        />
                      </Grid>
                    </>
                  ) : (
                    <ServiceDetailPlaceHolder className={classes.placeHolder} />
                  )}
                  {!isEmpty(serviceDetail.reviews) && (
                    <Grid item xs={12}>
                      {isMobileOnly && (
                        <Divider className={classes.separator} />
                      )}
                      <BookingReview
                        rating={serviceDetail.rating}
                        ratingCount={serviceDetail.ratingCount}
                        id={serviceDetail.id}
                        variant="service"
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs>
                <Divider />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {!isEmpty(serviceDetail) && (
          <ServicePrice
            bookingNow={bookingNow}
            price={serviceDetail.priceNumber}
            oldPrice={serviceDetail.oldPriceNumber}
            salePercent={serviceDetail.sale_percent}
            isBooking={isBooking}
            onBooking={() => handleBooking()}
          />
        )}
      </DrawerView>
      <ServiceOptions
        bookingNow={bookingNow}
        open={openOption}
        onClose={handleCloseOption}
        service={serviceDetail}
        onBooking={handleBooking}
      />
    </>
  );
}

SalonServiceDetail.defaultProps = {
  booking: [],
  bookingNow: false,
  onlyOption: false,
};

SalonServiceDetail.propTypes = {
  bookingNow: PropTypes.bool,
  serviceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getServiceDetail: PropTypes.func,
  serviceDetail: PropTypes.object,
  booking: PropTypes.array,
  cleanData: PropTypes.func,
  onSelectService: PropTypes.func,
  onClosed: PropTypes.func,
  onlyOption: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  serviceDetail: makeSelectSalonServiceDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getServiceDetail: payload => dispatch(getRequest(payload)),
    cleanData: () => dispatch(cleanDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SalonServiceDetail);
