/**
 *
 * Endow
 *
 */
import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import { useBreakpointValues } from 'utils/hooks';
import { isMobileOnly } from 'utils/platform';

import Transition from 'components/Transition';
import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import BlockContent from 'components/BlockContent';
import CollectionView from 'components/CollectionView';
import Slideshow from 'components/Slideshow';
import Img from 'components/Img';
import CategoryPlaceHolder from 'components/Placeholder/CategoryPlaceHolder';

import { path } from 'routers/path';

const useStyle = makeStyles(theme => ({
  item: {
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    height: isMobileOnly ? 'auto' : 144,
    '&:hover span': {
      color: theme.palette.primary.main,
    },
  },
  img: {
    width: isMobileOnly ? 60 : 94,
    height: isMobileOnly ? 60 : 94,
    borderRadius: '50%',
  },
  title: {
    color: theme.palette.textColor[1],
    paddingTop: theme.spacing(2),
  },
  arrow: {
    top: '35%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  viewAll: {
    color: theme.palette.secondary.main,
    padding: theme.spacing(0.5, 3),
    backgroundColor: theme.palette.grey[100],
    borderRadius: 16,
    minWidth: 'auto',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  paperWrapper: {
    overflow: 'auto',
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(2, 0),
    justifyContent: 'center',
    '& >div': {
      width: '24%',
      margin: theme.spacing(2, 0),
    },
  },
}));

function CategoryService(props) {
  const { categories = [] } = props;
  const classes = useStyle();
  const slidesToShow = useBreakpointValues({ xs: 3, sm: 5, md: 7, lg: 9 });
  const [showAllCats, setShowAllCats] = useState(false);

  const renderItem = React.useCallback(
    item => (
      <div
        key={isEmpty(item) ? shortid.generate() : item.id}
        className={classes.item}
      >
        {isEmpty(item) ? (
          <CategoryPlaceHolder />
        ) : (
          <Link
            to={`${path.bookingSearch}?cat[]=${item.id}`}
            className={classes.column}
          >
            <Img src={item.cover} className={classes.img} />
            <span className={classes.title} align="center">
              {item.name}
            </span>
          </Link>
        )}
      </div>
    ),
    [],
  );

  const placeholders = React.useMemo(
    () => [...Array(isMobileOnly ? 5 : slidesToShow)],
    [],
  );

  const viewAllCat = React.useMemo(() => {
    const onViewAll = () => {
      setShowAllCats(true);
    };
    return isMobileOnly ? (
      <Button className={classes.viewAll} onClick={onViewAll}>
        Tất cả
      </Button>
    ) : (
      <></>
    );
  }, []);

  const closeShowAllCats = useCallback(() => {
    setShowAllCats(false);
  }, []);

  return (
    <BlockContent title="DANH MỤC DỊCH VỤ" endAdornmentTitle={viewAllCat}>
      {isMobileOnly ? (
        <CollectionView
          items={
            categories && categories.length > 0 ? categories : placeholders
          }
          renderItem={renderItem}
          cellWidth={85}
          cellHeight={120}
          height={130}
          spacing={8}
        />
      ) : (
        <Slideshow
          items={
            categories && categories.length > 0 ? categories : placeholders
          }
          slidesToShow={slidesToShow}
          slidesToScroll={slidesToShow}
          arrowNextClassName={classes.arrow}
          arrowPrevClassName={classes.arrow}
          renderItem={renderItem}
        />
      )}
      {isMobileOnly && (
        <Dialog
          open={showAllCats}
          TransitionComponent={Transition}
          fullScreen
          PaperProps={{
            className: classes.paperWrapper,
          }}
        >
          <BasePageView
            header={
              <Navigation
                title="Danh mục dịch vụ"
                color="light"
                border
                backButtonProps={{
                  type: 'action',
                  icon: 'close',
                  action: closeShowAllCats,
                }}
              />
            }
          >
            <div className={classes.wrapper}>
              {categories.map(item => renderItem(item))}
            </div>
          </BasePageView>
        </Dialog>
      )}
    </BlockContent>
  );
}

CategoryService.propTypes = {
  categories: PropTypes.array,
};

export default memo(CategoryService);
