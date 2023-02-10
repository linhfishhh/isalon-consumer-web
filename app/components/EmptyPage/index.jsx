/**
 *
 * EmptyPage
 *
 */

import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import icon from 'assets/images/no_item.png';
import Img from 'components/Img';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: isMobileOnly ? theme.spacing(4) : theme.spacing(10),
  },
  img: {
    width: 120,
  },
}));

function EmptyPage(props) {
  const { className, emptyIcon, title, subTitle, children } = props;
  const classes = useStyle();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={`${classes.wrapper} ${className}`}
    >
      <Grid item>
        <Img src={emptyIcon || icon} alt="Empty" className={classes.img} />
      </Grid>
      <Grid item>
        {title && (
          <Typography variant="h5" align="center">
            {title}
          </Typography>
        )}
        {subTitle && <Typography align="center">{subTitle}</Typography>}
        {children}
      </Grid>
    </Grid>
  );
}

EmptyPage.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  emptyIcon: PropTypes.string,
  children: PropTypes.node,
};

export default memo(EmptyPage);
