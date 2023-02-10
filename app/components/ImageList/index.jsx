/**
 *
 * ImageList
 *
 */

import React, { memo, useState } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Img from 'components/Img';
import { v1 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  imageWrapper: {
    position: 'relative',
    display: 'block',
  },
  image: {
    borderRadius: theme.shape.borderRadius,
    transition: 'box-shadow 0.4s',
    '&:hover': {
      boxShadow: `0 10px 10px -10px rgba(0, 0, 0, 0.3)`,
    },
  },
  showMore: {
    '&:before': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      bottom: '0',
      content: "''",
      left: '0',
      position: 'absolute',
      right: '0',
      top: '0',
    },
  },
  more: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: theme.palette.textColor[6],
    fontSize: isMobileOnly ? 25 : 41,
    textAlign: 'center',
  },
  hidden: {
    display: 'none',
  },
}));

function ImageList(props) {
  const { data, caption, numberToShow, ...other } = props;
  const more = data.length - numberToShow;
  const [fancybox] = useState(v1());
  const classes = useStyle();

  return (
    <Grid container spacing={2} {...other}>
      {data.map((item, index) => (
        <Grid
          key={item.id || index}
          item
          xs
          className={index >= numberToShow ? classes.hidden : ''}
        >
          <a
            href={item.image}
            data-fancybox={fancybox}
            data-caption={caption}
            className={[
              classes.imageWrapper,
              more > 0 && index === numberToShow - 1 && classes.showMore,
            ].join(' ')}
          >
            {more > 0 && index === numberToShow - 1 && (
              <span className={classes.more}>{`+${more}`}</span>
            )}
            <Img src={item.thumb} className={classes.image} />
          </a>
        </Grid>
      ))}
      {data.length < numberToShow &&
        [...Array(numberToShow - data.length)].map((item, index) => (
          <Grid key={item || index} item xs />
        ))}
    </Grid>
  );
}

ImageList.defaultProps = {
  data: [],
  numberToShow: 5,
};

ImageList.propTypes = {
  data: PropTypes.array,
  caption: PropTypes.string,
  numberToShow: PropTypes.number,
};

export default memo(ImageList);
