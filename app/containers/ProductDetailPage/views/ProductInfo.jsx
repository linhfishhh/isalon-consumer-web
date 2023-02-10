import React, { memo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Grid from '@material-ui/core/Grid';

import { isMobileOnly } from 'utils/platform';

import ImagesPreview from 'components/ImagesPreview';
import ImagesPreviewMobile from 'components/ImagesPreviewMobile';
import Description from './Description';
import ShipInfo from './ShipInfo';
import useStyles from '../styles';

function ProductInfo(props) {
  const classes = useStyles();
  const { productDetail = {}, dispatch } = props;
  const images = get(productDetail, 'collection.images', []);
  return (
    <>
      {isMobileOnly ? (
        <Grid container direction="column" className={classes.root}>
          <Grid item>
            <ImagesPreviewMobile data={images} />
          </Grid>
          <Grid item>
            <Description data={productDetail} dispatch={dispatch} />
          </Grid>
          <Grid item>
            <ShipInfo />
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.root}>
          <Grid item>
            <ImagesPreview data={images} />
          </Grid>
          <Grid item sm md>
            <Description data={productDetail} dispatch={dispatch} />
          </Grid>
          <Grid item className={classes.shipInfoWrapper}>
            <ShipInfo />
          </Grid>
        </Grid>
      )}
    </>
  );
}

ProductInfo.propTypes = {
  dispatch: PropTypes.func,
  productDetail: PropTypes.object,
};

export default memo(ProductInfo);
