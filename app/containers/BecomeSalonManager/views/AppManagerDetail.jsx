import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import styles from 'assets/styles';
import Img from 'components/Img';
import get from 'lodash/get';
import take from 'lodash/take';
import slice from 'lodash/slice';
import useStyles from '../styles';

function AppManagerDetail(props) {
  const classes = useStyles();
  const globalStyle = styles();

  const { cfg } = props;

  const column1 = useMemo(() => {
    const fl = get(cfg, 'theme_config_manager_app_manager_features', {});
    const keys = Object.keys(fl);
    return take(keys.map(k => get(fl, k, {})), 3);
  }, [cfg]);

  const column2 = useMemo(() => {
    const fl = get(cfg, 'theme_config_manager_app_manager_features', {});
    const keys = Object.keys(fl);
    return slice(keys.map(k => get(fl, k, {})), 3);
  }, [cfg]);

  return (
    <div className={classes.appManagerDetailRoot} id="app-detail">
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <Grid container>
            <Grid item xs={4}>
              <Grid
                container
                direction="column"
                spacing={3}
                justify="space-evenly"
                className={classes.appManagerDetailColumn}
              >
                {column1.map((item, index) => (
                  <Grid
                    item
                    key={item.id || index}
                    data-aos="fade-right"
                    data-aos-delay={index * 100}
                  >
                    <Grid
                      container
                      alignItems="center"
                      wrap="nowrap"
                      spacing={2}
                    >
                      <Grid item>
                        <Img
                          src={item.icon}
                          className={classes.appManagerFeatureIcon}
                        />
                      </Grid>
                      <Grid item>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography className={classes.subFeatureTitle2}>
                              {item.title}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.subFeatureContent2}>
                              {item.content}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Img
                src={cfg.theme_config_manager_app_manager_features_image}
                resizeMode="contain"
              />
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                direction="column"
                spacing={3}
                justify="space-evenly"
                className={classes.appManagerDetailColumn}
              >
                {column2.map((item, index) => (
                  <Grid
                    item
                    key={item.id || index}
                    data-aos="fade-left"
                    data-aos-delay={index * 100}
                  >
                    <Grid
                      container
                      alignItems="center"
                      wrap="nowrap"
                      spacing={3}
                    >
                      <Grid item>
                        <Img
                          src={item.icon}
                          className={classes.appManagerFeatureIcon}
                        />
                      </Grid>
                      <Grid item>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography className={classes.subFeatureTitle2}>
                              {item.title}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.subFeatureContent2}>
                              {item.content}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

AppManagerDetail.propTypes = {
  cfg: PropTypes.object,
};

export default memo(AppManagerDetail);
