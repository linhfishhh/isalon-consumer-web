import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { isMobileOnly } from 'utils/platform';
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  ButtonBase,
  Hidden,
  IconButton,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { SortTypes } from 'utils/constants';

import get from 'lodash/get';
import {
  GridViewIcon,
  GridViewSelectedIcon,
} from 'assets/svgIcon/GridViewIcon';
import {
  ListViewIcon,
  ListViewSelectedIcon,
} from 'assets/svgIcon/ListViewIcon';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    minHeight: isMobileOnly ? 90 : 'auto',
  },
  toolbar: {
    backgroundColor: '#fff',
    height: 60,
    borderTop: '0.5px solid #e6e6e6',
    borderBottom: '0.5px solid #e6e6e6',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  resultCount: {
    minHeight: 30,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: 4,
  },
  content: {
    height: 60,
  },
  normal: {
    color: theme.palette.textColor[0],
  },
  detail: {
    color: theme.palette.textColor[8],
  },
  sortTypeList: {
    minWidth: 120,
    fontSize: 14,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  viewTypeButton: {
    marginLeft: theme.spacing(2),
  },
  btnFilter: {
    marginRight: theme.spacing(2),
  },
}));

function SortView(props) {
  const classes = useStyles();
  const {
    onChange,
    onViewTypeChange,
    totalElements,
    sortOptions,
    viewType = 'grid',
    keyword,
    onShowHideFilter,
  } = props;

  const handleSortTypeChange = event => {
    const value = get(event, 'target.value');
    if (onChange) {
      onChange(value);
    }
  };

  const viewTypeChanged = type => {
    if (onViewTypeChange) {
      onViewTypeChange(type);
    }
  };

  const searchResultLabel =
    totalElements > 0
      ? `Có ${totalElements} sản phẩm được tìm thấy ${
          keyword && keyword.length > 0 ? `cho "${keyword}"` : ''
        }`
      : 'Không tìm thấy sản phẩm nào';

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <Grid
          container
          alignItems="center"
          className={classes.content}
          wrap="nowrap"
        >
          <Grid item>
            <Grid container alignItems="center" wrap="nowrap">
              <Grid item>
                <Hidden mdUp>
                  <IconButton
                    onClick={onShowHideFilter}
                    className={classes.btnFilter}
                  >
                    <FilterListIcon />
                  </IconButton>
                </Hidden>
              </Grid>
              <Grid item>
                {!isMobileOnly && (
                  <Typography className={classes.normal}>
                    {searchResultLabel}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Typography className={classes.normal}>Sắp xếp:</Typography>
          </Grid>
          <Grid item>
            <Select
              value={sortOptions}
              onChange={handleSortTypeChange}
              margin="dense"
              variant="outlined"
              className={classes.sortTypeList}
            >
              {SortTypes.map((item, index) => (
                <MenuItem key={item.id || index} value={item}>
                  {item.value}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <ButtonBase
              className={classes.viewTypeButton}
              onClick={() => viewTypeChanged('grid')}
            >
              {viewType === 'grid' ? (
                <GridViewSelectedIcon />
              ) : (
                <GridViewIcon />
              )}
            </ButtonBase>
          </Grid>
          <Grid item>
            <ButtonBase
              className={classes.viewTypeButton}
              onClick={() => viewTypeChanged('list')}
            >
              {viewType === 'list' ? (
                <ListViewSelectedIcon />
              ) : (
                <ListViewIcon />
              )}
            </ButtonBase>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

SortView.propTypes = {
  onChange: PropTypes.func,
  onViewTypeChange: PropTypes.func,
  totalElements: PropTypes.number,
  sortOptions: PropTypes.object,
  viewType: PropTypes.string,
  keyword: PropTypes.string,
  onShowHideFilter: PropTypes.func,
};

export default memo(SortView);
