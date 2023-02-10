import React, { memo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import ProductItem from 'components/ProductItem';
import SearchProductItem from 'components/SearchProductItem';
import useGlobalStyles from 'assets/styles';
import EmptyPage from 'components/EmptyPage';

import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    padding: theme.spacing(5),
  },
  item: {
    borderRadius: theme.shape.borderRadius,
  },
  horizontalItem: {
    // marginRight: theme.spacing(4),
    // marginLeft: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4),
  },
  pagination: {
    // padding: theme.spacing(4),
  },
  items: {
    // padding: theme.spacing(4),
  },
}));

function ResultView(props) {
  const classes = useStyles();
  const { data, onChangePage, viewType } = props;

  const contents = get(data, 'content', []);
  const pageCount = get(data, 'totalPages', 1);
  const page = get(data, 'number', 0);
  const globalStyles = useGlobalStyles();

  return (
    <div className={classes.root}>
      {contents.length === 0 ? (
        <EmptyPage
          title="Không tìm thấy kết quả!"
          subTitle="Rất tiếc, chúng tôi không tìm thấy sản phẩm nào tương ứng với yêu cầu của bạn."
        />
      ) : (
        <>
          {viewType === 'grid' && (
            <Grid container spacing={4} className={classes.items}>
              {contents.map((item, index) => (
                <Grid
                  item
                  key={item.id || index}
                  className={isMobileOnly ? globalStyles.xs1_5 : ''}
                  xs={isMobileOnly ? 'auto' : 3}
                >
                  <ProductItem data={item} numColumn={4} minusWidth={300} />
                </Grid>
              ))}
            </Grid>
          )}
          {viewType === 'list' && (
            <Grid container direction="column">
              {contents.map((item, index) => (
                <Grid
                  item
                  key={item.productId || index}
                  className={classes.horizontalItem}
                >
                  <SearchProductItem data={item} />
                </Grid>
              ))}
            </Grid>
          )}
          <Grid container justify="flex-end" className={classes.pagination}>
            <Grid item>
              <Pagination
                page={page + 1}
                count={pageCount}
                color="primary"
                onChange={onChangePage}
              />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

ResultView.propTypes = {
  data: PropTypes.object,
  onChangePage: PropTypes.func,
  viewType: PropTypes.string,
};

export default memo(ResultView);
