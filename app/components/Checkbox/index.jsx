/**
 *
 * Checkbox
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox as MuiCheckbox } from '@material-ui/core';
import Checked from 'assets/svgIcon/checked.svg';
import Unchecked from 'assets/svgIcon/unchecked.svg';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  img: {
    width: props => props.size,
    height: props => props.size,
  },
  root: {
    padding: theme.spacing(1),
  },
}));

function Checkbox(props) {
  const classes = useStyles(props);
  const { onChange, checked, size, ...rest } = props;
  return (
    <MuiCheckbox
      className={classes.root}
      icon={<img className={classes.img} src={Unchecked} alt="unchecked" />}
      checkedIcon={<img className={classes.img} src={Checked} alt="checked" />}
      color="primary"
      onChange={event => onChange(event.target.checked)}
      checked={checked}
      {...rest}
    />
  );
}

Checkbox.defaultProps = {
  size: 25,
  checked: false,
};

Checkbox.propTypes = {
  size: PropTypes.number,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default memo(Checkbox);
