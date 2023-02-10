import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

function ServiceDetailPlaceHolder(props) {
  const { className = '' } = props;
  return (
    <Grid container className={className} style={{ padding: '16px 0px' }}>
      <Grid item>
        <Skeleton animation="wave" variant="circle" width={40} height={40} />
      </Grid>
      <Grid item xs style={{ marginLeft: '10px' }}>
        <Skeleton animation="wave" width="30%" />
        <Skeleton animation="wave" width="15%" />
      </Grid>
      <Grid item xs={12} style={{ marginTop: '15px' }}>
        <Skeleton animation="wave" width="100%" />
        <Skeleton animation="wave" width="100%" />
      </Grid>
    </Grid>
  );
}

ServiceDetailPlaceHolder.propTypes = {
  className: PropTypes.string,
};

export default memo(ServiceDetailPlaceHolder);
