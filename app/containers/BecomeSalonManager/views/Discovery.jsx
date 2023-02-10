import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import styles from 'assets/styles';
import Img from 'components/Img';
import get from 'lodash/get';
import useStyles from '../styles';

function Discovery(props) {
  const classes = useStyles();
  const globalStyle = styles();

  const { cfg } = props;
  const featureList = useMemo(() => {
    const fl = get(cfg, 'theme_config_manager_feature_list', {});
    const keys = Object.keys(fl);
    return keys.map(k => get(fl, k, {}));
  }, [cfg]);

  return (
    <div id="gioi-thieu">
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography
                className={classes.featureHeadline}
                component="div"
                dangerouslySetInnerHTML={{
                  __html: cfg.theme_config_manager_feature_headline,
                }}
              />
            </Grid>
            <Grid item>
              <Typography className={classes.subFeatureHeadline}>
                {cfg.theme_config_manager_feature_headline_sub}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={4}>
                {featureList.map((item, index) => (
                  <Grid
                    item
                    key={item.image || index}
                    xs={12}
                    sm={6}
                    md={4}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Img src={item.image} alt="feature" />
                      </Grid>
                      <Grid item>
                        <Typography className={classes.subFeatureTitle}>
                          {item.title}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.subFeatureContent}>
                          {item.content}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={4} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

Discovery.propTypes = {
  cfg: PropTypes.object,
};

export default memo(Discovery);
