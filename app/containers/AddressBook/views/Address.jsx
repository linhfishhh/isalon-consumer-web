import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';
import { path, createPath } from 'routers/path';
import { normalizePhoneNumber } from 'utils/helper';
import AlertDialog from 'components/AlertDialog';

const useStyles = makeStyles(theme => ({
  root: {
    borderStyle: 'dashed',
    width: '100%',
    height: 'auto',
    borderRadius: 4,
    borderColor: theme.palette.primary.main,
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    borderWidth: 1,
  },
  title_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  normal_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
  },
  detail_text: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
  },
  default_address: {
    color: theme.palette.secondary.main,
    textAlign: 'left',
    marginLeft: theme.spacing(3),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  delete_btn: {
    // width: 80,
  },
}));

function Address(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data = {}, onDelete } = props;

  const [showAlert, setShowAlert] = useState(false);

  const editAddress = () => {
    const addressId = get(data, 'addressId', '');
    const route = createPath(path.addressBookEdit, {
      addressId,
    });
    history.push(route, { addressId });
  };

  const deleteAddress = () => {
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const confirmAlert = () => {
    setShowAlert(false);
    if (onDelete) {
      const addressId = get(data, 'addressId', '');
      onDelete(addressId);
    }
  };

  return (
    <Box className={classes.root}>
      <Grid container direction="column">
        <Grid item xs>
          <Grid container direction="row" className={classes.row}>
            <Grid item>
              <Typography className={classes.title_text}>
                {get(data, 'name', '')}
              </Typography>
            </Grid>
            {get(data, 'isDefault', false) ? (
              <Grid item>
                <Typography className={classes.default_address}>
                  Địa chỉ mặc định
                </Typography>
              </Grid>
            ) : null}
            <Grid item xs />
            {!get(data, 'isDefault', false) ? (
              <Grid item className={classes.delete_btn}>
                <Button color="primary" onClick={deleteAddress}>
                  Xóa
                </Button>
              </Grid>
            ) : (
              <></>
            )}
            <Grid item>
              <Button color="secondary" onClick={editAddress}>
                Chỉnh sửa
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography className={classes.detail_text}>
            Địa chỉ:{' '}
            <Typography component="span" className={classes.normal_text}>
              {get(data, 'addressDetail', '')}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography className={classes.detail_text}>
            SĐT:{' '}
            <Typography component="span" className={classes.normal_text}>
              {normalizePhoneNumber(get(data, 'phone', ''))}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <AlertDialog
        open={showAlert}
        onCancel={closeAlert}
        onConfirm={confirmAlert}
        description="Bạn có chắc muốn xóa địa chỉ này?"
      />
    </Box>
  );
}

Address.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func,
};

export default memo(Address);
