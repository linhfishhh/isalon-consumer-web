/**
 *
 * Gallery
 *
 */
import React, { memo, useState, useMemo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import shortid from 'shortid';
import SwipeView from 'components/SwipeView';
import Img from 'components/Img';
import { v1 } from 'uuid';

const useStyle = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
  },
  item: {
    width: isMobileOnly ? '100%' : '400px !important',
    height: 300,
  },
  arrow: {
    backgroundColor: `rgba(${theme.hexToRgb(
      theme.palette.backgroundColor[6],
    )}, 0.7)`,
    color: theme.palette.textColor[6],
    '&:hover': {
      backgroundColor: `rgba(${theme.hexToRgb(
        theme.palette.backgroundColor[6],
      )}, 0.5)`,
    },
  },
  prev: {
    left: 20,
  },
  next: {
    right: 20,
  },
  img: {
    display: 'inline-block !important',
  },
  wrapperName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: theme.spacing(10),
    padding: theme.spacing(4),
  },
  name: {
    color: 'white',
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    overflow: 'hidden',
    height: 57,
  },
  verified: {
    color: theme.palette.success.main,
  },
}));

function ImagesPreviewMobile(props) {
  const { data = [] } = props;
  const classes = useStyle();
  const [fancybox] = useState(v1());

  const images = useMemo(() => {
    const r = data.map(img => ({
      id: img.imageId,
      url: img.imageLocation,
      thumbUrl: img.imageLocation,
    }));
    return r;
  }, [data]);

  const renderItem = React.useCallback(
    item => (
      <div key={item.id || shortid.generate()} className={classes.item}>
        <a href={item.url} data-fancybox={fancybox}>
          <Img
            src={item.thumbUrl}
            className={classes.img}
            resizeMode="contain"
          />
        </a>
      </div>
    ),
    [],
  );

  return (
    <div className={classes.wrapper}>
      <SwipeView items={images} renderItem={renderItem} />
    </div>
  );
}

ImagesPreviewMobile.propTypes = {
  data: PropTypes.array,
};

export default memo(ImagesPreviewMobile);
