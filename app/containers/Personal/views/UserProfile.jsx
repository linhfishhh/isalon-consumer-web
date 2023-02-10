import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper, Button, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { path } from 'routers/path';

const useStyles = makeStyles(theme => ({
  user_info_container: {
    marginTop: theme.spacing(3),
  },
  user_name_text: {
    color: theme.palette.textColor[1],
    fontWeight: 'bold',
    textAlign: 'left',
  },
  normal_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
  },
  detail_text: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
  },
  paper_profile: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  edit_button: {
    height: 30,
    width: 170,
    borderRadius: 15,
    color: 'white',
    backgroundColor: '#3cb9eb',
    fontWeight: 'normal',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: theme.spacing(5),
  },
  add_address_button: {
    height: 30,
    width: 170,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.palette.textColor[1],
    color: theme.palette.textColor[1],
    backgroundColor: '#fff',
    fontWeight: 'normal',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function UserProfile(props) {
  const { user } = props;

  const classes = useStyles();
  const history = useHistory();
  const addresses = get(user, 'addresses', []);
  const address = addresses.length > 0 ? addresses[0] : null;

  const onEdit = () => {
    history.push(path.editProfile);
  };

  const onViewAddressBook = () => {
    history.push(path.addressBook);
  };

  return (
    <Paper variant="outlined" className={classes.paper_profile}>
      <Typography className={classes.user_name_text}>
        THÔNG TIN CÁ NHÂN
      </Typography>
      <Grid
        container
        className={classes.user_info_container}
        direction="column"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item>
          <Typography className={classes.normal_text} display="inline">
            {`Họ tên: `}
          </Typography>
          <Typography className={classes.detail_text} display="inline">
            {user.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.normal_text} display="inline">
            {`SĐT: `}
          </Typography>
          <Typography className={classes.detail_text} display="inline">
            {user.phone}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.normal_text} display="inline">
            {`Email: `}
          </Typography>
          <Typography className={classes.detail_text} display="inline">
            {user.email}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.normal_text} display="inline">
            {`Giới tính: `}
          </Typography>
          <Typography className={classes.detail_text} display="inline">
            {user.gender}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.normal_text} display="inline">
            {`Ngày sinh: `}
          </Typography>
          <Typography className={classes.detail_text} display="inline">
            {user.birthday}
          </Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Typography className={classes.user_name_text}>Địa chỉ</Typography>
      <Grid
        container
        className={classes.user_info_container}
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Typography display="inline" className={classes.normal_text}>
            {get(address, 'text', '')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className={classes.edit_button}
            disableElevation
            onClick={onEdit}
          >
            Chỉnh sửa thông tin
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            className={classes.add_address_button}
            disableElevation
            onClick={onViewAddressBook}
          >
            Địa chỉ giao hàng
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

UserProfile.propTypes = {
  user: PropTypes.object,
};

export default memo(UserProfile);
