import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Divider, Checkbox } from '@material-ui/core';
import Img from 'components/Img';

import { getProductPrice } from 'utils/helper';
import { currencyFormat, convertToSlug } from 'utils/stringFormat';

import { path, createPath } from 'routers/path';
import Link from 'components/Link';
import useStyles from '../styles';

function RelatedProductItem(props) {
  const classes = useStyles();
  const { data, onSelectionChange } = props;
  const { mainImage, name } = data;
  const { price } = getProductPrice(data);
  const [checked, setChecked] = useState(false);

  const onCheckboxChange = (event, c) => {
    if (onSelectionChange) {
      onSelectionChange(data, c);
    }
    setChecked(c);
  };

  useEffect(() => {
    setChecked(false);
  }, [data]);

  const link = createPath(path.productDetail, {
    productId: `${data.productId}`,
    productName: convertToSlug(data.name),
  });

  return (
    <div className={classes.productItemContainer}>
      <Img
        src={mainImage.thumb256}
        resizeMode="contain"
        className={classes.productItemCover}
      />
      <Grid
        container
        direction="column"
        justify="flex-end"
        alignItems="stretch"
        className={classes.productItemInfoContainer}
      >
        <Grid item>
          <Link to={link} activeClassName={classes.productName}>
            <Typography className={classes.productName} paragraph>
              {name}
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Checkbox
                color="primary"
                onChange={onCheckboxChange}
                checked={checked}
              />
            </Grid>
            <Grid item>
              <Typography color="primary" display="inline">
                {currencyFormat(price)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

RelatedProductItem.propTypes = {
  data: PropTypes.object,
  onSelectionChange: PropTypes.func,
};

export default memo(RelatedProductItem);
