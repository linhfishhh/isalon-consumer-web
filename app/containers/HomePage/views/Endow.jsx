/**
 *
 * Endow
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { isMobileOnly } from 'utils/platform';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { useBreakpointValues } from 'utils/hooks';

import BlockContent from 'components/BlockContent';
import CollectionView from 'components/CollectionView';
import Slideshow from 'components/Slideshow';
import Img from 'components/Img';

const useStyle = makeStyles(theme => ({
  item: {
    width: isMobileOnly ? 'auto' : '370px !important',
    height: isMobileOnly ? 150 : 200,
    marginRight: isMobileOnly ? 0 : 25,
  },
  img: {
    borderRadius: theme.spacing(1.5),
    display: 'inline-block !important',
  },
}));

function Endow(props) {
  const classes = useStyle();
  const { data = [] } = props;
  const slidesToScroll = useBreakpointValues({ xs: 1, sm: 2 });

  const renderItem = React.useCallback(
    item => (
      <div key={shortid.generate()} className={classes.item}>
        <Link href={item.link} title={item.title}>
          <Img src={item.img_url} className={classes.img} />
        </Link>
      </div>
    ),
    [],
  );

  return (
    <>
      {data.length > 0 && (
        <BlockContent title="ƯU ĐÃI ĐỘC QUYỀN">
          {isMobileOnly ? (
            <CollectionView
              items={data}
              renderItem={renderItem}
              cellHeight={150}
              height={160}
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

Endow.propTypes = {
  data: PropTypes.array,
};

export default memo(Endow);
