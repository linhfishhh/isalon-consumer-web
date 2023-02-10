/**
 *
 * ProductBestSelling
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import shortid from 'shortid';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { gotoSearchResultPage } from 'utils/searchHelper';

import BlockContent from 'components/BlockContent';
import SwipeView from 'components/SwipeView';
import NewProductItem from './NewProductItem';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: theme.spacing(1.5),
    padding: isMobileOnly ? theme.spacing(2, 0) : theme.spacing(8),
    backgroundColor: theme.palette.background.default,
  },
  content: {
    padding: isMobileOnly ? theme.spacing(0, 2) : 0,
    display: 'flex',
    flexDirection: 'row',
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
  subItem: {
    borderLeft: `1px solid ${theme.palette.borderColor[2]}`,
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    flex: 1,
  },
  itemMobile: {
    width: '40%',
  },
}));

function NewProduct(props) {
  const classes = useStyle();
  const history = useHistory();
  const { data, title } = props;

  const renderItem = React.useCallback(
    page => (
      <div
        key={page.mainProduct ? page.mainProduct.productId : shortid.generate()}
        className={classes.content}
      >
        {isMobileOnly ? (
          <>
            <NewProductItem
              data={page.mainProduct}
              itemType="MAIN"
              className={classes.itemMobile}
            />
            {page.primary.length > 0 && (
              <div className={`${classes.subItem} ${classes.item}`}>
                {page.primary.map((item, index) => (
                  <NewProductItem data={item} key={item.id || index} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <NewProductItem
              data={page.mainProduct}
              itemType="MAIN"
              className={classes.item}
            />
            <div className={`${classes.subItem} ${classes.item}`}>
              {page.primary.map((item, index) => (
                <NewProductItem data={item} key={item.id || index} />
              ))}
            </div>
            <div className={`${classes.subItem} ${classes.item}`}>
              {page.secondary.map((item, index) => (
                <NewProductItem data={item} key={item.id || index} />
              ))}
            </div>
          </>
        )}
      </div>
    ),
    [],
  );

  const paging = React.useMemo(
    () => ({
      show: true,
      variant: 'dots',
      position: 'BC',
      arrow: !isMobileOnly,
    }),
    [],
  );

  const viewAllComp = React.useMemo(() => {
    const onViewAll = () => {
      gotoSearchResultPage(history, {
        sortType: 'NEW_PRODUCT',
        sortDirection: 'DESC',
      });
    };
    return (
      <button className={classes.viewAll} onClick={onViewAll} type="button">
        Tất cả
      </button>
    );
  }, []);

  return (
    <BlockContent
      className={classes.wrapper}
      title={title}
      endAdornmentTitle={viewAllComp}
    >
      <SwipeView items={data} renderItem={renderItem} paging={paging} />
    </BlockContent>
  );
}

NewProduct.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
};

export default memo(NewProduct);
