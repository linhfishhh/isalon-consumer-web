/**
 *
 * Collection
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { isMobileOnly } from 'utils/platform';
import { makeStyles } from '@material-ui/core/styles';

import BlockContent from 'components/BlockContent';
import ScrollView from 'components/ScrollView';
import Slideshow from 'components/Slideshow';
import CollectionItem from 'components/CollectionItem';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: isMobileOnly ? 0 : theme.shape.borderRadius + 2,
    padding: isMobileOnly ? theme.spacing(4, 0) : theme.spacing(6),
    marginTop: isMobileOnly ? theme.spacing(2) : theme.spacing(5),
  },
  gridList: {
    paddingLeft: theme.spacing(2),
    margin: `${theme.spacing(0)}px !important`,
  },
  item: {
    width: isMobileOnly ? 'auto' : '290px !important',
    marginRight: isMobileOnly ? 0 : theme.spacing(4),
  },
  arrow: {
    backgroundColor: `rgba(${theme.hexToRgb(
      theme.palette.backgroundColor[6],
    )}, 0.7)`,
    color: theme.palette.textColor[6],
    '&:hover': {
      backgroundColor: `rgba(${theme.hexToRgb(
        theme.palette.backgroundColor[6],
      )}, 0.5)`,
    },
  },
  prev: {
    left: 20,
  },
  next: {
    right: 20,
  },
  img: {
    display: 'inline-block !important',
  },
}));

const Collection = React.forwardRef((props, ref) => {
  const { data = [], onFavorite } = props;
  const classes = useStyle();
  const renderItem = React.useCallback(
    item => (
      <CollectionItem
        key={shortid.generate()}
        data={item}
        className={classes.item}
        onFavorite={onFavorite}
      />
    ),
    [],
  );
  return (
    <BlockContent title="Tác phẩm" className={classes.wrapper} ref={ref}>
      {isMobileOnly ? (
        <ScrollView
          className={classes.gridList}
          items={data}
          cols={1.3}
          spacing={16}
          renderItem={renderItem}
        />
      ) : (
        <Slideshow
          items={data}
          slidesToScroll={2}
          variableWidth
          className="slide variable-width"
          arrowPrevClassName={`${classes.arrow} ${classes.prev}`}
          arrowNextClassName={`${classes.arrow} ${classes.next}`}
          arrowColor="#fff"
          renderItem={renderItem}
        />
      )}
    </BlockContent>
  );
});

Collection.propTypes = {
  data: PropTypes.array,
  onFavorite: PropTypes.func,
};

export default memo(Collection);
