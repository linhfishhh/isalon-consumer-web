/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Link,
  Grid,
  Button,
  IconButton,
  Typography,
  InputBase,
} from '@material-ui/core';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';

import styles from 'assets/styles';
import Img from 'components/Img';
import Logo from 'assets/images/logo_white.png';
import useStyles from '../styles';

function Header(props) {
  const classes = useStyles();
  const globalStyle = styles();

  const { cfg } = props;

  const onJoinNow = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight || document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const jumpTo = id => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={classes.header}>
      <AppBar position="static" className={classes.appbar} elevation={0}>
        <Toolbar className={globalStyle.container}>
          <div className={classes.logo}>
            <Link href="/">
              <Img src={Logo} alt="isalon" resizeMode="contain" />
            </Link>
          </div>
          <Grid container alignItems="center" spacing={4}>
            <Grid item>
              <Link
                className={classes.headerItem}
                onClick={() => jumpTo('gioi-thieu')}
              >
                GIỚI THIỆU
              </Link>
            </Grid>
            <Grid item>
              <Link
                className={classes.headerItem}
                onClick={() => jumpTo('install-app')}
              >
                ỨNG DỤNG
              </Link>
            </Grid>
            <Grid item>
              <Link
                className={classes.headerItem}
                onClick={() => jumpTo('app-detail')}
              >
                TÍNH NĂNG
              </Link>
            </Grid>
            <Grid item>
              <Link
                className={classes.headerItem}
                onClick={() => jumpTo('partners')}
              >
                ĐỐI TÁC
              </Link>
            </Grid>
            <Grid item>
              <Link
                className={classes.headerItem}
                onClick={() => jumpTo('feedback')}
              >
                Ý KIẾN KHÁCH HÀNG
              </Link>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                className={classes.startButton}
                onClick={onJoinNow}
              >
                Bắt đầu
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={globalStyle.container}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              className={classes.headerTitle}
              component="div"
              dangerouslySetInnerHTML={{
                __html: cfg.theme_config_manager_intro_text_1,
              }}
            />
          </Grid>
          <Grid item>
            <Typography className={classes.subHeaderTitle}>
              {cfg.theme_config_manager_intro_text_2}
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              alignItems="center"
              className={classes.writeEmailContainer}
            >
              <Grid item xs>
                <div className={classes.emailContainer}>
                  <InputBase
                    className={classes.emailTextField}
                    margin="dense"
                    placeholder="Cho chúng tôi biết email hoặc số điện thoại của bạn"
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </div>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  className={classes.writeEmailButton}
                  onClick={onJoinNow}
                >
                  THAM GIA NGAY
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography className={classes.subHeaderTitle2}>
              {cfg.theme_config_manager_intro_text_3}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.joinNowText}>
              Tìm hiểu ngay
            </Typography>
          </Grid>
          <Grid item className={classes.arrowMore}>
            <IconButton
              className={classes.arrow}
              onClick={() => jumpTo('gioi-thieu')}
            >
              <ArrowDownwardRoundedIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Header.propTypes = {
  cfg: PropTypes.object,
};

export default memo(Header);
