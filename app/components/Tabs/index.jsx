import React, { memo, useState, useEffect } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MuiTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingLeft: theme.spacing(2),
    '& button': {
      zIndex: 1,
    },
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.warning.main,
      height: theme.spacing(8),
      borderRadius: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  },
}));

function Tabs(props) {
  const { items, renderLabel, onChanged, centered = false } = props;
  const classes = useStyles();

  const [value, setValue] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (typeof value !== 'undefined') {
      onChanged(items[value]);
    }
  }, [value]);

  return (
    <MuiTabs
      className={classes.wrapper}
      value={value || 0}
      onChange={handleChange}
      indicatorColor="primary"
      variant={centered ? 'standard' : 'scrollable'}
      scrollButtons="auto"
      centered={centered}
    >
      {items.map(item => (
        <Tab key={shortid.generate()} label={renderLabel(item)} />
      ))}
    </MuiTabs>
  );
}

Tabs.propTypes = {
  items: PropTypes.array,
  renderLabel: PropTypes.func,
  onChanged: PropTypes.func,
  centered: PropTypes.bool,
};

export default memo(Tabs);
