/**
 *
 * NewPosts
 *
 */
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';

import BlockContent from 'components/BlockContent';
import Slideshow from 'components/Slideshow';
import CollectionView from 'components/CollectionView';
import NewsItem from 'components/NewsItem';
import Link from 'components/Link';
import NewPostPlaceHolder from 'components/Placeholder/NewPostPlaceHolder';

import { path } from 'routers/path';

import { isMobileOnly } from 'utils/platform';
import { useBreakpointValues } from 'utils/hooks';

const useStyle = makeStyles(theme => ({
  item: {
    width: isMobileOnly ? 'auto' : '280px !important',
    marginRight: isMobileOnly ? 0 : theme.spacing(4),
  },
  viewAll: {
    color: theme.palette.secondary.main,
    padding: isMobileOnly ? theme.spacing(1, 3) : theme.spacing(1, 3),
    backgroundColor: theme.palette.backgroundColor[0],
    borderRadius: theme.spacing(4),
    fontWeight: 600,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

function NewPosts(props) {
  const classes = useStyle();

  const { latestBlogs } = props;

  const slidesToScroll = useBreakpointValues({ xs: 2, md: 3 });

  const renderItem = React.useCallback(
    item => (
      <div key={shortid.generate()} className={classes.item}>
        {isEmpty(item) ? <NewPostPlaceHolder /> : <NewsItem data={item} />}
      </div>
    ),
    [],
  );

  const viewAllComp = useMemo(
    () => (
      <Link className={classes.viewAll} to={path.news} target="_blank">
        Tất cả
      </Link>
    ),
    [],
  );

  const placeholders = React.useMemo(
    () => [...Array(isMobileOnly ? 3 : 5)],
    [],
  );

  return (
    <BlockContent title="BÀI VIẾT MỚI" endAdornmentTitle={viewAllComp}>
      {isMobileOnly ? (
        <CollectionView
          items={
            latestBlogs && latestBlogs.length > 0 ? latestBlogs : placeholders
          }
          renderItem={renderItem}
          cellHeight={255}
          height={265}
        />
      ) : (
        <Slideshow
          items={
            latestBlogs && latestBlogs.length > 0 ? latestBlogs : placeholders
          }
          variableWidth
          className="slide variable-width"
          slidesToScroll={slidesToScroll}
          renderItem={renderItem}
        />
      )}
    </BlockContent>
  );
}

NewPosts.propTypes = {
  latestBlogs: PropTypes.array,
};

export default memo(NewPosts);
