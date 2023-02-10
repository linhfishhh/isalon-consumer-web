/**
 *
 * Brand
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { isMobileOnly } from 'utils/platform';
import { makeStyles } from '@material-ui/core/styles';

import { useBreakpointValues } from 'utils/hooks';

import BlockContent from 'components/BlockContent';
import CollectionView from 'components/CollectionView';
import Slideshow from 'components/Slideshow';
import Img from 'components/Img';

const useStyle = makeStyles(theme => ({
  item: {
    width: isMobileOnly ? 'auto' : '210px !important',
    height: 105,
    marginRight: isMobileOnly ? 0 : theme.spacing(3),
  },
  img: {
    borderRadius: theme.shape.borderRadius,
    display: 'inline-block !important',
  },
}));

function Brand(props) {
  const classes = useStyle();
  const { data = [] } = props;

  const slidesToScroll = useBreakpointValues({ xs: 2, sm: 3, md: 4, lg: 5 });

  const renderItem = React.useCallback(
    item => (
      <div key={shortid.generate()} className={classes.item}>
        <a href={item.link}>
          <Img src={item.img_url} className={classes.img} alt={item.title} />
        </a>
      </div>
    ),
    [],
  );

  return (
    <>
      {data.length > 0 && (
        <BlockContent title="THƯƠNG HIỆU NỔI TIẾNG">
          {isMobileOnly ? (
            <CollectionView
              items={data}
              renderItem={renderItem}
              cellWidth={210}
              cellHeight={105}
              height={115}
            />
          ) : (
            <Slideshow
              items={data}
              variableWidth
              className="slide variable-width"
              slidesToScroll={slidesToScroll}
              renderItem={renderItem}
            />
          )}
        </BlockContent>
      )}
    </>
  );
}

Brand.propTypes = {
  data: PropTypes.array,
};

export default memo(Brand);
