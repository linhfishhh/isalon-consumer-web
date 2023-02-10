/**
 *
 * TopSalons
 *
 */

import React, { memo, useEffect } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';

import { path } from 'routers/path';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import BlockContent from 'components/BlockContent';
import Slideshow from 'components/Slideshow';
import SalonItem from 'components/SalonItem';
import CollectionView from 'components/CollectionView';
import SalonPlaceHolder from 'components/Placeholder/SalonPlaceHolder';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { viewTypes, unitSearch } from 'utils/enums';
import { filterToQueryString } from 'utils/searchHelper';
import {
  useBreakpointValues,
  useCurrentLocation,
  useAuthentication,
  useDidUpdateEffect,
} from 'utils/hooks';

import reducer from './reducer';
import saga from './saga';
import { CONTEXT, TOP_SALONS_NEAR_ME, TOP_SALONS_TOP_TEN } from './constants';
import {
  getSalonsNearMeRequest,
  getTopSalonsRequest,
  updateLatestLocationAction,
} from './actions';
import {
  makeSelectSalonsNearMe,
  makeSelectTopSalons,
  makeSelectLatestLocation,
} from './selectors';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: isMobileOnly ? 0 : theme.spacing(1.5),
    padding: isMobileOnly ? theme.spacing(2, 0) : theme.spacing(8),
    backgroundColor: isMobileOnly
      ? 'inherit'
      : theme.palette.background.default,
  },
  viewAll: {
    color: theme.palette.secondary.main,
    padding: isMobileOnly ? theme.spacing(0.5, 1) : theme.spacing(1, 3),
    backgroundColor: theme.palette.backgroundColor[1],
    borderRadius: 16,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  item: {
    width: isMobileOnly ? 'auto' : '246px !important',
    marginRight: isMobileOnly ? 0 : theme.spacing(4),
  },
}));

function TopSalons(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const { authenticated } = useAuthentication();
  const { currentLocation } = useCurrentLocation();
  const { position, province } = currentLocation;

  const classes = useStyle();
  const history = useHistory();
  const slidesToScroll = useBreakpointValues({ xs: 2, md: 4 });

  const {
    salonsNearMe,
    getSalonsNearMe,
    type = TOP_SALONS_NEAR_ME,
    getTopSalons,
    topSalons,
    viewAllStyle,
    latestLocation,
    updateLatestLocation,
  } = props;

  const fetchDataSalonNearMe = (forceUpdate = false) => {
    if (position && type === TOP_SALONS_NEAR_ME) {
      const { position: latestPosition } = latestLocation;
      if (
        forceUpdate ||
        isEmpty(latestPosition) ||
        !isEqual(latestPosition, position)
      ) {
        getSalonsNearMe();
        updateLatestLocation({ position });
      }
    }
  };

  const fetchDataTopSalon = (forceUpdate = false) => {
    if (province && type === TOP_SALONS_TOP_TEN) {
      const { province: latestProvince } = latestLocation;
      if (
        forceUpdate ||
        isEmpty(latestProvince) ||
        !isEqual(latestProvince, province)
      ) {
        getTopSalons({ province });
        updateLatestLocation({ province });
      }
    }
  };

  useDidUpdateEffect(() => {
    fetchDataSalonNearMe(true);
    fetchDataTopSalon(true);
  }, [authenticated]);

  useEffect(() => {
    fetchDataSalonNearMe();
  }, [position]);

  useEffect(() => {
    fetchDataTopSalon();
  }, [province]);

  const salons = type === TOP_SALONS_NEAR_ME ? salonsNearMe : topSalons;

  const title = React.useMemo(() => {
    if (type === TOP_SALONS_NEAR_ME) {
      return 'SALON GẦN TÔI';
    }
    if (type === TOP_SALONS_TOP_TEN) {
      return `TOP SALON TẠI ${province ? province.name : ''}`.toUpperCase();
    }
    return '';
  }, [province]);

  const renderItem = React.useCallback(
    item => (
      <div key={shortid.generate()} className={classes.item}>
        {isEmpty(item) ? <SalonPlaceHolder /> : <SalonItem data={item} />}
      </div>
    ),
    [],
  );

  const viewAllComp = React.useMemo(() => {
    const handleViewAll = () => {
      const params = {
        provinces: [province],
        unit: unitSearch.types[1],
      };
      if (type === TOP_SALONS_NEAR_ME) {
        const viewType = viewTypes.types[2];
        params.viewType = viewType;
        history.push(path.bookingSearch + filterToQueryString(params));
      } else if (type === TOP_SALONS_TOP_TEN) {
        history.push(path.bookingSearch + filterToQueryString(params));
      }
    };
    return (
      <Button
        component="button"
        className={classes.viewAll}
        onClick={handleViewAll}
        style={viewAllStyle}
      >
        Tất cả
      </Button>
    );
  }, [province]);

  const placeholders = React.useMemo(
    () => [...Array(isMobileOnly ? 3 : 5)],
    [],
  );

  return (
    <BlockContent
      className={classes.wrapper}
      title={title}
      endAdornmentTitle={viewAllComp}
    >
      {isMobileOnly ? (
        <CollectionView
          items={salons && salons.length > 0 ? salons : placeholders}
          renderItem={renderItem}
        />
      ) : (
        <Slideshow
          items={salons && salons.length > 0 ? salons : placeholders}
          variableWidth
          className="slide variable-width"
          slidesToScroll={slidesToScroll}
          renderItem={renderItem}
        />
      )}
    </BlockContent>
  );
}

TopSalons.propTypes = {
  salonsNearMe: PropTypes.array,
  getSalonsNearMe: PropTypes.func,
  getTopSalons: PropTypes.func,
  topSalons: PropTypes.array,
  type: PropTypes.string,
  viewAllStyle: PropTypes.object,
  latestLocation: PropTypes.object,
  updateLatestLocation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  salonsNearMe: makeSelectSalonsNearMe(),
  topSalons: makeSelectTopSalons(),
  latestLocation: makeSelectLatestLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSalonsNearMe: () => dispatch(getSalonsNearMeRequest()),
    getTopSalons: payload => dispatch(getTopSalonsRequest(payload)),
    updateLatestLocation: payload =>
      dispatch(updateLatestLocationAction(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TopSalons);
