import React, { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Img from 'components/Img';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(4),
  },
}));

function ListBanner(props) {
  const { banners, onClick } = props;

  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={4} className={classes.wrapper}>
      {banners.map(item => (
        <Grid item key={shortid.generate()}>
          <Img src={item.image} onClick={() => onClick(item)} />
        </Grid>
      ))}
    </Grid>
  );
}

ListBanner.propTypes = {
  banners: PropTypes.array,
  onClick: PropTypes.func,
};

export default memo(ListBanner);
