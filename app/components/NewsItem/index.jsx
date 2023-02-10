/**
 *
 * NewsItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Img from 'components/Img';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: `solid 1px ${theme.palette.borderColor[2]}`,
    borderRadius: theme.spacing(1.5),
    overflow: 'hidden',
    position: 'relative',
    '&:hover a': {
      color: theme.palette.primary.main,
    },
    backgroundColor: theme.palette.backgroundColor[0],
  },
  image: {
    height: 185,
  },
  title: {
    fontFamily: theme.typography.fontMedium,
    margin: theme.spacing(3),
    height: 42,
    overflow: 'hidden',
    lineClamp: 2,
    display: '-webkit-box',
    boxOrient: 'vertical',
    '& a': {
      color: 'inherit',
    },
  },
}));

function NewsItem(props) {
  const { data } = props;
  const classes = useStyle();

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12}>
        <Link href={data.url} target="_blank">
          <Img className={classes.image} src={data.thumnail} />
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Typography component="h4" className={classes.title}>
          <Link href={data.url} target="_blank">
            {data.title}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

NewsItem.propTypes = {
  data: PropTypes.object,
};

export default memo(NewsItem);
