/**
 *
 * BookingSearch
 *
 */
import React, { memo, useState, useEffect, useCallback } from 'react';
import { isMobileOnly } from 'utils/platform';
import isEmpty from 'lodash/isEmpty';
import take from 'lodash/take';
import isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { OptionIcon } from 'assets/svgIcon';
import SearchIcon from '@material-ui/icons/Search';
import LocationIcon from '@material-ui/icons/LocationOn';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { queryStringToFilter } from 'utils/searchHelper';
import {
  getSearchHistory,
  setSearchHistory,
  removeSearchHistory,
} from 'utils/localStorage/search';
import { searchTypes, unitSearch } from 'utils/enums';
import { useCurrentLocation, useScrollDirection } from 'utils/hooks';

import Autocomplete from 'components/Autocomplete';
import Button from 'components/Button';

import SearchHints from './SearchHints';
import BookingSearchSummary from './BookingSearchSummary';

const useStyle = makeStyles(theme => ({
  root: {
    transition: 'height 0.4s ease-in',
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: theme.spacing(1.5),
    padding: props => (props.dense ? 0 : theme.spacing(4)),
    background: theme.palette.backgroundColor[0],
    position: 'relative',
  },
  title: {
    fontSize: 20,
    color: theme.palette.grey[900],
  },
  button: {
    textTransform: 'uppercase',
    fontSize: 18,
    padding: theme.spacing(1, 4),
    borderRadius: isMobileOnly ? theme.spacing(5) : theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    padding: theme.spacing(1.5, 2),
    backgroundColor: theme.palette.backgroundColor[1],
    borderRadius: isMobileOnly ? theme.spacing(5) : theme.spacing(1),
  },
  autocomplete: {
    borderRadius: isMobileOnly ? theme.spacing(5) : theme.spacing(1),
    overflow: 'auto',
  },
  wrapperDense: {
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.backgroundColor[0],
  },
  searchType: {
    '& :focus': {
      backgroundColor: 'transparent',
    },
  },
  denseExpand: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    color: '#ffffff',
  },
  expand: {
    position: 'absolute',
    right: theme.spacing(6),
    bottom: theme.spacing(6),
    color: '#ffffff',
  },
}));

