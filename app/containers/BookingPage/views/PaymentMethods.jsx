/**
 *
 * PaymentMethod
 *
 */
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { isMobileOnly } from 'utils/platform';

import SelectionList from 'components/SelectionList';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(4),
  },
}));

function PaymentMethods(props) {
  const { salonInfo, onChange } = props;
  const classes = useStyle();
  const [method, setMethod] = useState({});

  useEffect(() => {
    if (salonInfo.paymentMethods && salonInfo.paymentMethods.length > 0) {
      setMethod(salonInfo.paymentMethods[0]);
    }
    return () => {
      setMethod({});
    };
  }, [salonInfo]);

  useEffect(() => {
    if (!isEmpty(method)) {
      onChange(method);
    }
  }, [method]);

  const renderLabel = item => (
    <Typography variant="h5" className={classes.title}>
      {item.title}
    </Typography>
  );

  const renderCaption = item => (
    <Typography variant="caption" className={classes.desc}>
      {item.desc}
    </Typography>
  );

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12}>
        <Typography variant="h4" color="secondary">
          Hình thức thanh toán
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SelectionList
          data={salonInfo.paymentMethods}
          renderLabel={renderLabel}
          renderCaption={renderCaption}
          selected={[method]}
          onSelected={selected => setMethod(selected[0])}
          listItemProps={
            isMobileOnly
              ? { dense: true, disableGutters: true }
              : { disableGutters: true }
          }
        />
      </Grid>
    </Grid>
  );
}

PaymentMethods.propTypes = {
  salonInfo: PropTypes.object,
  onChange: PropTypes.func,
};

export default memo(PaymentMethods);
