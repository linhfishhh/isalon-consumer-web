import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Divider, TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import useStyles from './styles';
/* -------------- Custom TextField ------------------- */
function CustomTextField(props) {
  return <TextField {...props} variant="outlined" margin="dense" fullWidth />;
}

/* -------------- Price Filter Group ------------------ */
function PriceFilterGroup(props) {
  const classes = useStyles();
  const { onChange, startPrice = '', endPrice = '' } = props;

  const onStartChange = value => {
    const { floatValue } = value;
    if (onChange) {
      onChange('startPrice', floatValue);
    }
  };

  const onEndChange = value => {
    const { floatValue } = value;
    if (onChange) {
      onChange('endPrice', floatValue);
    }
  };

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.title} display="inline">
            Giá
          </Typography>
        </Grid>
        <Grid item className={classes.tagList}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <NumberFormat
                thousandSeparator
                suffix="₫"
                placeholder="Tối thiểu"
                customInput={CustomTextField}
                onValueChange={onStartChange}
                value={startPrice}
              />
            </Grid>
            <Grid item>-</Grid>
            <Grid item xs={5}>
              <NumberFormat
                thousandSeparator
                suffix="₫"
                placeholder="Tối đa"
                customInput={CustomTextField}
                onValueChange={onEndChange}
                value={endPrice}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
      </Grid>
    </div>
  );
}

PriceFilterGroup.propTypes = {
  onChange: PropTypes.func,
  startPrice: PropTypes.number,
  endPrice: PropTypes.number,
};

export default memo(PriceFilterGroup);
