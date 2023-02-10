/**
 *
 * ProductBestSelling
 *
 */
import React, { memo, useCallback } from 'react';
import { isMobileOnly } from 'utils/platform';
import shortid from 'shortid';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import get from 'lodash/get';

import { useBreakpointValues } from 'utils/hooks';
import { gotoSearchResultPage } from 'utils/searchHelper';

import BlockContent from 'components/BlockContent';
import CollectionView from 'components/CollectionView';
import Placeholder from 'components/Placeholder';
import ProductPlaceHolder from 'components/Placeholder/ProductPlaceHolder';
import Slideshow from 'components/Slideshow';
import ProductItem from 'components/ProductItem';
import Img from 'components/Img';
import FlipClock from 'components/FlipClock';
import FlashSaleIcon from 'assets/images/ic_flashdeal.png';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: theme.spacing(1.5),
    padding: isMobileOnly ? theme.spacing(2, 0) : theme.spacing(8),
    backgroundColor: theme.palette.background.default,
  },
  viewAll: {
    color: theme.palette.secondary.main,
    padding: theme.spacing(1, 3),
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
  flashSaleHeader: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2),
    backgroundColor: '#f0f0f0',
    height: 46,
    borderRadius: 23,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
  },
  flashSaleHeaderMobile: {
    height: 46,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
  },
  flashSaleTitle: {
    fontFamily: theme.typography.fontMedium,
    fontSize: isMobileOnly ? 14 : 25,
  },
  flashSaleIcon: {
    width: 18,
    height: 35,
  },
  flipClock: {
    marginLeft: theme.spacing(1),
  },
  remainText: {
    color: '#939598',
    fontSize: 16,
    marginLeft: theme.spacing(3),
  },
  flexibleSpace: {
    flex: 1,
  },
}));

function FlashSaleHeader(props) {
  const classes = useStyle();
  const history = useHistory();
  const { expiredAt, flashSaleId } = props;

  const onViewAll = () => {
    gotoSearchResultPage(history, {
      findType: 'flashsale',
      flashSaleId,
      sortType: 'HOT_SALE',
    });
  };

  return (
    <div
      className={
        isMobileOnly ? classes.flashSaleHeaderMobile : classes.flashSaleHeader
      }
    >
      <span className={classes.flashSaleTitle}>FL</span>
      <Img
        src={FlashSaleIcon}
        className={classes.flashSaleIcon}
        resizeMode="contain"
      />
      <span className={classes.flashSaleTitle}>SH SALE</span>
      {!isMobileOnly && <span className={classes.remainText}>Còn lại</span>}
      <FlipClock expiredAt={expiredAt} className={classes.flipClock} />
      <div className={classes.flexibleSpace} />
      <button className={classes.viewAll} onClick={onViewAll} type="button">
        Tất cả
      </button>
    </div>
  );
}

FlashSaleHeader.propTypes = {
  expiredAt: PropTypes.string,
  flashSaleId: PropTypes.number,
};

function FlashSale(props) {
  const classes = useStyle();
  const { data } = props;
  const { products } = data;

  const slidesToScroll = useBreakpointValues({ xs: 2, sm: 3, md: 4, lg: 5 });

  const header = useCallback(() => (
    <FlashSaleHeader
      flashSaleId={get(data, 'flashSale.flashSaleId')}
      expiredAt={get(data, 'flashSale.expiredAt')}
    />
  ));

  const renderItem = React.useCallback(
    item => (
      <div key={shortid.generate()} className={classes.item}>
        <ProductItem data={item} categoryType="FLASH_SALE" dense />
      </div>
    ),
    [],
  );

  const placeholder = React.useMemo(() => <ProductPlaceHolder />, []);

  return (
    <BlockContent className={classes.wrapper} title={header()}>
      {products ? (
        <>
          {isMobileOnly ? (
            <CollectionView
              items={products}
              renderItem={renderItem}
              cellWidth={125}
              cellHeight={320}
              height={340}
              spacing={8}
            />
          ) : (
            <Slideshow
              items={products}
              variableWidth
              className="slide variable-width"
              slidesToScroll={slidesToScroll}
              renderItem={renderItem}
            />
          )}
        </>
      ) : (
        <Placeholder count={5} item={placeholder} />
      )}
    </BlockContent>
  );
}

FlashSale.propTypes = {
  data: PropTypes.object,
};

export default memo(FlashSale);
