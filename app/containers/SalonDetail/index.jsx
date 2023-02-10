/**
 *
 * SalonDetail
 *
 */

import React, {
  memo,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { path, createPath } from 'routers/path';
import DocumentHead from 'components/DocumentHead';
import SalonServiceDetail from 'containers/SalonServiceDetail';
import BookingReview from 'containers/BookingReview';
import SalonDetailPlaceHolder from 'components/Placeholder/SalonDetailPlaceHolder';
import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  createServiceBookingLS,
  addBookingInfoLS,
  getServicesBookingLS,
  addServiceBookingLS,
  removeServiceBookingLS,
} from 'utils/localStorage/booking';
import {
  useAuthentication,
  useDidUpdateEffect,
  useQueryString,
} from 'utils/hooks';

import styles from 'assets/styles';
import { HomeIcon } from 'assets/svgIcon';

import { showReviewFormAction } from 'containers/BookingReview/actions';
import {
  Gallery,
  Summary,
  Info,
  GroupTab,
  AvaliableService,
  ServiceList,
  Collection,
  StyleList,
  UseBrand,
  Booking,
  Map,
} from './views';

import {
  getRequest,
  favoriteRequest,
  favoriteCollectionRequest,
  cleanDataAction,
} from './actions';
import { makeSelectSalonDetail, makeSelectBookingSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { CONTEXT } from './constants';
import RelatedSalons from './views/RelatedSalons';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: isMobileOnly
      ? theme.palette.backgroundColor[1]
      : theme.palette.backgroundColor[7],
    paddingTop: isMobileOnly ? 0 : theme.spacing(8),
    paddingBottom: isMobileOnly ? theme.spacing(2) : theme.spacing(8),
  },
  group: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: isMobileOnly ? 0 : theme.spacing(1.5),
    backgroundColor: theme.palette.backgroundColor[1],
    marginTop: isMobileOnly ? 0 : theme.spacing(4),
    padding: isMobileOnly ? 0 : theme.spacing(4, 0),
  },
  tabsService: {
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
  },
}));

