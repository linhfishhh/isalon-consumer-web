import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import { isMobileOnly } from 'utils/platform';

import Img from 'components/Img';

import HeaderImage from 'assets/images/affiliateHeader.png';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: '#fff',
  },
  content: {
    padding: isMobileOnly ? theme.spacing(4) : theme.spacing(4, 8, 8, 8),
  },
  step: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f6931d',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: theme.typography.fontMedium,
    fontSize: 24,
    border: 'solid 2px #fff',
  },
  stepLabel: {
    color: theme.palette.grey[800],
    fontFamily: theme.typography.fontMedium,
    fontSize: isMobileOnly ? 15 : 18,
    position: 'absolute',
    transform: `translate(-20%, 0)`,
  },
  line: {
    backgroundColor: '#f6931d',
    height: 5,
  },
  button: {
    textTransform: 'uppercase',
    height: 50,
    fontSize: 18,
    borderRadius: 25,
    padding: theme.spacing(0, 6),
    fontFamily: theme.typography.fontMedium,
  },
  inviterName: {
    margin: theme.spacing(0, 1),
    color: theme.palette.primary.main,
  },
}));

const Entry = props => {
  const { onShowSignIn, affiliateInfo } = props;
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.wrapper}>
      <Grid item>
        <Img src={HeaderImage} />
      </Grid>
      <Grid item className={classes.content}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography
              variant={isMobileOnly ? 'h6' : 'h5'}
              align={isMobileOnly ? 'center' : 'left'}
            >
              Để mở được phần quà từ
              <span className={classes.inviterName}>
                {affiliateInfo.inviterName}
              </span>
              gửi tặng cho bạn, bạn vui lòng hoàn tất 3 bước sau.
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <div className={classes.step}>
                  <CheckOutlinedIcon fontSize="large" />
                </div>
                <Typography className={classes.stepLabel} noWrap>
                  Xác nhận
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Divider className={classes.line} />
              </Grid>
              <Grid item>
                <div className={classes.step}>02</div>
                <Typography className={classes.stepLabel} noWrap>
                  Đăng ký
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Divider className={classes.line} />
              </Grid>
              <Grid item>
                <div className={classes.step}>03</div>
                <Typography className={classes.stepLabel} noWrap>
                  Nhận quà
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container justify="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onShowSignIn}
              disableElevation
            >
              Đăng ký nhận quà
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Entry.propTypes = {
  onShowSignIn: PropTypes.func,
  affiliateInfo: PropTypes.object,
};

export default memo(Entry);
