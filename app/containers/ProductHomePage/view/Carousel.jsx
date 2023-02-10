/**
 *
 * Carousel
 *
 */
import React, { memo } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Skeleton from '@material-ui/lab/Skeleton';

import { isMobileOnly } from 'utils/platform';
import universalLinks from 'utils/universalLinks';

import Slideshow from 'components/Slideshow';
import Img from 'components/Img';

const useStyle = makeStyles(theme => ({
  slide: {
    margin: isMobileOnly ? theme.spacing(0, 4, 4, 4) : 0,
    '& .slick-list': {
      borderRadius: isMobileOnly ? theme.spacing(1) : theme.spacing(2.5),
    },
  },
  item: {
    height: isMobileOnly ? 150 : 300,
    width: '100%',
    marginRight: isMobileOnly ? 0 : theme.spacing(2),
    cursor: 'pointer',
  },
  img: {
    display: 'inline-block !important',
  },
  skeleton: {
    backgroundColor: '#fff',
    margin: theme.spacing(0, 4, 4, 4),
    borderRadius: theme.spacing(1),
  },
}));

function Carousel(props) {
  const classes = useStyle();
  const { data = [] } = props;

  const renderItem = React.useCallback(
    item => (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        key={shortid.generate()}
        className={classes.item}
        onClick={() => universalLinks.redirectLink(item.url)}
      >
        <Img src={get(item, 'image.imageLocation')} className={classes.img} />
      </Link>
    ),
    [],
  );

  return (
    <>
      {isEmpty(data) && isMobileOnly ? (
        <div className={classes.skeleton}>
          <Skeleton variant="rect" animation="wave" width="100%" height={150} />
        </div>
      ) : (
        <Slideshow
          dots
          infinite
          autoplay
          arrows={!isMobileOnly}
          items={data}
          swipe={isMobileOnly}
          dotsClassName="custom-dots"
          className={classes.slide}
          renderItem={renderItem}
        />
      )}
    </>
  );
}

Carousel.propTypes = {
  data: PropTypes.array,
};

export default memo(Carousel);