export function SalonDetail(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  // Check salon ngoại tuyến với open == 0

  const globalStyle = styles();
  const classes = useStyle();
  const history = useHistory();

  const {
    match,
    salonDetail,
    getSalonDetail,
    favoriteSalon,
    favoriteCollection,
    showReviewForm,
    cleanData,
    bookingSuccess,
  } = props;

  const salonId = get(match, 'params.salonId');

  const { authenticated, showSignInDialog } = useAuthentication();

  const serviceRef = useRef();
  const collectionRef = useRef();
  const reviewRef = useRef();

  const [serviceId, setServiceId] = useState();
  const [onlyOption, setOnlyOption] = useState(false);
  const [snapDetailService, setSnapDetailService] = useState(false);
  const [categorySelect, setCategorySelect] = useState({});
  const [booking, setBooking] = useState(getServicesBookingLS(salonId));
  const [showMap, setShowMap] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const tabs = [
    { name: 'Dịch vụ', ref: serviceRef },
    { name: 'Tác phẩm', ref: collectionRef },
    { name: 'Đánh giá', ref: reviewRef },
  ];

  const { queryString } = useQueryString();

  useEffect(() => {
    if (!isEmpty(queryString)) {
      const { service } = queryString;
      if (!isEmpty(service) && !snapDetailService) {
        setServiceId(service);
        setSnapDetailService(true);
      }
    }
  }, [queryString]);

  useEffect(() => () => cleanData(), []);

  useEffect(() => {
    cleanData();
    if (salonId) {
      getSalonDetail({ salonId });
      setBooking(getServicesBookingLS(salonId));
    }
  }, [salonId]);

  useDidUpdateEffect(() => {
    if (salonId) {
      getSalonDetail({ salonId });
    }
  }, [authenticated]);

  useEffect(() => {
    if (!isEmpty(salonDetail.cats)) {
      setCategorySelect(salonDetail.cats[0]);
    }
    if (!isEmpty(salonDetail) && !salonDetail.open) {
      history.push(path.home);
    }
  }, [salonDetail]);

  useEffect(() => {
    if (bookingSuccess) {
      setBooking([]);
    }
  }, [bookingSuccess]);

  const showServiceDetail = (service, showOption = false) => {
    if (showOption) {
      if (authenticated) {
        setServiceId(service.id);
        setOnlyOption(showOption);
      } else {
        showSignInDialog();
      }
    } else {
      setServiceId(service.id);
    }
  };

  const closeServiceDetail = useCallback(() => {
    setServiceId();
    setOnlyOption(false);
  }, []);

  const handleFavoriteSalon = () => {
    if (authenticated) {
      favoriteSalon({ salonId });
    } else {
      showSignInDialog();
    }
  };

  const handleFavoriteCollection = collectionId => {
    if (authenticated) {
      favoriteCollection({ collectionId });
    } else {
      showSignInDialog();
    }
  };

  const handleWriteReviewSalon = () => {
    if (authenticated) {
      showReviewForm();
    } else {
      showSignInDialog();
    }
  };

  const handleBooking = (isBooking, service, option) => {
    if (authenticated) {
      if (isBooking) {
        removeBooking(service);
      } else {
        addBookingService(service, option);
      }
    } else {
      showSignInDialog();
    }
  };

  const addBookingService = (service, option) => {
    const serviceBooking = createServiceBookingLS(service, option);
    addServiceBookingLS(salonId, serviceBooking);
    setBooking([...booking, serviceBooking]);
  };

  const removeBooking = service => {
    removeServiceBookingLS(salonId, service.id);
    const bookingRest = booking.filter(item => item.id !== service.id);
    setBooking([...bookingRest]);
  };

  const goToBookingPage = () => {
    if (!isEmpty(salonId) && !isEmpty(booking)) {
      addBookingInfoLS(salonId, {
        salonId,
        url: match.url,
        step: 0,
      });
      history.push(createPath(path.booking, { salonId }));
    }
  };

  const goToHomePage = useCallback(() => {
    history.push(path.bookingHome);
  }, []);

  const rightButtons = useMemo(
    () => [
      <IconButton
        size="medium"
        color="inherit"
        onClick={goToHomePage}
        key={shortid.generate()}
      >
        <HomeIcon color="#fff" />
      </IconButton>,
    ],
    [],
  );

  return (
    <BasePageView
      header={
        <Navigation
          color="primary"
          className={classes.navigation}
          title={salonDetail.name}
          rightButtons={rightButtons}
        />
      }
      getHeaderHeight={height => setHeaderHeight(height)}
    >
      <DocumentHead
        title={salonDetail.name}
        description={salonDetail.info}
        image={salonDetail.cover}
      />
      <div className={classes.wrapper}>
        <div className={globalStyle.container}>
          {!isEmpty(salonDetail) ? (
            <>
              <Gallery
                data={salonDetail.slides}
                name={salonDetail.name}
                verified={salonDetail.verified}
              />
              <Summary
                data={salonDetail}
                onFavorite={handleFavoriteSalon}
                onShowReviewForm={handleWriteReviewSalon}
              />
              <Divider />
              <Info
                name={salonDetail.name}
                verified={salonDetail.verified}
                address={salonDetail.address}
                info={salonDetail.info}
                workDays={salonDetail.workDays}
                workTimes={salonDetail.workTimes}
                onShowMap={() => setShowMap(true)}
              />
              <GroupTab tabs={tabs} headerHeight={headerHeight} />
              <AvaliableService
                ref={serviceRef}
                data={salonDetail.cats}
                selected={categorySelect}
                onSelect={item => {
                  setCategorySelect(item);
                }}
              />
            </>
          ) : (
            <SalonDetailPlaceHolder />
          )}
          {!isEmpty(salonDetail) && (
            <>
              <Grid container justify="center" className={classes.group}>
                <Grid item sm={11} md={8} container direction="column">
                  <Grid item xs>
                    <ServiceList
                      showDetail={showServiceDetail}
                      onBooking={handleBooking}
                      services={categorySelect.services}
                      booking={booking}
                    />
                  </Grid>
                  {!isEmpty(salonDetail.showcase) && (
                    <Grid item xs>
                      <Collection
                        ref={collectionRef}
                        data={salonDetail.showcase}
                        onFavorite={handleFavoriteCollection}
                      />
                    </Grid>
                  )}
                  {!isEmpty(salonDetail.stylists) && (
                    <Grid item xs>
                      <StyleList data={salonDetail.stylists} />
                    </Grid>
                  )}
                  {!isEmpty(salonDetail.brands) && (
                    <Grid item xs>
                      <UseBrand data={salonDetail.brands} />
                    </Grid>
                  )}
                  {!isEmpty(salonDetail.reviews) && (
                    <Grid item xs ref={reviewRef}>
                      <BookingReview
                        rating={salonDetail.rating}
                        ratingCount={salonDetail.ratingCount}
                        variant="salon"
                        id={salonDetail.id}
                      />
                    </Grid>
                  )}
                </Grid>
                {!isMobileOnly && !isEmpty(booking) && (
                  <Grid item xs={11} md={10}>
                    <Booking booking={booking} onNext={goToBookingPage} />
                  </Grid>
                )}
              </Grid>
              {isMobileOnly && !isEmpty(booking) && (
                <Booking booking={booking} onNext={goToBookingPage} />
              )}
            </>
          )}
          <SalonServiceDetail
            serviceId={serviceId}
            booking={booking}
            onSelectService={handleBooking}
            onClosed={closeServiceDetail}
            onlyOption={onlyOption}
          />
          <Map
            open={showMap}
            onClose={() => setShowMap(false)}
            salon={salonDetail}
          />
          <RelatedSalons salons={salonDetail.related} />
        </div>
      </div>
    </BasePageView>
  );
}

SalonDetail.propTypes = {
  match: PropTypes.any,
  salonDetail: PropTypes.object,
  getSalonDetail: PropTypes.func,
  favoriteSalon: PropTypes.func,
  favoriteCollection: PropTypes.func,
  showReviewForm: PropTypes.func,
  cleanData: PropTypes.func,
  bookingSuccess: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  salonDetail: makeSelectSalonDetail(),
  bookingSuccess: makeSelectBookingSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSalonDetail: payload => dispatch(getRequest(payload)),
    favoriteSalon: payload => dispatch(favoriteRequest(payload)),
    favoriteCollection: payload => dispatch(favoriteCollectionRequest(payload)),
    showReviewForm: () => dispatch(showReviewFormAction(true)),
    cleanData: payload => dispatch(cleanDataAction(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SalonDetail);
