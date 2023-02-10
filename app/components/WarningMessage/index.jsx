/**
 *
 * WarningMessage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import shortid from 'shortid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    borderRadius: 4,
    padding: theme.spacing(2),
    display: 'flex',
    background: 'white',
    minWidth: 200,
    flexDirection: 'row',
  },
  message: {
    color: theme.palette.error.main,
    fontSize: 12,
  },
  ul: {
    color: theme.palette.error.main,
    margin: 0,
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));
function WarningMessage(props) {
  const { messages, className } = props;
  const classes = useStyles();
  return (
    <Alert severity="error" className={`${classes.root} ${className}`}>
      <ul className={classes.ul}>
        {messages.map(message => (
          <li key={shortid()}>
            <Typography display="inline" className={classes.message}>
              {message}
            </Typography>
          </li>
        ))}
      </ul>
    </Alert>
  );
}

WarningMessage.propTypes = {
  messages: PropTypes.array,
  className: PropTypes.string,
};

export default memo(WarningMessage);
