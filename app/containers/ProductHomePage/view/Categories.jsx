/**
 *
 * Categories
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { useBreakpointValues } from 'utils/hooks';
import { gotoSearchResultPage } from 'utils/searchHelper';
import { isMobileOnly } from 'utils/platform';

import Slideshow from 'components/Slideshow';
import Img from 'components/Img';
import BlockContent from 'components/BlockContent';
import CollectionView from 'components/CollectionView';
import CategoryPlaceHolder from 'components/Placeholder/CategoryPlaceHolder';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: '#fff',
    padding: isMobileOnly ? theme.spacing(2, 0) : 0,
  },
  categoryCover: {
    width: isMobileOnly ? 60 : 100,
    height: isMobileOnly ? 60 : 100,
    borderRadius: 50,
    overflow: 'hidden',
    display: 'block',
    margin: 'auto',
  },
  categoryItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${isMobileOnly ? 'auto' : '140px'} !important`,
    color: '#000',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
  },
  categoryName: {
    fontSize: 14,
    marginTop: theme.spacing(4),
    textAlign: 'center',
    height: 42,
    overflow: 'hidden',
    lineClamp: 2,
    display: '-webkit-box',
    boxOrient: 'vertical',
  },
}));

function Categories(props) {
  const classes = useStyle();
  const { data = [] } = props;
  const slidesToScroll = useBreakpointValues({ xs: 4, md: 7 });
  const history = useHistory();

  const onViewCategory = React.useCallback(cat => {
    gotoSearchResultPage(history, { categoryIds: [cat.categoryId] });
  }, []);

  const renderCategoryItem = React.useCallback(
    item =>
      isEmpty(item) ? (
        <CategoryPlaceHolder key={shortid.generate()} />
      ) : (
        <button
          component="span"
          key={item.categoryId}
          className={classes.categoryItem}
          onClick={() => onViewCategory(item)}
          type="button"
        >
          <Img
            className={classes.categoryCover}
            src={get(item, 'image.imageLocation')}
          />
          <span className={classes.categoryName}>{item.name}</span>
        </button>
      ),
    [],
  );

  const placeholders = React.useMemo(
    () => [...Array(isMobileOnly ? 4 : slidesToScroll)],
    [],
  );

  return (
    <BlockContent className={classes.wrapper} title="DANH MỤC SẢN PHẨM">
      {isMobileOnly ? (
        <CollectionView
          items={data && data.length > 0 ? data : placeholders}
          renderItem={renderCategoryItem}
          cellWidth={85}
          cellHeight={110}
          height={120}
        />
      ) : (
        <Slideshow
          items={data && data.length > 0 ? data : placeholders}
          slidesToShow={slidesToScroll}
          slidesToScroll={slidesToScroll}
          renderItem={renderCategoryItem}
        />
      )}
    </BlockContent>
  );
}

Categories.propTypes = {
  data: PropTypes.array,
};

export default memo(Categories);
