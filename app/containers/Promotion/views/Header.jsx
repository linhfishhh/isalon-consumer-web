import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {},
  subTitle: {
    marginTop: theme.spacing(2),
    color: theme.palette.grey[500],
  },
  username: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

function Header(props) {
  const { authenticated, user, goToAccountTab } = props;

  const classes = useStyles();

  return (
    <>
      {authenticated ? (
        <Grid container>
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              {`Xin chào, `}
            </Typography>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography
              className={classes.username}
              variant="h4"
              onClick={goToAccountTab}
              noWrap
            >
              {user.name}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h4">Xin chào bạn!</Typography>
      )}
      <Typography className={classes.subTitle}>
        Chúng tôi gửi tới bạn những dịch vụ hot nhất ngày hôm nay!
      </Typography>
    </>
  );
}

Header.propTypes = {
  authenticated: PropTypes.bool,
  user: PropTypes.object,
  goToAccountTab: PropTypes.func,
};

export default memo(Header);
