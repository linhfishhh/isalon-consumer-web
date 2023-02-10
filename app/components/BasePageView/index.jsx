import React, { memo, useRef, useState, useLayoutEffect } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import BaseContent from './BaseContent';

const useStyles = makeStyles(() => ({
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2,
    overflow: 'hidden',
  },
  slotFixed: {
    position: 'fixed',
    top: 0,
    width: '100%',
  },
}));

const BasePageView = props => {
  const {
    className,
    children,
    header,
    slotFixed,
    contentProps,
    getHeaderHeight,
  } = props;
  const headerRef = useRef();
  const classes = useStyles(props);

  const [heightHeader, setHeightHeader] = useState();

  useLayoutEffect(() => {
    if (headerRef && headerRef.current) {
      const { height } = headerRef.current.getBoundingClientRect();
      setHeightHeader(height);
      if (getHeaderHeight) {
        getHeaderHeight(height);
      }
    }
  }, [headerRef]);

  return (
    <>
      {isMobileOnly ? (
        <div className={`${classes.wrapper} ${className}`}>
          {slotFixed && <div className={classes.slotFixed}>{slotFixed}</div>}
          <div id="header" ref={headerRef} className={classes.header}>
            {header}
          </div>
          <BaseContent paddingTop={heightHeader} {...contentProps}>
            {children}
          </BaseContent>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

BasePageView.defaultProps = {
  className: '',
  contentProps: {},
};

BasePageView.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  header: PropTypes.node,
  slotFixed: PropTypes.node,
  getHeaderHeight: PropTypes.func,
  contentProps: PropTypes.shape({
    className: PropTypes.string,
    style: PropTypes.object,
    onRefresh: PropTypes.func,
    onLoadMore: PropTypes.func,
    hasMore: PropTypes.bool,
    cornerRadiusColor: PropTypes.oneOf(['primary', 'grey']),
    paddingBottom: PropTypes.number,
  }),
};

export default memo(BasePageView);
