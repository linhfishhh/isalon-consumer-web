/**
 *
 * ScrollView
 *
 */
import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles(() => ({
  title: {
    color: 'white',
  },
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

const ScrollView = forwardRef((props, ref) => {
  const {
    className,
    items = [],
    renderItem,
    scrollDirection = 'horizontal',
    cols = 3,
    spacing = 0,
    cellHeight = 'auto',
    hideScrollbar = true,
    styles,
  } = props;
  const classes = useStyles();

  return (
    <GridList
      ref={ref}
      cellHeight={cellHeight}
      spacing={spacing}
      className={`${className} ${classes[scrollDirection]} ${hideScrollbar &&
        classes.hideSrollbar}`}
      cols={cols}
      styles={styles}
    >
      {items.map((item, index) => (
        <GridListTile key={shortid.generate()}>
          {renderItem && renderItem(item, index)}
        </GridListTile>
      ))}
    </GridList>
  );
});

ScrollView.propTypes = {
  className: PropTypes.string,
  scrollDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  items: PropTypes.array,
  cellHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cols: PropTypes.number,
  spacing: PropTypes.number,
  renderItem: PropTypes.func,
  hideScrollbar: PropTypes.bool,
  styles: PropTypes.object,
};

export default memo(ScrollView);
