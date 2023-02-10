/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Link,
  Grid,
  Button,
  Typography,
  InputBase,
} from '@material-ui/core';
import styles from 'assets/styles';
import Img from 'components/Img';
import Logo from 'assets/images/logo_white.png';
import useStyles from '../styles';

function Header(props) {
  const classes = useStyles();
  const globalStyle = styles();

  const { cfg } = props;

  return (
    <div
      style={{
        width: '100%',
        backgroundImage: `url('${cfg.theme_contact_headline_bg}')`,
        backgroundSize: 'cover',
      }}
    >
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <Typography className={classes.contactUsHeadline}>
            {cfg.theme_contact_headline}
          </Typography>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  cfg: PropTypes.object,
};

export default memo(Header);
