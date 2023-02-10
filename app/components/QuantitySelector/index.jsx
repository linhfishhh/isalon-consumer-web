import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton } from '@material-ui/core';
import MinusIcon from '@material-ui/icons/RemoveOutlined';
import PlusIcon from '@material-ui/icons/AddOutlined';

const useStyles = makeStyles(theme => ({
  root: {},
  key: {
    color: theme.palette.textColor[8],
  },
  iconButton: {
    backgroundColor: '#f2f2f2',
    border: '1px solid #d0d2d3',
  },
  icon: {
    color: '#222222',
  },
  quantity: {
    fontSize: 18,
    color: '#222222',
  },
}));

function QuantitySelector(props) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const { onChange, defaultQuantity } = props;
  useEffect(() => {
    setQuantity(defaultQuantity);
  }, [defaultQuantity]);

  const onMinus = () => {
    if (quantity > 1) {
      const q = quantity - 1;
      setQuantity(q);
      if (onChange) {
        onChange(q, true);
      }
    }
  };
  const onPlus = () => {
    const q = quantity + 1;
    setQuantity(q);
    if (onChange) {
      onChange(q, false);
    }
  };

  return (
    <Grid container className={classes.root} spacing={3} alignItems="center">
      <Grid item>
        <Typography display="inline" className={classes.key}>
          Số lượng
        </Typography>
      </Grid>
      <Grid item>
        <Typography display="inline" className={classes.quantity}>
          {quantity}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <IconButton
              className={classes.iconButton}
              size="small"
              onClick={onMinus}
            >
              <MinusIcon fontSize="small" className={classes.icon} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              className={classes.iconButton}
              size="small"
              onClick={onPlus}
            >
              <PlusIcon fontSize="small" className={classes.icon} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

QuantitySelector.defaultProps = {
  defaultQuantity: 1,
};

QuantitySelector.propTypes = {
  onChange: PropTypes.func,
  defaultQuantity: PropTypes.number,
};

export default memo(QuantitySelector);
