/**
 *
 * ProductBestSelling
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import shortid from 'shortid';

import BlockContent from 'components/BlockContent';
import Placeholder from 'components/Placeholder';
import ProductPlaceHolder from 'components/Placeholder/ProductPlaceHolder';
import Button from 'components/Button';
import ProductItem from 'components/ProductItem';

import useGlobalStyles from 'assets/styles';
import { isMobileOnly } from 'utils/platform';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.default,
    paddingTop: isMobileOnly ? theme.spacing(2) : 0,
  },
  viewAll: {
    color: theme.palette.secondary.main,
    padding: theme.spacing(1, 3),
    backgroundColor: theme.palette.backgroundColor[1],
  },
  content: {
    padding: isMobileOnly ? theme.spacing(0, 4) : 0,
  },
  loadMoreButton: {
    width: 250,
    height: 40,
    backgroundColor: '#ffff',
    borderRadius: 25,
    marginTop: 30,
    color: theme.palette.primary.main,
    '&:hover': {
      color: '#ffff',
    },
  },
}));

function AllProduct(props) {
  const classes = useStyle();
  const { data, onLoadMore } = props;
  const { contents = [], pageInfo } = data;
  const { last = false } = pageInfo;
  const globalStyles = useGlobalStyles();

  const placeholder = React.useMemo(
    () => <ProductPlaceHolder imageHeight={200} />,
    [],
  );

  return (
    <BlockContent className={classes.wrapper} title="TẤT CẢ SẢN PHẨM">
      <Grid container className={classes.content}>
        <Grid item xs>
          {contents.length === 0 ? (
            <>
              {isMobileOnly ? (
                <Grid container spacing={4}>
                  {[...Array(10)].map(() => (
                    <Grid item xs={6} key={shortid.generate()}>
                      <ProductPlaceHolder imageHeight={200} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <>
                  <Placeholder count={5} item={placeholder} />
                  <Placeholder count={5} item={placeholder} />
                </>
              )}
            </>
          ) : (
            <Grid container spacing={4}>
              {contents.map(item => (
                <Grid
                  item
                  className={isMobileOnly ? '' : globalStyles.xs1_5}
                  xs={isMobileOnly ? 6 : false}
                  key={item.productId}
                >
                  <ProductItem data={item} />
                </Grid>
              ))}
              {!isMobileOnly && !last && (
                <Grid item sx={12} container justify="center">
                  <Button
                    className={classes.loadMoreButton}
                    name="TẢI THÊM"
                    onClick={onLoadMore}
                  />
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </BlockContent>
  );
}

AllProduct.propTypes = {
  data: PropTypes.object,
  onLoadMore: PropTypes.func,
};

export default memo(AllProduct);
