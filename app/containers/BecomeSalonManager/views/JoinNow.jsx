import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core';
import styles from 'assets/styles';
import Img from 'components/Img';
import get from 'lodash/get';
import useStyles from '../styles';

function JoinNow(props) {
  const classes = useStyles();
  const globalStyle = styles();

  const { cfg } = props;

  return (
    <div>
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography className={classes.featureHeadline}>
                {cfg.theme_config_manager_form_title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.subFeatureHeadline}>
                {cfg.theme_config_manager_form_desc}
              </Typography>
            </Grid>
            <Grid item className={classes.joinNowContainer}>
              <a
                href="http://bit.ly/2CKeLlK"
                target="_blank"
                className={classes.joinNowButton}
              >
                <Typography className={classes.joinNowButtonText}>
                  Tham gia ngay
                </Typography>
              </a>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

JoinNow.propTypes = {
  cfg: PropTypes.object,
};

export default memo(JoinNow);
