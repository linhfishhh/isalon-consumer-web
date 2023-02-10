/**
 *
 * RelatedSalons
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';

import { useBreakpointValues } from 'utils/hooks';
import { isMobileOnly } from 'utils/platform';

import BlockContent from 'components/BlockContent';
import CollectionView from 'components/CollectionView';
import Slideshow from 'components/Slideshow';
import SalonItem from 'components/SalonItem';

import SalonPlaceHolder from 'components/Placeholder/SalonPlaceHolder';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: isMobileOnly ? 0 : theme.spacing(1.5),
    padding: isMobileOnly ? theme.spacing(4, 0, 0, 0) : theme.spacing(8),
    backgroundColor: theme.palette.background.default,
    marginTop: isMobileOnly ? theme.spacing(1) : theme.spacing(6),
  },
  item: {
    width: isMobileOnly ? 'auto' : '246px !important',
    marginRight: isMobileOnly ? 0 : theme.spacing(4),
  },
}));

function RelatedSalons(props) {
  const { salons = [] } = props;
  const classes = useStyle();

  const slidesToScroll = useBreakpointValues({ xs: 2, md: 4 });

  const renderItem = React.useCallback(
    item => (
      <div
        key={isEmpty(item) ? shortid.generate() : item.id}
        className={classes.item}
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

  return (
    <BlockContent className={classes.wrapper} title="LIÊN QUAN">
      {isMobileOnly ? (
        <CollectionView
          items={salons && salons.length > 0 ? salons : placeholders}
          renderItem={renderItem}
        />
      ) : (
        <Slideshow
          items={salons && salons.length > 0 ? salons : placeholders}
          variableWidth
          className="slide variable-width"
          slidesToScroll={slidesToScroll}
          renderItem={renderItem}
        />
      )}
    </BlockContent>
  );
}

RelatedSalons.propTypes = {
  salons: PropTypes.array,
};

export default memo(RelatedSalons);
