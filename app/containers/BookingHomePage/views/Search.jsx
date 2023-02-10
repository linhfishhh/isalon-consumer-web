/**
 *
 * Search
 *
 */
import React, { memo, useMemo, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from 'assets/styles';
import filter from 'lodash/filter';

import { isMobileOnly } from 'utils/platform';

import HomeSearch from 'containers/HomeSearch';
import Header from 'containers/Header';
import Carousel from './Carousel';

const useStyle = makeStyles(theme => ({
  searchWrapper: {
    backgroundColor: isMobileOnly ? 'transparent' : theme.palette.primary.main,
    background: isMobileOnly
      ? 'transparent'
      : `linear-gradient(90deg, rgba(${theme.hexToRgb(
          theme.palette.primary.main,
        )}, 1) 0%, rgba(${theme.hexToRgb(
          theme.palette.backgroundColor[5],
        )}, 1) 100%)`,
    paddingTop: isMobileOnly ? 0 : theme.spacing(8),
    paddingBottom: isMobileOnly ? theme.spacing(2) : theme.spacing(8),
    paddingLeft: isMobileOnly ? theme.spacing(4) : 0,
    paddingRight: isMobileOnly ? theme.spacing(4) : 0,
  },
  search: {
    width: isMobileOnly ? '100%' : 365,
  },
  carousel: {
    paddingLeft: isMobileOnly ? 0 : theme.spacing(8),
    paddingTop: 0,
    paddingBottom: isMobileOnly ? theme.spacing(4) : 0,
  },
  fixedView: {
    position: 'fixed',
    top: 0,
    left: 0,
    background: isMobileOnly
      ? 'transparent'
      : `linear-gradient(90deg, rgba(${theme.hexToRgb(
          theme.palette.primary.main,
        )}, 1) 0%, rgba(${theme.hexToRgb(
          theme.palette.backgroundColor[5],
        )}, 1) 100%)`,
    width: '100%',
    display: 'hidden',
    borderRadius: 0,
    zIndex: 10,
    transition: 'opacity 0.3s ease-out',
    opacity: 0,
    padding: '27px 0px',
  },
  showFixedView: {
    visibility: 'visible !important',
    opacity: 1,
  },
  fixedAccountView: {
    position: 'fixed',
    top: 0,
    right: 0,
  },
}));

function Search(props) {
  const { banners } = props;
  const classes = useStyle();
  const globalStyle = styles();
  const wrapper = useRef();
  const stickyWrapper = useRef();

  const bookingBanners = useMemo(
    () => filter(banners, b => b.banner_type !== '1'),
    [banners],
  );

  const handleScroll = useCallback(() => {
    if (!isMobileOnly && wrapper.current && stickyWrapper.current) {
      const wrapperElement = wrapper.current;
      const stickyWrapperElement = stickyWrapper.current;
      if (wrapperElement.getBoundingClientRect().bottom < 0) {
        stickyWrapperElement.classList.add(classes.showFixedView);
      } else {
        stickyWrapperElement.classList.remove(classes.showFixedView);
      }
    }
  }, [wrapper, stickyWrapper]);

  useEffect(() => {
    if (!isMobileOnly) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (!isMobileOnly) {
        window.removeEventListener('scroll', () => {});
      }
    };
  }, []);

  return (
    <>
      <div ref={wrapper} className={classes.searchWrapper}>
        <div className={globalStyle.container}>
          <Grid container direction={isMobileOnly ? 'column' : 'row'}>
            {!isMobileOnly && (
              <Grid item className={classes.search}>
                <HomeSearch bookingSearch />
              </Grid>
            )}
            <Grid item xs className={classes.carousel} zeroMinWidth>
              <Carousel data={bookingBanners} />
            </Grid>
          </Grid>
        </div>
      </div>
      {!isMobileOnly && (
        <div ref={stickyWrapper} className={classes.fixedView}>
          <div className={globalStyle.container}>
            <Grid container>
              <Grid item className={classes.search}>
                <HomeSearch bookingSearch scrollCollapse enableCollapse />
              </Grid>
            </Grid>
          </div>
          <div className={classes.fixedAccountView}>
            <Header onlyAccountView />
          </div>
        </div>
      )}
    </>
  );
}

Search.defaultProps = {
  banners: [],
};

Search.propTypes = {
  banners: PropTypes.array,
};

export default memo(Search);
