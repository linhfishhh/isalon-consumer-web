import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import styles from 'assets/styles';
import Img from 'components/Img';
import useStyles from '../styles';

function Review(props) {
  const classes = useStyles();
  const globalStyle = styles();

  const { cfg } = props;

  return (
    <div className={classes.reviewRoot} id="feedback">
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <Grid container wrap="nowrap" spacing={4} alignItems="center">
            <Grid item data-aos="fade-right">
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Typography className={classes.featureHeadline}>
                    {cfg.theme_config_manager_tes_title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.subFeatureContent2}>
                    {`"${cfg.theme_config_manager_tes_content}"`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.subFeatureTitle2}>
                    {cfg.theme_config_manager_tes_cus_name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.subFeatureContent2}>
                    {cfg.theme_config_manager_tes_cus_job}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Img
                data-aos="fade-left"
                src={cfg.theme_config_manager_tes_cus_image}
                className={classes.parnerAvatar}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

Review.propTypes = {
  cfg: PropTypes.object,
};

export default memo(Review);
