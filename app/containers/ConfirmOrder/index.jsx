/**
 *
 * ConfirmOrder
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isMobileOnly } from 'utils/platform';
import { useWallet } from 'utils/hooks';
import { needUpdateEmail } from 'utils/auth';
import useGlobalStyles from 'assets/styles';

import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import DocumentHead from 'components/DocumentHead';

import ProductCategories from 'containers/ProductCategories';
import RequireEnterInfo from 'containers/RequireEnterInfo';
import {
  makeSelectMyAddresses,
  makeSelectMyDefaultAddress,
} from 'containers/AddressBook/selectors';
import { getMyAddressesRequest } from 'containers/AddressBook/actions';
import addressBookSaga from 'containers/AddressBook/saga';
import addressBookReducer from 'containers/AddressBook/reducer';
import { CONTEXT as ADDRESS_BOOK_CONTEXT } from 'containers/AddressBook/constants';
import OrderDetail from 'containers/OrderDetail';

import { path } from 'routers/path';

import { useInjectLoading } from 'utils/injectLoading';
import {
  makeSelectOrder,
  makeSelectAddress,
  makeSelectOrderSuccess,
} from './selectors';
import {
  prePayRequest,
  selectAddress as selectAddressAction,
  payRequest,
  clearState as clearStateAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { CONTEXT, LOADING_ACTIONS } from './constants';
import MainContent from './views/MainContent';
import ConfirmationInfo from './views/ConfirmationInfo';

const useStyles = makeStyles(theme => ({
  base: {
    background: '#F2F2F2',
  },
  root: {
    padding: theme.spacing(4),
  },
  title: {
    fontSize: 24,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  cartConfirmPanel: {
    maxWidth: isMobileOnly ? '100%' : 380,
  },
}));

function ConfirmOrder(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectReducer({ key: ADDRESS_BOOK_CONTEXT, reducer: addressBookReducer });
  useInjectSaga({ key: ADDRESS_BOOK_CONTEXT, saga: addressBookSaga });

  useInjectLoading(LOADING_ACTIONS);

  const classes = useStyles();
  const {
    order,
    location,
    prePay,
    getMyAddresses,
    addresses,
    selectAddress,
    dispatch,
    selectedAddress,
    orderSuccess,
    pay,
    clearState,
    defaultAddress,
  } = props;

  const history = useHistory();
  const { wallet, needUpdateWallet } = useWallet();
  const [openOrderSuccess, setOpenOrderSuccess] = useState(false);
  const [currentGiftCode, setCurrentGiftCode] = useState();
  const [spendMaxCoin, setSpendMaxCoin] = useState(false);
  const [requireEmail, setRequireEmail] = useState(false);
  const globalStyles = useGlobalStyles();

  useEffect(() => {
    selectAddress(defaultAddress);
    return () => {
      clearState();
    };
  }, []);

  useEffect(() => {
    if (!isEmpty(wallet) && !orderSuccess) {
      const giftCode = get(location, 'state.giftCode');
      setCurrentGiftCode(isEmpty(giftCode) ? '' : giftCode);
      prePay({
        ...location.state,
        address: selectedAddress,
        locationChanged:
          selectedAddress === undefined ||
          selectedAddress.addressId === undefined,
        spendMaxCoin,
      });
    }
  }, [wallet, spendMaxCoin, selectedAddress]);

  useEffect(() => {
    setOpenOrderSuccess(orderSuccess);
    if (spendMaxCoin) {
      needUpdateWallet();
    }
  }, [orderSuccess]);

  const onApplyGiftCode = giftCode => {
    const request = {
      ...location.state,
      address: selectedAddress,
      spendMaxCoin,
      giftCode,
    };
    setCurrentGiftCode(giftCode);
    prePay(request);
  };

  const onApplyUseCoin = useCallback(useCoin => {
    setSpendMaxCoin(useCoin);
  }, []);

  const handleSelectedAddress = useCallback(newAddress => {
    selectAddress(newAddress);
  }, []);

  const onPay = () => {
    const request = {
      ...location.state,
      address: selectedAddress,
      giftCode: currentGiftCode,
      spendMaxCoin,
    };
    pay(request);
  };

  const handleCloseOrderDetail = useCallback(() => {
    history.replace(path.productHome);
  }, []);

  const handleCloseRequireEmail = useCallback(() => {
    setRequireEmail(false);
  }, []);

  const handleCheckingProfileEmail = () => {
    if (needUpdateEmail()) {
      setRequireEmail(true);
    } else {
      onPay();
    }
  };

  const handleUpdateSuccess = () => {
    handleCloseRequireEmail();
    onPay();
  };

  return (
    <BasePageView
      className={classes.base}
      header={<Navigation color="primary" title="Xác nhận đơn hàng" />}
    >
      <DocumentHead title="Xác nhận đơn hàng" description="Xác nhận đơn hàng" />
      <div className={classes.base}>
        {!isMobileOnly && <ProductCategories dispatch={dispatch} />}
        <div className={`${classes.root} ${globalStyles.container}`}>
          {!isMobileOnly && (
            <Typography className={classes.title}>Xác nhận đơn hàng</Typography>
          )}
          <Grid container spacing={2}>
            {order && (
              <>
                <Grid item xs>
                  <MainContent order={order} />
                </Grid>
                <Grid item className={classes.cartConfirmPanel}>
                  <ConfirmationInfo
                    order={order}
                    address={selectedAddress}
                    addresses={addresses}
                    dispatch={dispatch}
                    onSelectAddress={handleSelectedAddress}
                    onApplyGiftCode={onApplyGiftCode}
                    onPay={handleCheckingProfileEmail}
                    giftCode={currentGiftCode}
                    spendMaxCoin={spendMaxCoin}
                    onApplyUseCoin={onApplyUseCoin}
                    wallet={wallet}
                    getMyAddresses={getMyAddresses}
                  />
                </Grid>
              </>
            )}
          </Grid>
          {order && (
            <OrderDetail
              open={openOrderSuccess}
              orderId={get(order, 'orderId')}
              onClose={handleCloseOrderDetail}
              orderSuccess
            />
          )}
        </div>
        <RequireEnterInfo
          open={requireEmail}
          onClose={handleCloseRequireEmail}
          onDidUpdateSuccess={handleUpdateSuccess}
        />
      </div>
    </BasePageView>
  );
}

ConfirmOrder.propTypes = {
  order: PropTypes.object,
  selectedAddress: PropTypes.object,
  prePay: PropTypes.func,
  location: PropTypes.any,
  getMyAddresses: PropTypes.func,
  addresses: PropTypes.array,
  selectAddress: PropTypes.func,
  dispatch: PropTypes.func,
  orderSuccess: PropTypes.bool,
  pay: PropTypes.func,
  clearState: PropTypes.func,
  defaultAddress: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  order: makeSelectOrder(),
  selectedAddress: makeSelectAddress(),
  addresses: makeSelectMyAddresses(),
  orderSuccess: makeSelectOrderSuccess(),
  defaultAddress: makeSelectMyDefaultAddress(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    prePay: data => dispatch(prePayRequest(data)),
    pay: data => dispatch(payRequest(data)),
    selectAddress: address => dispatch(selectAddressAction(address)),
    getMyAddresses: () => dispatch(getMyAddressesRequest()),
    clearState: () => dispatch(clearStateAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ConfirmOrder);
