/**
 *
 * ProductBestSelling
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { isMobileOnly } from 'utils/platform';
import { gotoSearchResultPage } from 'utils/searchHelper';
import { useBreakpointValues } from 'utils/hooks';

import BlockContent from 'components/BlockContent';
import ProductPlaceHolder from 'components/Placeholder/ProductPlaceHolder';
import Slideshow from 'components/Slideshow';
import ProductItem from 'components/ProductItem';
import CollectionView from 'components/CollectionView';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: theme.shape.borderRadius,
    padding: isMobileOnly ? theme.spacing(2, 0) : theme.spacing(8),
    backgroundColor: theme.palette.background.default,
  },
  viewAll: {
    color: theme.palette.secondary.main,
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.backgroundColor[1],
    borderRadius: 16,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  item: {
    width: isMobileOnly ? 'auto' : '194px !important',
    marginRight: isMobileOnly ? 0 : theme.spacing(4),
  },
}));

function SuggestedProduct(props) {
  const classes = useStyle();
  const history = useHistory();
  const { data } = props;
  const slidesToScroll = useBreakpointValues({ xs: 2, sm: 3, md: 4, lg: 5 });

  const renderItem = React.useCallback(
    item => (
      <div key={shortid.generate()} className={classes.item}>
        {isEmpty(item) ? (
          <ProductPlaceHolder />
        ) : (
          <ProductItem data={item} categoryType="SUGGESTED" dense />
        )}
      </div>
    ),
    [],
  );

  const viewAllComp = React.useMemo(() => {
    const onViewAll = () => {
      gotoSearchResultPage(history, { findType: 'recommended' });
    };
    return (
      <button className={classes.viewAll} onClick={onViewAll} type="button">
        Tất cả
      </button>
    );
  }, []);

  const placeholders = React.useMemo(
    () => [...Array(isMobileOnly ? 3 : 5)],
    [],
  );

  return (
    <BlockContent
      className={classes.wrapper}
      title="DÀNH RIÊNG CHO BẠN"
      endAdornmentTitle={viewAllComp}
    >
      {isMobileOnly ? (
        <CollectionView
          items={data && data.length > 0 ? data : placeholders}
          renderItem={renderItem}
          cellWidth={125}
          cellHeight={220}
          height={230}
          spacing={8}
        />
      ) : (
        <Slideshow
          items={data && data.length > 0 ? data : placeholders}
          variableWidth
          className="slide variable-width"
          slidesToScroll={slidesToScroll}
          renderItem={renderItem}
        />
      )}
    </BlockContent>
  );
}

SuggestedProduct.propTypes = {
  data: PropTypes.array,
};

export default memo(SuggestedProduct);
