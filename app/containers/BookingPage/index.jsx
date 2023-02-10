/**
 *
 * BookingPage
 *
 */

import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import get from 'lodash/get';

import Stepper from 'components/Stepper';
import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import DocumentHead from 'components/DocumentHead';
import RequireEnterInfo from 'containers/RequireEnterInfo';
import styles from 'assets/styles';

import {
  getSalonBookingLS,
  addBookingInfoLS,
  removeSalonBookingLS,
} from 'utils/localStorage/booking';
import { isAuthenticated, needUpdateEmail } from 'utils/auth';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useWallet } from 'utils/hooks';
import { useInjectLoading } from 'utils/injectLoading';
import { isMobileOnly, isNative } from 'utils/platform';
import calendar from 'utils/calendar';

import { bookingSuccessAction } from 'containers/SalonDetail/actions';
import AlertDialog from 'components/AlertDialog';

import { CONTEXT, LOADING_ACTIONS } from './constants';
import {
  getBookingItemsRequest,
  getSalonInfoRequest,
  getSalonOpenTimeRequest,
  changeQuantityAction,
  removeServiceAction,
  addBookingRequest,
  prePayBookingCoinRequest,
} from './actions';
import {
  makeSelectBookingItems,
  makeSelectSalonInfo,
  makeSelectSalonOpenTime,
  makeSelectBookingCoin,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import { StepOne, StepTwo, StepThree } from './views';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: isMobileOnly
      ? '#cccccc'
      : theme.palette.backgroundColor[7],
    padding: isMobileOnly ? theme.spacing(4) : theme.spacing(8, 0),
    flexGrow: 1,
  },
  title: {},
  stepper: {
    padding: isMobileOnly ? theme.spacing(4, 0) : theme.spacing(6),
  },
}));

const steps = [
  {
    id: 0,
    label: 'Thông tin dịch vụ',
    caption: 'Chọn cho mình thời gian hợp lý nhất.',
    title: 'Xác nhận thông tin',
  },
  {
    id: 1,
    label: 'Phương thức thanh toán',
    caption: 'Chọn cho mình một phương thức thanh toán phù hợp nhất.',
    title: 'Phương thức thanh toán',
  },
  {
    id: 2,
    label: 'Đặt chỗ hoàn tất!',
    caption: 'Quá trình đặt chỗ hoàn tất',
    title: 'Đặt chỗ thành công',
  },
];

