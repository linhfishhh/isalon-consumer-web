/**
 *
 * Search
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import styles from 'assets/styles';

import HomeSearch from 'containers/HomeSearch';

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
    padding: isMobileOnly ? theme.spacing(0, 4, 4, 4) : theme.spacing(8, 0),
  },
  search: {
    width: isMobileOnly ? '100%' : 365,
  },
  carousel: {
    paddingLeft: isMobileOnly ? 0 : theme.spacing(8),
    paddingTop: isMobileOnly ? theme.spacing(4) : 0,
  },
}));

function Search(props) {
  const classes = useStyle();
  const globalStyle = styles();
  const { banners = [] } = props;

  return (
    <div className={classes.searchWrapper}>
      <div className={globalStyle.container}>
        <Grid container direction={isMobileOnly ? 'column' : 'row'}>
          <Grid item className={classes.search}>
            <HomeSearch />
          </Grid>
          <Grid item xs className={classes.carousel} zeroMinWidth>
            <Carousel data={banners} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Search.propTypes = {
  banners: PropTypes.array,
};

export default memo(Search);
