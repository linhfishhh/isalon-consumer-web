import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import styles from 'assets/styles';
import Img from 'components/Img';
import get from 'lodash/get';
import useStyles from '../styles';

function Partner(props) {
  const classes = useStyles();
  const globalStyle = styles();

  const { cfg } = props;
  const partners = useMemo(() => {
    const fl = get(cfg, 'theme_config_manager_logos', {});
    const keys = Object.keys(fl);
    return keys.map(k => get(fl, k, {}));
  }, [cfg]);

  return (
    <div id="partners">
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography className={classes.featureHeadline}>
                Đối tác của chúng tôi
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={5} className={classes.partnerContent}>
                {partners.map((item, index) => (
                  <Grid item key={item.id || index} xs={3}>
                    <a href={item.link}>
                      <Img src={item.logo} />
                    </a>
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

Partner.propTypes = {
  cfg: PropTypes.object,
};

export default memo(Partner);
