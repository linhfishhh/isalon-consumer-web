import React, { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { isMobileOnly } from 'utils/platform';
import { useBreakpointValues } from 'utils/hooks';

import SalonPlaceHolder from 'components/Placeholder/SalonPlaceHolder';
import BlockContent from 'components/BlockContent';
import Slideshow from 'components/Slideshow';
import SalonItem from 'components/SalonItem';
import CollectionView from 'components/CollectionView';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(2, 0),
  },
  viewAll: {
    color: theme.palette.secondary.main,
    padding: isMobileOnly ? theme.spacing(0.5, 1) : theme.spacing(1, 3),
    backgroundColor: theme.palette.backgroundColor[1],
    borderRadius: 15,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  item: {
    width: isMobileOnly ? 'auto' : '262px !important',
    marginRight: isMobileOnly ? 0 : theme.spacing(4),
  },
}));

function SalonList(props) {
  const { data = [], title, onViewAll } = props;
  const classes = useStyle(props);

  const slidesToScroll = useBreakpointValues({ xs: 2, md: 4 });

  const renderItem = React.useCallback(
    item => (
      <div
        key={shortid.generate()}
        className={isMobileOnly ? '' : classes.item}
      >
        {isEmpty(item) ? <SalonPlaceHolder /> : <SalonItem data={item} />}
      </div>
    ),
    [],
  );

  const placeholders = React.useMemo(
    () => [...Array(isMobileOnly ? 3 : 5)],
    [],
  );

  const viewAll = React.useMemo(
    () => (
      <Button
        component="button"
        className={classes.viewAll}
        onClick={onViewAll}
      >
        Tất cả
      </Button>
    ),
    [],
  );

  return (
    <BlockContent
      className={classes.wrapper}
      title={title}
      endAdornmentTitle={onViewAll ? viewAll : null}
    >
      {isMobileOnly ? (
        <CollectionView
          className={classes.gridList}
          items={data && data.length > 0 ? data : placeholders}
          renderItem={renderItem}
        />
      ) : (
        <Slideshow
          items={data && data.length > 0 ? data : placeholders}
          variableWidth
          className="slide variable-width"
          slidesToScroll={slidesToScroll}
          renderItem={renderItem}
        />
      )}
    </BlockContent>
  );
}

SalonList.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  onViewAll: PropTypes.func,
};

export default memo(SalonList);
