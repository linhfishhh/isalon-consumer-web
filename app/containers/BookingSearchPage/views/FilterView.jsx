/**
 *
 * FilterView
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Divider,
  Typography,
  Button,
  // TextField,
  // MenuItem,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { StarBorder as StarBorderIcon } from '@material-ui/icons';

import { formatPriceValue, defaultFilters } from 'utils/searchHelper';
import { viewTypes, unitSearch } from 'utils/enums';

import SelectionList from 'components/SelectionList';
import Slider from 'components/Slider';
import AreaSafe from 'components/AreaSafe';

const useStyle = makeStyles(theme => ({
  wrapper: {
    width: 280,
  },
  item: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
  },
  priceLabel: {
    color: theme.palette.textColor[2],
  },
}));

function FilterView(props) {
  const classes = useStyle();
  const {
    filter,
    services,
    provinces,
    districts,
    onChangeFilter,
    showDistrict,
  } = props;

  const isNearMe = viewTypes.isNearMe(filter.viewType.value);

  const handleChangeDataFilter = name => (event, newValue) => {
    const newFilter = { ...filter };
    switch (name) {
      case 'sort': {
        const { value } = event.target;
        newFilter[name] = value;
        break;
      }
      case 'viewType': {
        const { value } = event.target;
        const viewType = viewTypes.typeOfValue(value);
        newFilter[name] = viewType;
        break;
      }
      case 'isSale': {
        const value = event.target.checked;
        newFilter[name] = value;
        break;
      }
      case 'price': {
        const [priceFrom, priceTo] = event;
        newFilter.priceFrom = priceFrom;
        newFilter.priceTo = priceTo;
        break;
      }
      case 'rating': {
        newFilter[name] = newValue;
        break;
      }
      case 'services':
      case 'provinces':
      case 'districts':
      case 'distance': {
        newFilter[name] = event;
        break;
      }
      default:
        break;
    }
    newFilter.page = 1;
    onChangeFilter(newFilter);
  };

  const handleRefresh = () => {
    if (unitSearch.isAll(filter.unit.value)) {
      onChangeFilter({ ...filter, ...defaultFilters, provinces: [] });
    } else if (unitSearch.isProvince(filter.unit.value)) {
      onChangeFilter({ ...filter, ...defaultFilters });
    }
  };

  return (
    <div className={classes.wrapper}>
      <AreaSafe />
      <Grid container direction="column">
        <Grid
          item
          container
          alignItems="center"
          justify="space-between"
          className={classes.item}
        >
          <Typography variant="h5" display="inline">
            Bộ lọc
          </Typography>
          <Button color="primary" onClick={handleRefresh}>
            Làm mới
          </Button>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item className={classes.item}>
          <Grid container direction="column">
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={filter.isSale || false}
                    onChange={handleChangeDataFilter('isSale')}
                    color="primary"
                  />
                }
                label="Khuyến mại giảm giá"
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">Xếp hạng sao</Typography>
              <Rating
                name="rating"
                value={filter.rating}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={handleChangeDataFilter('rating')}
                size="large"
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">Giá dịch vụ</Typography>
              <Slider
                initialValue={[filter.priceFrom, filter.priceTo]}
                value={[filter.priceFrom, filter.priceTo]}
                max={defaultFilters.priceTo}
                scaleDown={10000}
                renderCaption={value => (
                  <Typography className={classes.priceLabel}>
                    {formatPriceValue(value)}
                  </Typography>
                )}
                onChanged={debounce(handleChangeDataFilter('price'), 1000)}
              />
            </Grid>
            {isNearMe && (
              <Grid item>
                <Typography variant="h6">Bán kính</Typography>
                <Slider
                  initialValue={defaultFilters.distance}
                  value={filter.distance}
                  max={50}
                  renderCaption={value => (
                    <Typography className={classes.priceLabel}>
                      {`${value}Km`}
                    </Typography>
                  )}
                  onChanged={debounce(handleChangeDataFilter('distance'), 1000)}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item className={classes.item}>
          <Typography variant="h6">Dịch vụ</Typography>
          <SelectionList
            multiple
            data={services}
            renderLabel={item => item.name}
            selected={filter.services}
            onSelected={handleChangeDataFilter('services')}
            listItemProps={{ dense: true, disableGutters: true }}
            itemToShow={5}
          />
        </Grid>
        {!isNearMe && (
          <>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item className={classes.item}>
              <Typography variant="h6">Khu vực</Typography>
              {showDistrict ? (
                <SelectionList
                  multiple
                  onlyDataField
                  data={districts}
                  dataValueField="districtId"
                  renderLabel={item => item.name}
                  selected={filter.districts}
                  onSelected={handleChangeDataFilter('districts')}
                  listItemProps={{ dense: true, disableGutters: true }}
                  itemToShow={5}
                />
              ) : (
                <SelectionList
                  multiple
                  data={provinces}
                  dataValueField="provinceId"
                  renderLabel={item => item.name}
                  selected={filter.provinces}
                  onSelected={handleChangeDataFilter('provinces')}
                  listItemProps={{ dense: true, disableGutters: true }}
                  itemToShow={5}
                />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}

FilterView.defaultProps = {
  services: [],
  provinces: [],
  districts: [],
};

FilterView.propTypes = {
  filter: PropTypes.object,
  services: PropTypes.array,
  provinces: PropTypes.array,
  districts: PropTypes.array,
  showDistrict: PropTypes.bool,
  onChangeFilter: PropTypes.func,
};

export default memo(FilterView);
