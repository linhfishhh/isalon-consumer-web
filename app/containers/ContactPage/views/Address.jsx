import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Divider, Link } from '@material-ui/core';
import styles from 'assets/styles';
import Img from 'components/Img';
import get from 'lodash/get';
import Map from './Map';
import useStyles from '../styles';

function Address(props) {
  const classes = useStyles();
  const globalStyle = styles();

  const { cfg } = props;
  const address = useMemo(() => {
    const contactBrands = get(cfg, 'theme_contact_brands');
    if (contactBrands) {
      const keys = Object.keys(contactBrands);
      if (keys && keys.length > 0) {
        return contactBrands[keys[0]];
      }
    }
    return {};
  }, [cfg]);

  const location = useMemo(() => {
    const l = address.location;
    return {
      lat: parseFloat(get(l, 'lat', '0')),
      lng: parseFloat(get(l, 'lng', '0')),
      zoom: parseFloat(get(l, 'zoom', '0')),
    };
  }, [address]);

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.featureHeadline}>Địa chỉ</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography className={classes.subFeatureContent}>
                Hotline:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.phone}>
                {cfg.theme_contact_hotline}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography className={classes.subFeatureHeadline}>
            {address.title}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography className={classes.subFeatureContent}>
                Địa chỉ:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.subFeatureContent}>
                {address.address}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography className={classes.subFeatureContent}>
                Email:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.subFeatureContent}>
                {address.email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography className={classes.subFeatureContent}>
                SĐT:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.subFeatureContent}>
                {address.phone}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography className={classes.subFeatureContent}>
                Fax:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.subFeatureContent}>
                {address.fax}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Map location={location} />
        </Grid>
      </Grid>
    </div>
  );
}

Address.propTypes = {
  cfg: PropTypes.object,
};

export default memo(Address);
