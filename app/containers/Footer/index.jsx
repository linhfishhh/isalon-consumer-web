import React, { memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import styles from 'assets/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectTopCities } from 'containers/BookingHomePage/selectors';

import { useGlobalConfig, useSearchConfig } from 'utils/hooks';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectBecomeSalonManagerCfg } from 'containers/BecomeSalonManager/selectors';
import reducer from 'containers/BecomeSalonManager/reducer';
import saga from 'containers/BecomeSalonManager/saga';
import { getBecomeSalonManagerCfgRequest } from 'containers/BecomeSalonManager/actions';
import { CONTEXT } from 'containers/BecomeSalonManager/constants';

import homeBookingReducer from 'containers/BookingHomePage/reducer';
import homeBookingSaga from 'containers/BookingHomePage/saga';
import { getTopCitiesRequest } from 'containers/BookingHomePage/actions';
import { CONTEXT as HOME_BOOKING_CTX } from 'containers/BookingHomePage/constants';
import isEmpty from 'lodash/isEmpty';

import Img from 'components/Img';
import boCongThuong from 'assets/images/dkbct.png';

import TopFooter from './TopFooter';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    backgroundColor: theme.palette.backgroundColor[3],
    height: 70,
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 123,
  },
  text: {
    color: theme.palette.textColor[5],
  },
}));

function Footer(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectReducer({ key: HOME_BOOKING_CTX, reducer: homeBookingReducer });
  useInjectSaga({ key: HOME_BOOKING_CTX, saga: homeBookingSaga });

  const {
    mngConfig,
    getBecomeSalonManagerCfg,
    topCities,
    getTopCities,
  } = props;
  const classes = useStyles();
  const globalStyle = styles();

  const { globalConfig } = useGlobalConfig();
  const { searchConfig } = useSearchConfig();
  const serviceCategories = useMemo(() => searchConfig.cats, [searchConfig]);

  useEffect(() => {
    if (isEmpty(mngConfig)) {
      getBecomeSalonManagerCfg();
    }
    if (isEmpty(topCities)) {
      getTopCities();
    }
  }, []);

  return (
    <>
      <TopFooter
        serviceCategories={serviceCategories}
        mngConfig={mngConfig}
        topCities={topCities}
      />
      <div className={classes.footerWrapper}>
        <Grid container className={globalStyle.container} alignItems="center">
          <Grid item xs>
            <Typography className={classes.text}>
              {`${globalConfig.theme_master_copyright ||
                ''} | Bản quyền thuộc về Công ty TNHH Đầu tư Công
              nghệ Salon`}
            </Typography>
          </Grid>
          <Grid item className={classes.footerItem}>
            <a
              href="http://online.gov.vn/Home/WebDetails/49803"
              title="Đã đăng ký Bộ Công Thương"
              target="_blank"
            >
              <Img
                resizeMode="contain"
                className={classes.image}
                src={boCongThuong}
                alt="Đã đăng ký Bộ Công Thương"
              />
            </a>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

Footer.propTypes = {
  mngConfig: PropTypes.object,
  getBecomeSalonManagerCfg: PropTypes.func,
  getTopCities: PropTypes.func,
  topCities: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  mngConfig: makeSelectBecomeSalonManagerCfg(),
  topCities: makeSelectTopCities(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getBecomeSalonManagerCfg: () => dispatch(getBecomeSalonManagerCfgRequest()),
    getTopCities: () => dispatch(getTopCitiesRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Footer);
