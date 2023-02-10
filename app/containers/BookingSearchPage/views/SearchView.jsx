/**
 *
 * SearchView
 *
 */
import React, { memo, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import styles from 'assets/styles';
import { LocationOn as LocationIcon } from '@material-ui/icons';

import { isMobileOnly } from 'utils/platform';
import HomeSearch from 'containers/HomeSearch';

const useStyle = makeStyles(theme => ({
  searchWrapper: {
    backgroundColor: theme.palette.primary.main,
    background: `linear-gradient(90deg, rgba(${theme.hexToRgb(
      theme.palette.primary.main,
    )}, 1) 0%, rgba(${theme.hexToRgb(
      theme.palette.backgroundColor[5],
    )}, 1) 100%)`,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  search: {
    width: 365,
  },
  location: {
    marginRight: theme.spacing(2),
  },
  openMap: {
    color: theme.palette.textColor[6],
    border: `1px solid ${theme.palette.borderColor[3]}`,
    padding: `${theme.spacing(3)}px ${theme.spacing(8)}px`,
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
    padding: theme.spacing(4, 0),
  },
  showFixedView: {
    visibility: 'visible !important',
    opacity: 1,
  },
}));

function SearchView(props) {
  const classes = useStyle();
  const globalStyle = styles();
  const wrapper = useRef();
  const stickyWrapper = useRef();
  const { onShowMap, onSearch } = props;

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
          <Grid container>
            <Grid item className={classes.search}>
              <HomeSearch bookingSearch onSearch={onSearch} />
            </Grid>
            <Grid item xs>
              <Grid container justify="flex-end">
                <Grid item>
                  <Button
                    className={classes.openMap}
                    onClick={() => onShowMap()}
                  >
                    <LocationIcon
                      color="inherit"
                      className={classes.location}
                    />
                    Mở kết quả trên bản đồ
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      {!isMobileOnly && (
        <div ref={stickyWrapper} className={classes.fixedView}>
          <div className={globalStyle.container}>
            <Grid container>
              <Grid item className={classes.search}>
                <HomeSearch
                  bookingSearch
                  scrollCollapse
                  enableCollapse
                  onSearch={onSearch}
                />
              </Grid>
              <Grid item xs>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Button
                      className={classes.openMap}
                      onClick={() => onShowMap()}
                    >
                      <LocationIcon
                        color="inherit"
                        className={classes.location}
                      />
                      Mở kết quả trên bản đồ
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
}

SearchView.propTypes = {
  onShowMap: PropTypes.func,
  onSearch: PropTypes.func,
};

export default memo(SearchView);
