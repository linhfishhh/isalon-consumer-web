import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { coinFormat } from 'utils/stringFormat';
import { WalletIcon } from 'assets/svgIcon/WalletIcon';
import { ReactComponent as MoneyIcon } from 'assets/icons/money.svg';
import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: isMobileOnly ? 0 : theme.spacing(1),
    color: theme.palette.grey[900],
  },
  vertical: {
    padding: theme.spacing(6, 0, 15, 0),
    border: isMobileOnly ? 'none' : 'solid 1px #ddd',
  },
  horizontal: {},
  bigIcon: {
    width: 150,
  },
  icon: {
    marginRight: theme.spacing(4),
  },
  iconVertical: {
    marginBottom: theme.spacing(4),
  },
  label: {
    fontFamily: theme.typography.fontMedium,
    fontSize: 16,
    textAlign: 'center',
  },
  amount: {
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontMedium,
    fontSize: 30,
    textAlign: 'center',
  },
}));

function WalletSummary(props) {
  const classes = useStyles();
  const { type, amount } = props;
  const isVertical = type === 'vertical';
  const direction = isVertical ? 'column' : 'row';

  return (
    <Grid
      container
      direction={direction}
      className={`${classes.wrapper} ${classes[type]}`}
      alignItems="center"
    >
      <Grid item className={isVertical ? classes.iconVertical : classes.icon}>
        {isVertical ? (
          <MoneyIcon className={classes.bigIcon} />
        ) : (
          <WalletIcon />
        )}
      </Grid>
      <Grid item>
        <Typography className={classes.label}>Bạn đang có</Typography>
        <Typography className={classes.amount}>
          {`${coinFormat(amount)}`}
        </Typography>
      </Grid>
    </Grid>
  );
}

WalletSummary.defaultProps = {
  type: 'horizontal',
};

WalletSummary.propTypes = {
  type: PropTypes.oneOf(['vertical', 'horizontal']),
  amount: PropTypes.number,
};

export default memo(WalletSummary);
