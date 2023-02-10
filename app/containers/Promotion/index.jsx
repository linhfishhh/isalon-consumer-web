/**
 *
 * Promotion
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import BasePageView from 'components/BasePageView';
import AreaSafe from 'components/AreaSafe';

import { path } from 'routers/path';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isAuthenticated, getLoggedInUser } from 'utils/auth';

import { getPromotionRequest } from './actions';
import { CONTEXT } from './constants';
import { makeSelectPromotion, makeSelectBanners } from './selectors';
import reducer from './reducer';
import saga from './saga';

import Header from './views/Header';
import ListBanner from './views/ListBanner';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(4),
  },
  title: {},
  subTitle: {
    marginTop: theme.spacing(2),
    color: theme.palette.grey[500],
  },
  username: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

export function Promotion(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  // eslint-disable-next-line no-unused-vars
  const { promotion, banners, getPromotion } = props;
  const user = getLoggedInUser();
  const classes = useStyles();
  const history = useHistory();
  const authenticated = isAuthenticated();

  const fetchData = () => {
    getPromotion();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goToAccountTab = () => {
    history.push(path.account);
  };

  return (
    <BasePageView contentProps={{ onRefresh: fetchData }} header={<AreaSafe />}>
      <Grid container direction="column">
        <Grid item className={classes.header}>
          <Header
            authenticated={authenticated}
            user={user}
            goToAccountTab={goToAccountTab}
          />
        </Grid>
        <Grid item>
          <ListBanner banners={banners} />
        </Grid>
      </Grid>
    </BasePageView>
  );
}

Promotion.propTypes = {
  promotion: PropTypes.object,
  banners: PropTypes.array,
  getPromotion: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  promotion: makeSelectPromotion(),
  banners: makeSelectBanners(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPromotion: () => dispatch(getPromotionRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Promotion);