function BookingSearch(props) {
  const {
    categories,
    onSearch,
    title,
    height,
    hintsLoading,
    searchHints,
    onSearchHints,
    enableCollapse,
    scrollCollapse,
    dense,
  } = props;
  const classes = useStyle(props);
  const location = useLocation();

  const { pageOffset } = useScrollDirection();
  const { currentLocation, provinces: provinceList } = useCurrentLocation();
  const { province: currentProvince } = currentLocation;

  const [filter, setFilter] = useState();
  const [serviceSelected, setServiceSelected] = useState();
  const [provinceSelected, setProvinceSelected] = useState();
  const [searchTypeDefault] = useState(searchTypes.types[0]);

  const [collapsed, setCollapsed] = useState(isMobileOnly);
  const [beginTransition, setBeginTransition] = useState(isMobileOnly);

  const [anchorElHints, setAnchorElHints] = useState(null);
  const [openHints, setOpenHints] = useState(false);
  const [focusTextfield, setFocusTextfield] = useState(false);
  const [historySearch, setHistorySearch] = useState(getSearchHistory());

  const isOpenPopper = filter
    ? !isEmpty(filter.keyword) || !isEmpty(historySearch)
    : false;

  const handleChangeSearchType = event => {
    const searchType = searchTypes.typeOfValue(event.target.value);
    setFilter(prev => ({ ...prev, searchType }));
  };

  const handleChangeProvince = (_, newProvince) => {
    if (newProvince) {
      setFilter(prev => ({
        ...prev,
        provinces: [newProvince],
        unit: unitSearch.typeOfValue('province'),
      }));
    } else {
      setFilter(prev => ({
        ...prev,
        provinces: [],
        unit: unitSearch.typeOfValue('all'),
      }));
    }
  };

  const handleChangeService = (_, newService) => {
    if (newService) {
      setFilter(prev => ({ ...prev, services: [newService] }));
    } else {
      setFilter(prev => ({ ...prev, services: [] }));
    }
  };

  const handleSearch = useCallback(() => {
    if (!isEmpty(filter.keyword)) {
      setSearchHistory(filter.keyword, filter.searchType.value);
      const newHistory = getSearchHistory();
      setHistorySearch(newHistory);
    }
    const { keyword, services, searchType, provinces, unit } = filter;
    onSearch(
      { keyword, services: take(services), searchType, provinces, unit },
      true,
    );
  }, [filter]);

  const handleDeleteHistory = index => {
    if (isUndefined(index)) {
      setHistorySearch([]);
      removeSearchHistory();
    } else {
      historySearch.splice(index, 1);
      setHistorySearch([...historySearch]);
      removeSearchHistory(index);
    }
  };

  const handleSummaryClick = useCallback(() => {
    if (enableCollapse) {
      setBeginTransition(false);
      if (collapsed) {
        setCollapsed(false);
      } else {
        setTimeout(() => setCollapsed(false), 400);
      }
    } else {
      handleSearch();
    }
  }, [filter]);

  const handleChangeKeyWord = event => {
    const { value } = event.target;
    setFilter(prev => ({ ...prev, keyword: value }));
    onSearchHints(value, provinceSelected);
    if (!openHints) {
      setOpenHints(true);
    }
  };

  const handleOnFocusTextField = event => {
    setOpenHints(true);
    setFocusTextfield(true);
    const { value } = event.target;
    if (!isEmpty(value) && isEmpty(searchHints)) {
      onSearchHints(value);
    }
  };

  const handleCloseHint = () => {
    if (!focusTextfield) {
      setOpenHints(false);
    } else {
      setFocusTextfield(false);
    }
  };

  const handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleCollapse = () => {
    setBeginTransition(true);
    if (collapsed) {
      setCollapsed(true);
    } else {
      setTimeout(() => setCollapsed(true), 450);
    }
  };

  useEffect(() => {
    if (filter) {
      const [service] = filter.services;
      const [province] = filter.provinces;
      setServiceSelected(service);
      if (unitSearch.isProvince(filter.unit.value)) {
        setProvinceSelected(province);
      } else {
        setProvinceSelected(null);
      }
    }
  }, [filter]);

  useEffect(() => {
    if (currentProvince) {
      setFilter(queryStringToFilter(location.search));
    }
  }, [currentProvince, location]);

  useEffect(() => {
    if (scrollCollapse && !collapsed) {
      handleCollapse();
    }
  }, [pageOffset]);

  return (
    <div
      className={classes.root}
      style={{ height: beginTransition ? 50 : height }}
    >
      {collapsed ? (
        <BookingSearchSummary filter={filter} onClick={handleSummaryClick} />
      ) : (
        <Grid
          container
          direction="column"
          justify="space-between"
          className={classes.wrapper}
          style={{ height }}
        >
          {!isEmpty(title) && (
            <Typography
              component="div"
              align="center"
              className={classes.title}
            >
              {title}
            </Typography>
          )}
          <TextField
            fullWidth
            placeholder={
              filter
                ? filter.searchType.placeholder
                : searchTypeDefault.placeholder
            }
            InputProps={{
              className: classes.textField,
              ref: setAnchorElHints,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Select
                    className={classes.searchType}
                    disableUnderline
                    value={
                      filter ? filter.searchType.value : searchTypeDefault.value
                    }
                    onChange={handleChangeSearchType}
                  >
                    {searchTypes.types.map(item => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            value={filter ? filter.keyword : ''}
            onChange={handleChangeKeyWord}
            onFocus={handleOnFocusTextField}
            onKeyPress={handleOnKeyPress}
          />
          <Autocomplete
            placeholder="Tất cả dịch vụ"
            className={classes.autocomplete}
            options={categories}
            getOptionLabel={option => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            startAdornment={
              <InputAdornment position="start">
                <OptionIcon />
              </InputAdornment>
            }
            value={serviceSelected || null}
            onChange={handleChangeService}
          />
          <Autocomplete
            placeholder="Chọn thành phố"
            options={provinceList}
            className={classes.autocomplete}
            getOptionLabel={option => option.name}
            getOptionSelected={(option, value) =>
              option.provinceId === value.provinceId
            }
            startAdornment={
              <InputAdornment position="start">
                <LocationIcon color="primary" />
              </InputAdornment>
            }
            value={provinceSelected || null}
            onChange={handleChangeProvince}
          />
          <Button
            fullWidth
            className={classes.button}
            name="Tìm kiếm"
            options={{ showIcon: false }}
            onClick={handleSearch}
          />
          {enableCollapse && !beginTransition && (
            <IconButton
              size="small"
              className={dense ? classes.denseExpand : classes.expand}
              onClick={handleCollapse}
            >
              <ArrowUpwardIcon />
            </IconButton>
          )}
          <SearchHints
            open={openHints && isOpenPopper}
            anchorEl={anchorElHints}
            onClose={handleCloseHint}
            keyword={filter ? filter.keyword : ''}
            searchHints={searchHints}
            historySearch={historySearch}
            loading={hintsLoading}
            onDeleteHistory={handleDeleteHistory}
          />
        </Grid>
      )}
    </div>
  );
}

BookingSearch.defaultProps = {
  categories: [],
  dense: false,
  enableCollapse: false,
  scrollCollapse: false,
};

BookingSearch.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.array,
  onSearch: PropTypes.func,
  height: PropTypes.number,
  hintsLoading: PropTypes.bool,
  searchHints: PropTypes.array,
  onSearchHints: PropTypes.func,
  enableCollapse: PropTypes.bool,
  scrollCollapse: PropTypes.bool,
  dense: PropTypes.bool,
};

export default memo(BookingSearch);