export function BookingPage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTIONS);

  const globalStyle = styles();
  const classes = useStyle();
  const history = useHistory();

  const {
    match,
    bookingItems,
    getBookingItems,
    salonInfo,
    getSalonInfo,
    salonOpenTime,
    getSalonOpenTime,
    changeQuantity,
    removeService,
    addBooking,
    onBookingSuccess,
    bookingCoin,
    prePayBookingCoin,
  } = props;

  const bookingSalonId = get(match, 'params.salonId');

  const { wallet, needUpdateWallet } = useWallet();
  const showCaptionSteper = useMediaQuery(theme => theme.breakpoints.up('md'));

  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [bookingInfo, setBookingInfo] = useState(
    getSalonBookingLS(bookingSalonId),
  );
  const [spendMaxCoin, setSpendMaxCoin] = useState(false);
  const [requireEmail, setRequireEmail] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (!isEmpty(bookingInfo) && isAuthenticated()) {
      const { salonId, services } = bookingInfo;
      getBookingItems({ salonId, items: services });
      getSalonInfo({ salonId });
      getSalonOpenTime({ salonId });
    } else {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (currentStep.id === 1 && wallet.amountCoin > 0) {
      prePayBookingCoin({ spendMaxCoin: true });
    }
  }, [currentStep, bookingItems, wallet]);

  const handleSelectedTime = useCallback(dateTime => {
    const { salonId } = bookingInfo;
    addBookingInfoLS(salonId, dateTime);
    setBookingInfo({ ...bookingInfo, ...dateTime });
  }, []);

  const nextStepTwo = useCallback(() => {
    const { date, time } = bookingInfo;
    if (date && time) {
      gotoStep();
    }
  }, [bookingInfo]);

  const nextStepThree = useCallback(() => {
    addBooking({
      bookingInfo,
      bookingItems,
      spendMaxCoin,
      success: response => {
        gotoStep();
        removeCurrentBooking();
        if (spendMaxCoin) {
          needUpdateWallet();
        }
        if (isNative) {
          calendar.addEvent(response);
        }
      },
      failure: err => {
        const msg = get(
          err,
          'response.data.message',
          'Đã có lỗi xảy ra, vui lòng thử lại sau.',
        );
        setAlertMessage(msg);
        setOpenAlert(true);
      },
    });
  }, [bookingInfo, spendMaxCoin]);

  const removeCurrentBooking = useCallback(() => {
    removeSalonBookingLS(bookingSalonId);
    onBookingSuccess();
  }, []);

  const handlePaymentMethod = useCallback(
    payment => {
      setBookingInfo({ ...bookingInfo, payment });
    },
    [bookingInfo],
  );

  const gotoStep = useCallback(
    (next = true) => {
      const { salonId } = bookingInfo;
      const stepIndex = currentStep.id + (next ? 1 : -1);
      const nextStep = steps.find(item => item.id === stepIndex);
      setCurrentStep(nextStep);
      addBookingInfoLS(salonId, { step: nextStep.id });
    },
    [bookingInfo],
  );

  const handlePrePayBookingCoin = useCoin => {
    setSpendMaxCoin(useCoin);
  };

  const backButtonProps = useMemo(
    () => ({
      icon: 'close',
    }),
    [],
  );

  const handleCloseRequireEmail = useCallback(() => {
    setRequireEmail(false);
  }, []);

  const handleCheckingProfileEmail = () => {
    if (needUpdateEmail()) {
      setRequireEmail(true);
    } else {
      nextStepThree();
    }
  };

  const handleUpdateSuccess = () => {
    handleCloseRequireEmail();
    nextStepThree();
  };

  const handleOnCloseAlert = React.useCallback(() => {
    setOpenAlert(false);
  }, []);

  return (
    <BasePageView
      header={
        <Navigation
          title={currentStep.title}
          backButtonProps={backButtonProps}
        />
      }
    >
      <DocumentHead
        title={`${currentStep.label} - Đặt chỗ`}
        description={`${currentStep.label} - Đặt chỗ`}
      />
      <div className={classes.wrapper}>
        <div className={globalStyle.container}>
          <Grid container spacing={4}>
            {!isMobileOnly && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h2" className={classes.title}>
                    Đặt chỗ
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {!isEmpty(bookingInfo) && currentStep && (
                    <Stepper
                      className={classes.stepper}
                      activeStep={currentStep}
                      steps={steps}
                      linear={isMobileOnly}
                      showCaption={!isMobileOnly && showCaptionSteper}
                    />
                  )}
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              {!isEmpty(bookingInfo) && currentStep && currentStep.id === 0 && (
                <StepOne
                  salonInfo={salonInfo}
                  bookingInfo={bookingInfo}
                  openTime={salonOpenTime}
                  bookingItems={bookingItems}
                  onSelectedDateTime={handleSelectedTime}
                  onChangeQuantity={changeQuantity}
                  onRemoveService={removeService}
                  onNextStep={nextStepTwo}
                />
              )}
              {!isEmpty(bookingInfo) && currentStep && currentStep.id === 1 && (
                <StepTwo
                  salonInfo={salonInfo}
                  bookingInfo={bookingInfo}
                  bookingItems={bookingItems}
                  onBackStep={() => gotoStep(false)}
                  onNextStep={handleCheckingProfileEmail}
                  onSelectPaymentMethod={handlePaymentMethod}
                  spendMaxCoin={spendMaxCoin}
                  onApplyUseCoin={handlePrePayBookingCoin}
                  bookingCoin={bookingCoin}
                  wallet={wallet}
                />
              )}
              {!isEmpty(bookingInfo) && currentStep && currentStep.id === 2 && (
                <StepThree
                  salonInfo={salonInfo}
                  bookingInfo={bookingInfo}
                  bookingItems={bookingItems}
                  bookingCoin={bookingCoin}
                  spendMaxCoin={spendMaxCoin}
                />
              )}
            </Grid>
          </Grid>
        </div>
        <RequireEnterInfo
          acceptLabel="Đặt chỗ"
          open={requireEmail}
          onClose={handleCloseRequireEmail}
          onDidUpdateSuccess={handleUpdateSuccess}
        />
      </div>
      <AlertDialog
        open={openAlert}
        onCancel={handleOnCloseAlert}
        buttonCancelLabel="Đóng"
        description={alertMessage}
      />
    </BasePageView>
  );
}

BookingPage.propTypes = {
  match: PropTypes.any,
  bookingItems: PropTypes.object,
  getBookingItems: PropTypes.func,
  salonInfo: PropTypes.object,
  getSalonInfo: PropTypes.func,
  salonOpenTime: PropTypes.object,
  getSalonOpenTime: PropTypes.func,
  changeQuantity: PropTypes.func,
  removeService: PropTypes.func,
  addBooking: PropTypes.func,
  onBookingSuccess: PropTypes.func,
  bookingCoin: PropTypes.object,
  prePayBookingCoin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  bookingItems: makeSelectBookingItems(),
  salonInfo: makeSelectSalonInfo(),
  salonOpenTime: makeSelectSalonOpenTime(),
  bookingCoin: makeSelectBookingCoin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getBookingItems: payload => dispatch(getBookingItemsRequest(payload)),
    getSalonInfo: payload => dispatch(getSalonInfoRequest(payload)),
    getSalonOpenTime: payload => dispatch(getSalonOpenTimeRequest(payload)),
    changeQuantity: payload => dispatch(changeQuantityAction(payload)),
    removeService: payload => dispatch(removeServiceAction(payload)),
    addBooking: payload => dispatch(addBookingRequest(payload)),
    onBookingSuccess: () => dispatch(bookingSuccessAction()),
    prePayBookingCoin: payload => dispatch(prePayBookingCoinRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BookingPage);
