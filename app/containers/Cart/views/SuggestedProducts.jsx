import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import ProductItem from 'components/ProductItem';
import useGlobalStyles from 'assets/styles';

const useStyles = makeStyles(theme => ({
  item: {
    width: '100%',
    marginRight: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4),
  },
  title: {
    fontSize: 16,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

const SuggestedProducts = props => {
  const classes = useStyles();
  const { products } = props;
  const globalStyles = useGlobalStyles();
  return (
    <div>
      <Typography className={classes.title}>
        Gợi ý dành riêng cho bạn
      </Typography>
      <Grid container spacing={4}>
        {products.map((item, index) => (
          <Grid
            item
            className={globalStyles.xs1_5}
            key={item.productId || index}
          >
            <Box className={classes.item}>
              <ProductItem data={item} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

SuggestedProducts.propTypes = {
  products: PropTypes.array,
};

export default memo(SuggestedProducts);
