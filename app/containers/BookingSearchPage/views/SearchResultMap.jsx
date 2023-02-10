/**
 *
 * SearchResultMap
 *
 */
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Grid, Toolbar, Button, Dialog } from '@material-ui/core';

import ListIcon from '@material-ui/icons/FormatListBulleted';

import { getCurrentPosition } from 'utils/localStorage/location';

import AreaSafe from 'components/AreaSafe';
import MapView from 'components/MapView';
import Transition from 'components/Transition';

const useStyles = makeStyles(theme => ({
  wrapper: {},
  navigation: {
    backgroundColor: theme.palette.primary.main,
    background: `linear-gradient(90deg, rgba(${theme.hexToRgb(
      theme.palette.primary.main,
    )}, 1) 0%, rgba(${theme.hexToRgb(
      theme.palette.backgroundColor[5],
    )}, 1) 100%)`,
  },
  location: {
    marginRight: theme.spacing(2),
  },
  btnBack: {
    color: theme.palette.textColor[6],
    border: `1px solid ${theme.palette.borderColor[3]}`,
    padding: `${theme.spacing(2)}px ${theme.spacing(8)}px`,
  },
}));

function SearchResultMap(props) {
  const {
    open,
    settings = {},
    activeIndex,
    searchResult,
    onClose,
    onLoadMore,
  } = props;
  const classes = useStyles();

  const { items } = searchResult;

  const { position } = getCurrentPosition();

  const colors = useMemo(
    () => ({
      normal: settings.marker_color_1_normal,
      active: settings.marker_color_1_active,
    }),
    [],
  );

  // eslint-disable-next-line no-unused-vars
  const handleLoadMore = () => {
    const page = searchResult.page + 1;
    onLoadMore(page);
  };

  return (
    <Dialog
      fullScreen
      aria-labelledby="simple-dialog-title"
      open={open}
      TransitionComponent={Transition}
    >
      <AppBar position="static" className={classes.navigation}>
        <AreaSafe />
        <Toolbar>
          <Grid container>
            <Grid item md={6} container justify="center" />
            <Grid item xs md={6} container justify="center">
              <Button className={classes.btnBack} onClick={onClose}>
                <ListIcon color="inherit" className={classes.location} />
                Quay trở lại danh sách
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <MapView
        location={position}
        salons={items}
        colors={colors}
        active={activeIndex}
      />
    </Dialog>
  );
}

SearchResultMap.propTypes = {
  open: PropTypes.bool,
  settings: PropTypes.object,
  activeIndex: PropTypes.number,
  searchResult: PropTypes.object,
  onClose: PropTypes.func,
  onLoadMore: PropTypes.func,
};

export default memo(SearchResultMap);
