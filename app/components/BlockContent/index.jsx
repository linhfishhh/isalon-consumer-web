/**
 *
 * BlockContent
 *
 */

import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  wrapper: {
    marginTop: isMobileOnly ? 0 : theme.spacing(6),
    padding: isMobileOnly ? theme.spacing(2, 0) : 0,
    display: 'flex',
    flexDirection: 'column',
  },
  titleWrapper: {
    padding: isMobileOnly ? theme.spacing(0, 4) : 0,
    marginBottom: isMobileOnly ? theme.spacing(2) : theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: isMobileOnly ? 16 : 22,
    fontWeight: 'bold',
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
}));

const BlockContent = React.forwardRef((props, ref) => {
  const { className = '', children, title, endAdornmentTitle } = props;
  const classes = useStyle();
  return (
    <div className={`${classes.wrapper} ${className}`} ref={ref}>
      <div className={classes.titleWrapper}>
        {typeof title === 'string' ? (
          <h4 display="inline" className={classes.title}>
            {title}
          </h4>
        ) : (
          title
        )}
        {endAdornmentTitle}
      </div>
      {children}
    </div>
  );
});

BlockContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  endAdornmentTitle: PropTypes.node,
  title: PropTypes.any,
};

export default memo(BlockContent);
