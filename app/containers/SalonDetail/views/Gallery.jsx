/**
 *
 * Gallery
 *
 */
import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import shortid from 'shortid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CheckCircleRounded as VerifiedIcon } from '@material-ui/icons';

import Slideshow from 'components/Slideshow';
import SwipeView from 'components/SwipeView';
import Img from 'components/Img';

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

function Gallery(props) {
  const { data = [], name, verified } = props;
  const classes = useStyle();

  const renderItem = React.useCallback(
    item => (
      <div key={shortid.generate()} className={classes.item}>
        <a href={item.link} data-fancybox="gallery">
          <Img src={item.thumb} className={classes.img} />
        </a>
      </div>
    ),
    [],
  );

  return (
    <div className={classes.wrapper}>
      {isMobileOnly ? (
        <>
          <SwipeView auto items={data} renderItem={renderItem} />
          <Grid container className={classes.wrapperName}>
            <Grid item xs>
              <Typography variant="h3" className={classes.name}>
                {name}
              </Typography>
            </Grid>
            {verified && (
              <Grid item>
                <VerifiedIcon className={classes.verified} />
              </Grid>
            )}
          </Grid>
        </>
      ) : (
        <Slideshow
          items={data}
          variableWidth
          className="slide variable-width"
          arrowPrevClassName={`${classes.arrow} ${classes.prev}`}
          arrowNextClassName={`${classes.arrow} ${classes.next}`}
          arrowColor="#fff"
          style={{ backgroundColor: '#fff' }}
          arrows
          infinite
          renderItem={renderItem}
        />
      )}
    </div>
  );
}

Gallery.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string,
  verified: PropTypes.number,
};

export default memo(Gallery);
