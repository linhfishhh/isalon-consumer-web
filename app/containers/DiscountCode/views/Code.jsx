import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { ButtonBase } from '@material-ui/core';
import { currencyFormat } from 'utils/stringFormat';
import get from 'lodash/get';
import format from 'date-fns/format';
import { toDate } from 'date-fns-tz';
import { isMobileOnly } from 'utils/platform';

const rowStyles = makeStyles(theme => ({
  root: {
    // minWidth: 500,
    height: isMobileOnly ? 'auto' : 80,
    backgroundColor: '#FFF',
    // borderRadius: 5,
    padding: 0,
    marginBottom: theme.spacing(4),
    overflow: 'hidden',
  },
  applyButtonHolder: {
    position: 'relative',
    fontSize: 15,
    color: '#ffff',
    fontWeight: 'bold',
    padding: '2px 3px',
    backgroundColor: theme.palette.primary.main,
    height: 80,
    width: 90,
    textAlign: 'center',
    '&:before': {
      borderBottom: `80px solid ${theme.palette.primary.main}`,
      borderLeft: `15px solid transparent`,
      content: "''",
      position: 'absolute',
      left: -15,
      bottom: 0,
    },
  },
  applyButtonHolderMobile: {
    // fontSize: 15,
    // color: '#ffff',
    // fontWeight: 'bold',
    padding: '2px 3px',
    backgroundColor: theme.palette.primary.main,
    height: 50,
    width: '100%',
    // textAlign: 'center',
  },
  codeContainer: {
    width: isMobileOnly ? '100%' : 100,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  code: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    width: 2,
    height: 60,
    backgroundColor: '#222222',
  },
  dividerMobile: {
    width: '100%',
    height: 1,
    backgroundColor: '#969696',
  },
  detailContainer: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: isMobileOnly ? 'center' : 'left',
  },
  detailDate: {
    fontSize: 14,
    color: '#969696',
    textAlign: isMobileOnly ? 'center' : 'left',
  },
  discountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  applyText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  grid1: {
    padding: theme.spacing(2),
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function Code(props) {
  const classes = rowStyles();
  const { data, onApplyGiftCode } = props;

  const [discountMessage, applyAmount] = useMemo(() => {
    const cash = get(data, 'giftPackage.cash');
    const percent = get(data, 'giftPackage.percent');
    const appliedCash = get(data, 'giftPackage.appliedCash');
    const maxCash = get(data, 'giftPackage.maxCash');
    let msg = 'Giảm giá';
    let amount = '';
    if (cash) {
      msg += ` ${currencyFormat(cash)}`;
      amount = currencyFormat(cash);
    } else if (percent) {
      amount = `${percent}%`;
      msg += ` ${amount}`;
    }
    if (appliedCash) {
      msg += ` cho đơn hàng từ ${currencyFormat(appliedCash)}`;
    }
    if (maxCash) {
      msg += ` , tối đa ${currencyFormat(maxCash)}`;
    }
    return [msg, amount];
  }, [data]);

  const duration = useMemo(() => {
    const startAt = get(data, 'giftPackage.startAt');
    const expireAt = get(data, 'giftPackage.expiredAt');
    const s = format(toDate(startAt, { timeZone: 'UTC' }), 'dd/MM');
    const e = format(toDate(expireAt, { timeZone: 'UTC' }), 'dd/MM/yyyy');
    return `Từ ${s} đến ${e}`;
  }, [data]);

  const onApply = useCallback(() => {
    if (onApplyGiftCode) {
      onApplyGiftCode(get(data, 'code', ''), applyAmount);
    }
  }, [data, applyAmount]);

  return (
    <Paper className={classes.root}>
      {isMobileOnly ? (
        <div className={classes.col}>
          <Grid
            container
            className={classes.grid1}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item>
              <Typography display="inline" className={classes.code}>
                {get(data, 'code', '')}
              </Typography>
            </Grid>
            <Grid item className={classes.dividerMobile}>
              <Divider
                orientation={isMobileOnly ? 'horizontal' : 'vertical'}
                flexItem
                className={classes.dividerMobile}
              />
            </Grid>
            <Grid item>
              <Typography className={classes.detailTitle}>
                {discountMessage}
              </Typography>
            </Grid>
            <Grid item>
              <Typography display="inline" className={classes.detailDate}>
                {duration}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.applyButtonHolderMobile}
            justify="center"
            alignItems="center"
            onClick={onApply}
          >
            <Grid item xs={12}>
              <Typography className={classes.discountValue}>
                {applyAmount}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.applyText}>ÁP DỤNG</Typography>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Grid container alignItems="center">
          <Grid item xs>
            <Grid container alignItems="center">
              <Grid item className={classes.codeContainer}>
                <Typography display="inline" className={classes.code}>
                  {get(data, 'code', '')}
                </Typography>
              </Grid>
              <Grid item>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.divider}
                />
              </Grid>
              <Grid item xs className={classes.detailContainer}>
                <Grid container direction="column" justify="center">
                  <Grid item>
                    <Typography
                      display="inline"
                      className={classes.detailTitle}
                    >
                      {discountMessage}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography display="inline" className={classes.detailDate}>
                      {duration}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ButtonBase className={classes.applyButtonHolder} onClick={onApply}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography
                    display="inline"
                    className={classes.discountValue}
                  >
                    {applyAmount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography display="inline" className={classes.applyText}>
                    ÁP DỤNG
                  </Typography>
                </Grid>
              </Grid>
            </ButtonBase>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}

Code.propTypes = {
  data: PropTypes.object,
  onApplyGiftCode: PropTypes.func,
};

export default memo(Code);
