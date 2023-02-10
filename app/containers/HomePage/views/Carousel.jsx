/**
 *
 * Carousel
 *
 */
import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
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
    '& .slick-list': {
      borderRadius: isMobileOnly ? theme.spacing(1) : theme.spacing(1.5),
    },
  },
  item: {
    height: isMobileOnly ? 150 : 315,
    cursor: 'pointer',
  },
  img: {
    display: 'inline-block !important',
  },
  skeleton: {
    borderRadius: theme.spacing(1),
  },
}));

function Carousel(props) {
  const classes = useStyle();
  const { data = [] } = props;

  const renderItem = useCallback(
    item => (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        key={shortid.generate()}
        className={classes.item}
        onClick={() => universalLinks.redirectLink(item.link)}
      >
        <Img src={item.image} className={classes.img} />
      </Link>
    ),
    [],
  );

  return (
    <>
      {isEmpty(data) && isMobileOnly ? (
        <Skeleton
          variant="rect"
          animation="wave"
          width="100%"
          height={150}
          className={classes.skeleton}
        />
      ) : (
        <Slideshow
          dots
          infinite
          autoplay
          items={data}
          arrows={!isMobileOnly}
          swipe={isMobileOnly}
          className={classes.slide}
          dotsClassName="custom-dots"
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
