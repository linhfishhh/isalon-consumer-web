/**
 *
 * CollectionItem
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';
import { v1 } from 'uuid';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FavoriteIcon, FavoredIcon } from 'assets/svgIcon/FavoriteIcon';
import Img from 'components/Img';

const useStyle = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    borderRadius: theme.spacing(1.5),
    overflow: 'hidden',
    border: `solid 1px ${theme.palette.borderColor[2]}`,
  },
  image: {
    height: 185,
  },
  favorite: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.textColor[6],
  },
  title: {
    padding: theme.spacing(4),
  },
  hidden: { display: 'none' },
  shadowView: {
    height: 8,
    borderBottomLeftRadius: theme.spacing(1.5),
    borderBottomRightRadius: theme.spacing(1.5),
  },
  shadow1: {
    backgroundColor: '#f0f1f1',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  shadow2: {
    backgroundColor: '#e5e6e7',
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
  },
}));

function CollectionItem(props) {
  const { className, data, onFavorite } = props;
  const [fancybox] = useState(v1());
  const classes = useStyle();
  return (
    <Grid container className={className} direction="column">
      <Grid item xs>
        <Grid container className={classes.wrapper}>
          <Grid item>
            {!isEmpty(data.items) &&
              data.items.map((item, index) => (
                <React.Fragment key={shortid.generate()}>
                  <a
                    href={item.image}
                    data-fancybox={fancybox}
                    data-caption={data.name}
                    className={index !== 0 ? classes.hidden : ''}
                  >
                    {index === 0 && (
                      <Img src={item.thumb_sq} className={classes.image} />
                    )}
                  </a>
                  {index === 0 && (
                    <IconButton
                      className={classes.favorite}
                      onClick={() => onFavorite(data.id)}
                    >
                      {data.liked ? (
                        <FavoredIcon />
                      ) : (
                        <FavoriteIcon color="#fff" />
                      )}
                    </IconButton>
                  )}
                </React.Fragment>
              ))}
          </Grid>
          <Grid item xs>
            <Typography className={classes.title}>{data.name}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <Typography
          component="div"
          className={`${classes.shadowView} ${classes.shadow1}`}
        />
        <Typography
          component="div"
          className={`${classes.shadowView} ${classes.shadow2}`}
        />
      </Grid>
    </Grid>
  );
}

CollectionItem.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  onFavorite: PropTypes.func,
};

export default memo(CollectionItem);
