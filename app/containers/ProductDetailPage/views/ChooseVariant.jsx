import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import map from 'lodash/map';
import remove from 'lodash/remove';
import find from 'lodash/find';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, ButtonBase } from '@material-ui/core';
import { makeSelectProductVariantValues } from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {},
  key: {
    color: theme.palette.textColor[8],
  },
  variantKey: {
    marginTop: theme.spacing(3),
  },
  variantValueList: {
    marginTop: theme.spacing(2),
  },
  selectedVariant: {
    color: theme.palette.primary.main,
  },
  tagButton: {
    height: 30,
    borderRadius: 15,
    border: `1px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  tagButtonSelected: {
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const stateSelector = createStructuredSelector({
  variantValues: makeSelectProductVariantValues(),
});

function ChooseVariant(props) {
  const classes = useStyles();
  const [selectedVariants, setSelectedVariants] = useState([]);
  const { product, onSelectVariantValues } = props;

  const { variantValues } = useSelector(stateSelector);

  useEffect(() => {
    if (product) {
      const { defaultProductVariant } = product;
      if (defaultProductVariant) {
        setSelectedVariants(get(defaultProductVariant, 'variantValues', []));
      }
    }
  }, [product]);

  const onSelectOption = (variantId, selectedVariantValues) => {
    const opt = {
      variantId,
      ...selectedVariantValues,
    };
    let opts = selectedVariants ? [...selectedVariants] : [];
    remove(opts, iter => iter.variantId === variantId);
    opts = [...opts, opt];
    setSelectedVariants(opts);
    if (onSelectVariantValues) {
      onSelectVariantValues(opts);
    }
  };

  const isSelectedVariantValue = v =>
    find(selectedVariants, iter => iter.variantValueId === v.variantValueId) !==
    undefined;

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Typography display="inline" className={classes.key}>
            Lựa chọn
          </Typography>
        </Grid>
        <Grid item>
          <Typography display="inline" className={classes.selectedVariant}>
            {map(selectedVariants, 'name').join(', ')}
          </Typography>
        </Grid>
      </Grid>
      {variantValues.map((item, index) => (
        <div className={classes.variantKey} key={item.variantId || index}>
          <Typography display="inline" className={classes.key}>
            {item.name}
          </Typography>
          <Grid
            container
            key={item.variantId || index}
            spacing={2}
            className={classes.variantValueList}
          >
            {item.variantValues.map((v, i) => (
              <Grid item key={v.variantValueId || i}>
                <ButtonBase
                  className={
                    isSelectedVariantValue(v)
                      ? classes.tagButtonSelected
                      : classes.tagButton
                  }
                  onClick={() => onSelectOption(item.variantId, v)}
                >
                  {v.name}
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
}

ChooseVariant.propTypes = {
  product: PropTypes.object,
  onSelectVariantValues: PropTypes.func,
};

export default memo(ChooseVariant);
