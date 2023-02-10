import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  panel: {},
  content: {
    paddingTop: theme.spacing(4),
  },
}));

function TabContent(props) {
  const { className = '', children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <Typography
      className={`${classes.panel} ${className}`}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabcontent-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <div className={classes.content}>{children}</div>
    </Typography>
  );
}

TabContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default memo(TabContent);
