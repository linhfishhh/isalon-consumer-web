import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core';
import styles from 'assets/styles';
import Img from 'components/Img';
import get from 'lodash/get';
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
