import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import globalStyles from 'assets/styles';
import get from 'lodash/get';
import { isMobileOnly } from 'utils/platform';
import WriteProductComment from './WriteProductComment';
import RatingPercent from './RatingPercent';

import useStyles from '../styles';

function AverageRate(props) {
  const classes = useStyles();
  const globalClasses = globalStyles();

  const { product } = props;
  const productRate = get(product, 'productRate', {});
  const { numberTotal = 0, rate = 0 } = productRate;

  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      className={classes.averageRateRoot}
    >
      <Grid item xs={isMobileOnly ? 12 : false}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography display="inline" className={classes.averageRateText}>
              {rate.toFixed(1)}
            </Typography>
            <Typography display="inline" className={classes.maxRate}>
              /5
            </Typography>
          </Grid>
          <Grid item>
            <Rating
              className={classes.star}
              readOnly
              value={rate}
              size="medium"
              precision={0.5}
            />
          </Grid>
          <Grid item>
            <Typography display="inline" className={globalClasses.detailText}>
              {`(${numberTotal} nhận xét và đánh giá)`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={isMobileOnly ? 12 : false}>
        <RatingPercent productRate={productRate} />
      </Grid>

      <Grid item xs={isMobileOnly ? 12 : false}>
        <div className={classes.writeCommentGroup}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography
                display="inline"
                className={classes.writeCommentTitle}
              >
                {product && product.isReviewable
                  ? 'Hãy cho chúng tôi biết cảm nhận của bạn !'
                  : 'Hãy đặt hàng để đánh giá sản phẩm nhé !'}
              </Typography>
            </Grid>
            {product && product.isReviewable && (
              <Grid item>
                <WriteProductComment product={product} />
              </Grid>
            )}
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

AverageRate.propTypes = {
  product: PropTypes.object,
};

export default memo(AverageRate);
