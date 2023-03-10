/**
 *
 * InviteFriends
 *
 */

import React, { memo, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import copy from 'copy-to-clipboard';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';

import CloseIcon from '@material-ui/icons/Close';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import { isMobileOnly } from 'utils/platform';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { webShareApi } from 'utils/share';
import { useWallet } from 'utils/hooks';
import { currencyFormat } from 'utils/stringFormat';

import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import Transition from 'components/Transition';

import { showDialogAction } from './actions';
import { CONTEXT } from './constants';
import { makeSelectShowDialog } from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  wrapper: {
    borderRadius: isMobileOnly ? 0 : theme.spacing(6),
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  content: {
    padding: isMobileOnly ? theme.spacing(4) : theme.spacing(8),
  },
  title: {
    fontFamily: theme.typography.fontMedium,
    textTransform: 'uppercase',
  },
  subTitle: {
    margin: theme.spacing(4, 0),
    '& b': {
      fontFamily: theme.typography.fontMedium,
      fontWeight: 'bold',
      color: theme.palette.primary.main,
    },
  },
  link: {
    height: 44,
    borderRadius: 22,
  },
  shareWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    textTransform: 'uppercase',
    height: 44,
    borderRadius: 22,
  },
  snackbar: {},
}));

export function InviteFriends(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const { open, closeDialog } = props;
  const classes = useStyles();
  const { wallet } = useWallet();
  const [openSnack, setOpenSnack] = useState(false);
  const { affiliateSettings } = wallet;

  const handleCopy = useCallback(() => {
    copy(wallet.affiliateLink);
    setOpenSnack(true);
  }, [wallet]);

  const invitee = useMemo(
    () =>
      affiliateSettings
        ? {
            coin: affiliateSettings.inviteeReward,
            amount:
              affiliateSettings.inviteeReward * affiliateSettings.exchangeRate,
          }
        : { coin: 0, amount: 0 },
    [affiliateSettings],
  );
  const inviter = useMemo(
    () =>
      affiliateSettings
        ? {
            coin: affiliateSettings.inviterReward,
            amount:
              affiliateSettings.inviterReward * affiliateSettings.exchangeRate,
          }
        : { coin: 0, amount: 0 },
    [wallet],
  );

  const handleCloseSnackBar = useCallback(() => {
    setOpenSnack(false);
  }, []);

  const handleShare = () => {
    const dataShare = {
      title: 'L??m ?????p v???i nh???ng ??u ????i kh??ng gi???i h???n c??ng iSalon!',
      text: `B???n ??i! Nh???n ngay ${currencyFormat(invitee.amount)} (${
        invitee.coin
      } xu isalon) khi ????ng k?? th??nh vi??n c???a iSalon. Th???a s???c mua s???m v?? l??m ?????p kh??ng gi???i h???n. ????ng k?? ngay nh??!`,
      url: wallet.affiliateLink,
    };
    webShareApi(dataShare);
  };

  return (
    <Dialog
      fullScreen={isMobileOnly}
      aria-labelledby="simple-dialog-title"
      open={open}
      TransitionComponent={Transition}
      PaperProps={{ className: classes.wrapper }}
    >
      <BasePageView
        header={
          <Navigation
            title="M???i b???n b??"
            backButtonProps={{
              type: 'action',
              icon: 'close',
              action: closeDialog,
            }}
          />
        }
        contentProps={{
          cornerRadiusColor: 'primary',
        }}
      >
        <div className={classes.content}>
          {!isMobileOnly && (
            <IconButton onClick={closeDialog} className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
          )}
          <Typography variant="h3" className={classes.title}>
            L??m ?????p v???i nh???ng ??u ????i kh??ng gi???i h???n c??ng iSalon!
          </Typography>
          <Typography className={classes.subTitle}>
            Khi m???t ng?????i b???n ho??n t???t ????ng k?? th??nh vi??n, B???N s??? ???????c t??ch l??y{' '}
            <b>{inviter.coin} xu</b> iSalon v??o t??i kho???n, NG?????I NH???N c??ng s???
            ???????c t??ch l??y <b>{invitee.coin} xu</b> iSalon. (1 xu = 1.000??)
          </Typography>
          <Typography className={classes.subTitle}>
            H??y chia s??? ??i???u n??y, ????? c?? tr???i nghi???m ?????t ch??? v?? mua s???n ph???m c???a
            iSalon v???i nh???ng ??u ????i kh??ng gi???i h???n nh??!
          </Typography>
          <Grid
            container
            direction={isMobileOnly ? 'column' : 'row'}
            spacing={2}
            alignItems={isMobileOnly ? 'stretch' : 'center'}
          >
            <Grid item xs>
              <TextField
                value={wallet.affiliateLink}
                variant="outlined"
                margin="dense"
                fullWidth
                InputProps={{
                  className: classes.link,
                  endAdornment: isMobileOnly && (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCopy} edge="end">
                        <FileCopyOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  inputProps: { readOnly: true },
                }}
              />
            </Grid>
            <Grid item className={isMobileOnly ? classes.shareWrapper : ''}>
              <Button
                variant="contained"
                color="primary"
                onClick={isMobileOnly ? handleShare : handleCopy}
                className={classes.button}
                startIcon={!isMobileOnly && <FileCopyOutlinedIcon />}
                disableElevation
              >
                {isMobileOnly ? 'G???i link cho b???n b??' : ' Sao ch??p'}
              </Button>
            </Grid>
          </Grid>
        </div>
      </BasePageView>
      <Snackbar
        open={openSnack}
        ContentProps={{ className: classes.snackbar }}
        onClose={handleCloseSnackBar}
        message={<Typography>???? sao ch??p</Typography>}
        autoHideDuration={3000}
      />
    </Dialog>
  );
}

InviteFriends.propTypes = {
  open: PropTypes.bool,
  closeDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  open: makeSelectShowDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    closeDialog: () => dispatch(showDialogAction(false)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InviteFriends);
