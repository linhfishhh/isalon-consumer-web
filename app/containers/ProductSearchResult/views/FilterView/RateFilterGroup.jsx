import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, ButtonBase, Divider } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';
/* -------------- Rate Filter Group ------------------ */
function RateFilterGroup(props) {
  const classes = useStyles();
  const { value, onChange } = props;
  const onRatingChange = (e, v) => {
    onChange('rate', v);
  };
  const onReset = () => {
    onChange('rate', 0);
  };
  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.title} display="inline">
            Xếp hạng sao
          </Typography>
        </Grid>
        <Grid item className={classes.tagList}>
          <Grid container>
            <Grid item>
              <Rating
                name="rate"
                className={classes.star}
                value={value}
                size="medium"
                precision={1}
                onChange={onRatingChange}
              />
            </Grid>
            <Grid item xs />
            <Grid item>
              <ButtonBase
                className={classes.tagButtonSelected}
                onClick={onReset}
              >
                Đặt lại
              </ButtonBase>
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

RateFilterGroup.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default memo(RateFilterGroup);
