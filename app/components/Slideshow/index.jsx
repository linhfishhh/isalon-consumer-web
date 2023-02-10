/**
 *
 * Slide
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactSlider from 'react-slick';

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

const Slideshow = React.forwardRef((props, ref) => {
  const {
    children,
    infinite,
    slidesToScroll,
    arrowNextClassName,
    arrowPrevClassName,
    dotsClassName,
    arrowColor,
    items,
    renderItem,
    ...setting
  } = props;
  if (process.env.NODE_ENV === 'development') {
    setting.dots = undefined;
  }
  const [prevVisible, setPrevVisible] = useState(false);
  const [nextVisible, setNextVisible] = useState(true);

  const totalPage = React.useMemo(() => {
    const newCount = items.length;
    let page = Math.floor(newCount / slidesToScroll);
    if (newCount > slidesToScroll && newCount % slidesToScroll !== 0) {
      page += 1;
    }
    return page;
  }, [items, slidesToScroll]);

  useEffect(() => {
    setNextVisible(items.length > slidesToScroll);
  }, [items, slidesToScroll]);

  const beforeChange = React.useCallback(
    (current, next) => {
      const page = next / slidesToScroll;
      setNextVisible(page === 0 || page < totalPage - 1);
      setPrevVisible(page > 0);
    },
    [slidesToScroll, totalPage],
  );

  const prevArrow = React.useMemo(
    () => (
      <PrevArrow
        visible={infinite || prevVisible}
        customClassName={arrowPrevClassName}
        color={arrowColor}
      />
    ),
    [infinite, prevVisible, arrowColor, arrowPrevClassName],
  );
  const nextArrow = React.useMemo(
    () => (
      <NextArrow
        visible={infinite || nextVisible}
        customClassName={arrowNextClassName}
        color={arrowColor}
      />
    ),
    [infinite, nextVisible, arrowNextClassName, arrowColor],
  );

  return (
    <ReactSlider
      ref={ref}
      infinite={infinite}
      slidesToScroll={slidesToScroll}
      prevArrow={prevArrow}
      nextArrow={nextArrow}
      beforeChange={beforeChange}
      dotsClass={`slick-dots ${dotsClassName}`}
      {...setting}
    >
      {items.map((item, index) => renderItem(item, index))}
    </ReactSlider>
  );
});

Slideshow.defaultProps = {
  dots: false,
  infinite: false,
  swipe: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  items: [],
};

Slideshow.propTypes = {
  children: PropTypes.node,
  dots: PropTypes.bool,
  infinite: PropTypes.bool,
  swipe: PropTypes.bool,
  speed: PropTypes.number,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  arrowNextClassName: PropTypes.string,
  arrowPrevClassName: PropTypes.string,
  dotsClassName: PropTypes.string,
  arrowColor: PropTypes.string,
  items: PropTypes.array,
  renderItem: PropTypes.func,
};

export default memo(Slideshow);
