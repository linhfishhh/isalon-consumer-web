import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Link } from '@material-ui/core';
import styles from 'assets/styles';
import Img from 'components/Img';
import AppstoreIcon from 'assets/images/appstore.png';
import PlaystoreIcon from 'assets/images/playstore.png';
import useStyles from '../styles';

function InstallApp(props) {
  const classes = useStyles();
  const globalStyle = styles();

  const { cfg } = props;

  return (
    <div className={classes.installAppRoot} id="install-app">
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container direction="column" data-aos="fade-right">
                <Grid item>
                  <Typography className={classes.subFeatureTitle}>
                    {cfg.theme_config_manager_app_link_title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.subFeatureContent2}>
                    {cfg.theme_config_manager_app_link_desc}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    spacing={3}
                    className={classes.storeIconContent}
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item>
                      <a href={cfg.theme_master_mobile_app_android}>
                        <Img
                          src={PlaystoreIcon}
                          resizeMode="contain"
                          className={classes.storeIcon}
                        />
                      </a>
                    </Grid>
                    <Grid item>
                      <a href={cfg.theme_master_mobile_app_ios}>
                        <Img
                          src={AppstoreIcon}
                          resizeMode="contain"
                          className={classes.storeIcon}
                        />
                      </a>
                    </Grid>
                    <Grid item>
                      <Typography
                        className={classes.subFeatureContent2}
                        display="inline"
                      >
                        Trên trang web tại
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Link href="https://isalon.vn">https://isalon.vn</Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} data-aos="fade-left">
              <Img
                src={cfg.theme_config_manager_app_link_image}
                resizeMode="contain"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

InstallApp.propTypes = {
  cfg: PropTypes.object,
};

export default memo(InstallApp);
