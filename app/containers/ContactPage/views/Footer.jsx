import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from '../styles';

function Footer(props) {
  const classes = useStyles();
  return (
    <div className={classes.footerContent}>
      <Typography className={classes.copyright}>
        Nhãn hiệu và bản quyền @2018 iSalon.vn
      </Typography>
    </div>
  );
}

Footer.propTypes = {};

export default memo(Footer);
