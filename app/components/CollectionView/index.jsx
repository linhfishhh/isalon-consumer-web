/**
 *
 * CollectionView
 *
 */
import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Collection from 'react-virtualized/dist/commonjs/Collection';
import 'react-virtualized/styles.css';

const useStyles = makeStyles(() => ({
  vertical: {
    scrollBehavior: 'smooth',
  },
  horizontal: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    scrollBehavior: 'smooth',
  },
  hideSrollbar: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const CollectionView = props => {
  const {
    className,
    items,
    renderItem,
    height,
    cellHeight,
    cellWidth,
    spacing,
    overscanSize,
    padding,
  } = props;

  const classes = useStyles();

  const isLast = useCallback(index => index === items.length - 1, [items]);

  const cellRenderer = React.useCallback(
    data => {
      const { index, key, style } = data;
      const cellStyle = style;
      if (isLast(index)) {
        cellStyle.width -= padding.right;
      }
      return (
        <div key={key} style={cellStyle}>
          {renderItem(items[index], index)}
        </div>
      );
    },
    [renderItem, items],
  );

  const cellSizeAndPositionGetter = React.useCallback(
    ({ index }) => {
      let natureCellWidth = cellWidth;
      if (isLast(index)) {
        natureCellWidth += padding.right;
      }
      return {
        width: natureCellWidth,
        height: cellHeight,
        x: (cellWidth + spacing) * index + padding.left || 0,
        y: 0,
      };
    },
    [items, cellHeight, cellWidth, padding],
  );

  const content = React.useCallback(
    ({ width }) => (
      <Collection
        className={`${classes.wrapper} ${className}`}
        cellCount={items.length}
        cellRenderer={cellRenderer}
        cellSizeAndPositionGetter={cellSizeAndPositionGetter}
        horizontalOverscanSize={overscanSize}
        width={width}
        height={height}
      />
    ),
    [height, cellRenderer, cellSizeAndPositionGetter],
  );

  return <AutoSizer disableHeight>{content}</AutoSizer>;
};

CollectionView.defaultProps = {
  items: [],
  height: 305,
  cellWidth: 290,
  cellHeight: 305,
  spacing: 16,
  overscanSize: 10,
  padding: { top: 0, right: 16, bottom: 0, left: 16 },
};

CollectionView.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cellWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cellHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  renderItem: PropTypes.func,
  spacing: PropTypes.number,
  padding: PropTypes.exact({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  overscanSize: PropTypes.number,
};

export default memo(CollectionView);
