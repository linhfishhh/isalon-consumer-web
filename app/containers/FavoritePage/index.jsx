/**
 *
 * FavoritePage
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Typography,
  Divider,
  Tab,
  Tabs as MuiTabs,
} from '@material-ui/core';

import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import DocumentHead from 'components/DocumentHead';
import Tabs from 'components/Tabs';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  makeSelectFavoritedSalons,
  makeSelectFavoritedShowcases,
  makeSelectFavoritedProducts,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getFavoritedSalonsRequest,
  removeFavoritedSalonRequest,
  removeFavoritedShowcaseRequest,
  getFavoritedProductsRequest,
  removeFavoritedProductRequest,
} from './actions';
import { CONTEXT } from './constants';
import FavoritedSalonTable from './views/FavoritedSalonTable';
import ShowcaseTable from './views/ShowcaseTable';
import FavoritedProductTable from './views/FavoritedProductTable';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f3f3f4',
    padding: isMobileOnly ? 0 : theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper_root: {
    width: '100%',
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      width: '90%',
      padding: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      width: '70%',
    },
    minHeight: isMobileOnly ? '100%' : 400,
    backgroundColor: '#fff',
  },
  title_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
    fontWeight: 'bold',
  },
  normal_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
  },
  detail_text: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  view_more: {
    width: '100%',
    height: 40,
    fontWeight: 'normal',
    marginTop: theme.spacing(4),
  },
}));

const tabs = [
  {
    id: 0,
    title: 'Salon',
  },
  {
    id: 1,
    title: 'Sản phẩm',
  },
  {
    id: 2,
    title: 'Tác phẩm',
  },
];

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(MuiTabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

function FavoritePage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles();

  const {
    salons,
    showcases,
    products,
    getFavoritedSalons,
    removeFavoritedSalon,
    removeFavoritedShowcase,
    getFavoritedProducts,
    removeFavoritedProduct,
  } = props;

  useEffect(() => {
    getFavoritedSalons();
    getFavoritedProducts({ page: 0 });
  }, []);

  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = tab => {
    setCurrentTab(tab.id);
  };

  const onRemoveFavoritedSalon = useCallback(favId => {
    removeFavoritedSalon({ id: favId });
  }, []);

  const onRemoveFavoritedShowcase = useCallback(favId => {
    removeFavoritedShowcase({ id: favId });
  }, []);

  const onRemoveFavoritedProduct = useCallback(productId => {
    removeFavoritedProduct({ productId });
  }, []);

  const onLoadMoreFavoritedProducts = () => {
    const { currentPage = 0 } = products;
    getFavoritedProducts({ page: currentPage + 1 });
  };

  return (
    <BasePageView
      header={
        <>
          <Navigation title="Yêu thích" color="primary" />
          <Tabs
            items={tabs}
            renderLabel={item => item.title}
            onChanged={handleChangeTab}
            centered
          />
        </>
      }
      contentProps={{
        cornerRadiusColor: 'primary',
      }}
    >
      <DocumentHead title="Yêu thích" description="Yêu thích" />
      <div className={classes.root}>
        <Paper className={classes.paper_root} elevation={0}>
          <Grid container direction="column">
            {!isMobileOnly && (
              <Grid item xs>
                <Typography variant="h5" className={classes.title_text}>
                  YÊU THÍCH
                </Typography>
                <Divider className={classes.divider} />
              </Grid>
            )}
            {!isMobileOnly && (
              <Grid item xs>
                <AntTabs
                  value={currentTab}
                  onChange={(e, v) => setCurrentTab(v)}
                  aria-label=""
                >
                  <AntTab label="Salon" />
                  <AntTab label="Sản phẩm" />
                  <AntTab label="Tác phẩm" />
                </AntTabs>
              </Grid>
            )}
            <Grid item xs>
              {currentTab === 0 ? (
                <FavoritedSalonTable
                  data={salons}
                  onRemove={onRemoveFavoritedSalon}
                />
              ) : null}
              {currentTab === 1 ? (
                <FavoritedProductTable
                  data={products}
                  onRemove={onRemoveFavoritedProduct}
                  loadMore={onLoadMoreFavoritedProducts}
                />
              ) : null}
              {currentTab === 2 ? (
                <ShowcaseTable
                  data={showcases}
                  onRemove={onRemoveFavoritedShowcase}
                />
              ) : null}
            </Grid>
          </Grid>
        </Paper>
      </div>
    </BasePageView>
  );
}

FavoritePage.propTypes = {
  salons: PropTypes.array,
  showcases: PropTypes.array,
  products: PropTypes.array,
  getFavoritedSalons: PropTypes.func,
  removeFavoritedSalon: PropTypes.func,
  removeFavoritedShowcase: PropTypes.func,
  getFavoritedProducts: PropTypes.func,
  removeFavoritedProduct: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  salons: makeSelectFavoritedSalons(),
  showcases: makeSelectFavoritedShowcases(),
  products: makeSelectFavoritedProducts(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getFavoritedSalons: () => dispatch(getFavoritedSalonsRequest()),
    removeFavoritedSalon: params =>
      dispatch(removeFavoritedSalonRequest(params)),
    removeFavoritedShowcase: params =>
      dispatch(removeFavoritedShowcaseRequest(params)),
    getFavoritedProducts: params =>
      dispatch(getFavoritedProductsRequest(params)),
    removeFavoritedProduct: params =>
      dispatch(removeFavoritedProductRequest(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FavoritePage);
