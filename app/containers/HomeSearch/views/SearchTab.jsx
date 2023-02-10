/**
 *
 * SearchTab
 *
 */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import { MakeupIcon, ProductIcon } from 'assets/svgIcon';
import { Search as SearchIcon } from '@material-ui/icons';

import { TabView, Tab } from 'components/TabView';
import Button from 'components/Button';

import BookingSearch from './BookingSearch';

const tabs = [
  { type: 'booking', label: 'Đặt lịch', icon: MakeupIcon },
  { type: 'product', label: 'Sản phẩm', icon: ProductIcon },
];

const useStyle = makeStyles(theme => ({
  wrapper: {
    height: isMobileOnly ? 'auto' : 315,
    borderRadius: isMobileOnly ? theme.spacing(4) : theme.spacing(1.5),
    padding: theme.spacing(0, 4),
    paddingBottom: isMobileOnly ? theme.spacing(3) : 0,
    background: theme.palette.backgroundColor[0],
    boxShadow: isMobileOnly ? '0px 10px 4px #ddd' : 'none',
  },
  button: {
    textTransform: 'uppercase',
    fontSize: 18,
    padding: theme.spacing(1, 4),
    borderRadius: isMobileOnly ? theme.spacing(5) : theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.backgroundColor[1],
    borderRadius: isMobileOnly ? theme.spacing(5) : theme.spacing(1),
  },
}));

function SearchTab(props) {
  const {
    services,
    onSearch,
    hintsLoading,
    searchHints,
    onSearchHints,
  } = props;
  const classes = useStyle();

  const [keyword, setKeyword] = useState('');

  const handleSearchProduct = () => {
    const params = {};
    if (!isEmpty(keyword)) {
      params.keyword = keyword;
    }
    onSearch(params);
  };

  const handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchProduct();
    }
  };

  const renderTab = (item, index, active) => {
    const { icon: Icon } = item;
    return (
      <Tab
        key={index}
        tabIndex={index}
        label={item.label}
        icon={<Icon active={active} />}
      />
    );
  };

  const renderTabContent = item => {
    if (item.type === 'booking') {
      return (
        <BookingSearch
          categories={services}
          onSearch={onSearch}
          height={210}
          hintsLoading={hintsLoading}
          searchHints={searchHints}
          onSearchHints={onSearchHints}
          enableCollapse={isMobileOnly}
          dense
        />
      );
    }
    return (
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ height: isMobileOnly ? 100 : 210 }}
      >
        <Grid item>
          <TextField
            fullWidth
            placeholder="Tìm kiếm sản phẩm"
            className={classes.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            value={keyword}
            onChange={event => setKeyword(event.target.value)}
            onKeyPress={handleOnKeyPress}
          />
        </Grid>
        <Grid item>
          <Button
            fullWidth
            className={classes.button}
            name="Tìm kiếm"
            options={{ showIcon: false }}
            onClick={handleSearchProduct}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <TabView
      className={classes.wrapper}
      tabs={tabs}
      renderTab={renderTab}
      renderTabContent={renderTabContent}
    />
  );
}

SearchTab.propTypes = {
  services: PropTypes.array,
  onSearch: PropTypes.func,
  hintsLoading: PropTypes.bool,
  searchHints: PropTypes.array,
  onSearchHints: PropTypes.func,
};

export default memo(SearchTab);
