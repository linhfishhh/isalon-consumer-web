import React, { memo, useRef, useLayoutEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import { isIOS } from 'react-device-detect';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { makeStyles } from '@material-ui/core/styles';

import pullToRefresh from 'mobile-pull-to-refresh';
import ptrAnimatesIOS from 'mobile-pull-to-refresh/dist/styles/ios/animates';
import ptrAnimatesMaterial from 'mobile-pull-to-refresh/dist/styles/material/animates';

import InfiniteScroll from 'react-infinite-scroll-component';

import { secondaryColor } from 'assets/colors';
import { useStackPage } from 'utils/hooks';

import TopCornerRadius from 'components/TopCornerRadius';
import SpinnerPTR from './SpinnerPTR';

const useStyles = makeStyles(theme => ({
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingTop: props =>
      !isUndefined(props.paddingTop)
        ? `${props.paddingTop}px`
        : 'env(safe-area-inset-top)',
    paddingBottom: props =>
      `calc(${props.paddingBottom}px + env(safe-area-inset-bottom))`,
  },
  firstPage: {
    paddingTop: props =>
      `calc(${props.paddingTop}px + env(safe-area-inset-top)`,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'unset !important',
  },
  loadMore: {
    margin: theme.spacing(4, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const BaseContent = props => {
  const {
    children,
    className,
    onRefresh,
    onLoadMore,
    hasMore,
    cornerRadiusColor,
    paddingTop,
    dataLength,
    scrollableTarget,
  } = props;

  const contentRef = useRef();
  const classes = useStyles(props);
  const { isFirstPage } = useStackPage();

  const animate = isIOS ? ptrAnimatesIOS : ptrAnimatesMaterial;
  const classPTR = isIOS ? 'pull-to-refresh-ios' : 'pull-to-refresh-material';
  const firstPageClass = isFirstPage ? classes.firstPage : '';
  const contentClass = `${
    classes.mainContent
  } ${classPTR} ${className} ${firstPageClass}`;

  useLayoutEffect(() => {
    if (contentRef && contentRef.current && onRefresh) {
      pullToRefresh({
        container: contentRef.current,
        animates: animate,
        refresh: () => {
          onRefresh();
          return new Promise(resolve => {
            setTimeout(resolve, 2000);
          });
        },
      });
    }
  }, [contentRef]);

  const handleLoadMore = useCallback(() => {
    if (onLoadMore) {
      onLoadMore();
    }
  }, [onLoadMore]);

  const loader = React.useMemo(
    () => (
      <div className={classes.loadMore} key={0}>
        <ScaleLoader height={20} color={secondaryColor} />
      </div>
    ),
    [],
  );

  return (
    <div className={contentClass} ref={contentRef}>
      {cornerRadiusColor && (
        <TopCornerRadius color={cornerRadiusColor} offsetTop={paddingTop} />
      )}
      {onRefresh && <SpinnerPTR offsetTop={paddingTop} />}
      <InfiniteScroll
        dataLength={dataLength || 0}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={loader}
        className={`${classes.content} ${classPTR}__main`}
        scrollThreshold="250px"
        scrollableTarget={scrollableTarget}
      >
        {children}
      </InfiniteScroll>
    </div>
  );
};

BaseContent.defaultProps = {
  className: '',
  hasMore: false,
  onLoadMore: () => {},
  paddingTop: 0,
  paddingBottom: 0,
  dataLength: 0,
};

BaseContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onRefresh: PropTypes.func,
  onLoadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  cornerRadiusColor: PropTypes.string,
  paddingTop: PropTypes.number,
  dataLength: PropTypes.number,
  scrollableTarget: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  // eslint-disable-next-line react/no-unused-prop-types
  paddingBottom: PropTypes.number,
};

export default memo(BaseContent);
