import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import { normalizePhoneNumber } from 'utils/helper';
import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  root: {
    border: `dashed 1px ${theme.palette.primary.main}`,
    borderRadius: 4,
    marginBottom: theme.spacing(4),
    padding: isMobileOnly ? theme.spacing(2) : theme.spacing(4),
    cursor: 'pointer',
  },
  title_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  normal_text: {
    color: theme.palette.textColor[1],
  },
  detail_text: {
    color: theme.palette.textColor[2],
  },
}));

function Address(props) {
  const classes = useStyles();
  const { data = {}, onSelect } = props;

  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      alignItems="flex-start"
      onClick={() => onSelect(data)}
    >
      <Grid item xs>
        <Typography className={classes.title_text}>
          {get(data, 'name', '')}
        </Typography>
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
  );
}

Address.propTypes = {
  data: PropTypes.object,
  onSelect: PropTypes.func,
};

export default memo(Address);
