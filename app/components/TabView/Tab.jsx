/**
 *
 * Tab
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tab as MuiTab } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  tab: {
    fontSize: 18,
    fontWeight: 'normal',
    minWidth: 'auto !important',
    padding: 0,
    paddingTop: theme.spacing(2),
  },
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabcontent-${index}`,
  };
}

function Tab(props) {
  const { tabIndex, className, label, icon, ...other } = props;
  const classes = useStyles();
  return (
    <MuiTab
      className={`${classes.tab} ${className}`}
      label={label}
      icon={icon}
      {...a11yProps(tabIndex)}
      {...other}
    />
  );
}
Tab.propTypes = {
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  label: PropTypes.node,
  icon: PropTypes.node,
};
export default memo(Tab);
