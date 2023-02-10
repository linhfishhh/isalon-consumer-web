import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import remove from 'lodash/remove';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import unset from 'lodash/unset';
import concat from 'lodash/concat';
import isNumber from 'lodash/isNumber';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import FilterGroup from './FilterGroup';
import FilterTagGroup from './FilterTagGroup';
import FilterVariantGroup from './FilterVariantGroup';
import PriceFilterGroup from './PriceFilterGroup';
import RateFilterGroup from './RateFilterGroup';
import { CONTEXT } from '../../constants';
import reducer from '../../reducer';
import saga from '../../saga';
import { makeSelectFilterOptions } from '../../selectors';
import { getFilterOptionsRequest } from '../../actions';

/* -------------- Main component ------------------ */
function FilterView(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles();
  const {
    filterOptions,
    getFilterOptions,
    selectedFilterOptions,
    onChange,
  } = props;

  const categoryOption = filterOptions.find(
    opt => opt.filterName === 'category',
  );
  const brandOption = filterOptions.find(opt => opt.filterName === 'brand');
  const usesOption = filterOptions.find(opt => opt.filterName === 'uses');
  const originOption = filterOptions.find(opt => opt.filterName === 'origin');
  const variantOptions = filterOptions.find(
    opt => opt.filterName === 'variant',
  );
  const variantObjectList = get(variantOptions, 'objectList', []);

  useEffect(() => {
    getFilterOptions();
  }, []);

  const didUpdateOption = (key, options) => {
    const opts = { ...selectedFilterOptions };
    if (!isEmpty(options) || (isNumber(options) && options > 0)) {
      opts[key] = options;
    } else {
      unset(opts, key);
    }
    updateSelectedOptions(opts);
  };

  const didUpdateOption2 = (key, oldIds, newIds) => {
    const opts = { ...selectedFilterOptions };

    let tagIds = get(opts, key, []);
    remove(tagIds, id => find(oldIds, oldId => oldId === id));
    if (newIds) {
      tagIds = concat(tagIds, newIds);
    }

    if (!isEmpty(tagIds)) {
      opts[key] = tagIds;
    } else {
      unset(opts, key);
    }
    updateSelectedOptions(opts);
  };

  const updateSelectedOptions = React.useCallback(opts => {
    if (onChange) {
      onChange(opts);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={3}>
        {categoryOption && (
          <Grid item>
            <FilterGroup
              option={categoryOption}
              onChange={didUpdateOption}
              groupKey="categoryIds"
              selectedOptions={selectedFilterOptions}
            />
          </Grid>
        )}
        {brandOption && (
          <Grid item>
            <FilterGroup
              option={brandOption}
              onChange={didUpdateOption}
              groupKey="brandIds"
              selectedOptions={selectedFilterOptions}
            />
          </Grid>
        )}
        <Grid item>
          <PriceFilterGroup
            onChange={didUpdateOption}
            startPrice={get(selectedFilterOptions, 'startPrice')}
            endPrice={get(selectedFilterOptions, 'endPrice')}
          />
        </Grid>
        <Grid item>
          <RateFilterGroup
            value={get(selectedFilterOptions, 'rate', 0)}
            onChange={didUpdateOption}
          />
        </Grid>
        {usesOption && (
          <Grid item>
            <FilterTagGroup
              option={usesOption}
              onChange={didUpdateOption2}
              selectedOptions={selectedFilterOptions}
            />
          </Grid>
        )}
        {originOption && (
          <Grid item>
            <FilterTagGroup
              option={originOption}
              onChange={didUpdateOption2}
              selectedOptions={selectedFilterOptions}
            />
          </Grid>
        )}
        {variantObjectList.map((item, index) => (
          <Grid item key={item.variantId || index}>
            <FilterVariantGroup
              option={item}
              onChange={didUpdateOption2}
              selectedOptions={selectedFilterOptions}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

FilterView.propTypes = {
  selectedFilterOptions: PropTypes.object,
  filterOptions: PropTypes.array,
  getFilterOptions: PropTypes.func,
  onChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  filterOptions: makeSelectFilterOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getFilterOptions: () => dispatch(getFilterOptionsRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FilterView);
