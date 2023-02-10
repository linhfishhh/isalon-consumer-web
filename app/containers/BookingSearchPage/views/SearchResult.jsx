/**
 *
 * SearchResult
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

import HorizontalItem from 'components/SalonItem/HorizontalItem';
import MobileItem from 'components/SalonItem/MobileItem';
import EmptyPage from 'components/EmptyPage';
import SearchResultPlaceHolder from 'components/Placeholder/SearchResultPlaceHolder';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: isMobileOnly ? theme.spacing(0, 4) : 0,
  },
  viewMore: {
    border: `solid 1px ${theme.palette.secondary.main}`,
    borderRadius: 30,
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
    color: theme.palette.secondary.main,
  },
  item: {
    marginBottom: theme.spacing(4),
    border: `solid 1px ${theme.palette.borderColor[2]}`,
    overflow: 'hidden',
  },
  itemMobile: {
    marginTop: theme.spacing(4),
  },
}));

function SearchResult(props) {
  const {
    loading,
    searchResult,
    onLoadMore,
    onShowMap,
    onShowServiceDetail,
    onShowSalonDetail,
  } = props;
  const classes = useStyle();

  const { items, is_last_page: isLastPage } = searchResult;

  return (
    <div className={classes.wrapper}>
      {isEmpty(items) ? (
        <>
          {loading ? (
            <SearchResultPlaceHolder />
          ) : (
            <EmptyPage
              title="Không tìm thấy kết quả!"
              subTitle="Rất tiếc, chúng tôi không tìm thấy salon nào tương ứng với yêu cầu của bạn."
            />
          )}
        </>
      ) : (
        <>
          {items.map((item, index) =>
            isMobileOnly ? (
              <MobileItem
                key={item.id}
                data={item}
                className={classes.itemMobile}
                onShowServiceDetail={onShowServiceDetail}
                onShowSalonDetail={onShowSalonDetail}
              />
            ) : (
              <HorizontalItem
                key={item.id}
                data={item}
                className={classes.item}
                onShowMap={() => onShowMap(index)}
                onShowServiceDetail={onShowServiceDetail}
                onShowSalonDetail={onShowSalonDetail}
              />
            ),
          )}
        </>
      )}
      {!isMobileOnly && (
        <Grid container justify="center">
          {!isLastPage && (
            <Button className={classes.viewMore} onClick={onLoadMore}>
              Xem nhiều hơn
            </Button>
          )}
        </Grid>
      )}
    </div>
  );
}

SearchResult.propTypes = {
  loading: PropTypes.bool,
  searchResult: PropTypes.object,
  onLoadMore: PropTypes.func,
  onShowMap: PropTypes.func,
  onShowServiceDetail: PropTypes.func,
  onShowSalonDetail: PropTypes.func,
};

export default memo(SearchResult);
