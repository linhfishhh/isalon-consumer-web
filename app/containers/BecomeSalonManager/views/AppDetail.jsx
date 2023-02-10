import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import styles from 'assets/styles';
import Img from 'components/Img';
import useStyles from '../styles';

function AppDetail(props) {
  const classes = useStyles();
  const globalStyle = styles();

  const { cfg } = props;

  return (
    <div>
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <Grid container direction="column" alignItems="center">
            <Grid item data-aos="fade-down">
              <Typography className={classes.featureHeadline}>
                {cfg.theme_config_manager_app_manager_title}
              </Typography>
            </Grid>
            <Grid item data-aos="fade-down">
              <Typography className={classes.subFeatureHeadline}>
                {cfg.theme_config_manager_app_manager_content}
              </Typography>
            </Grid>
            <Grid item data-aos="fade-down">
              <Img
                src={cfg.theme_config_manager_app_manager_image}
                resize="contain"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

AppDetail.propTypes = {
  cfg: PropTypes.object,
};

export default memo(AppDetail);
