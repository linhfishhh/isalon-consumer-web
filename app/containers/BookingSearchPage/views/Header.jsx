/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AreaSafe from 'components/AreaSafe';
import BackButton from 'components/Navigation/DefaultButton';
import HomeSearch from 'containers/HomeSearch';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(2, 4),
    backgroundColor: '#fff',
    color: theme.palette.grey[600],
  },
  areaSafe: {
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontFamily: theme.typography.fontMedium,
    fontWeight: 'bold',
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  signIn: {
    '& svg': {
      width: 25,
      height: 25,
    },
  },
}));

function Header(props) {
  const classes = useStyle();
  const { onSearch } = props;

  return (
    <>
      <AreaSafe className={classes.areaSafe} />
      <Grid container className={classes.wrapper}>
        <Grid item>
          <BackButton />
        </Grid>
        <Grid item xs zeroMinWidth>
          <HomeSearch
            bookingSearch
            enableCollapse
            scrollCollapse
            hideTitle
            onSearch={onSearch}
          />
        </Grid>
      </Grid>
    </>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func,
};

export default memo(Header);
