/**
 *
 * Endow
 *
 */
import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';

import CollectionView from 'components/CollectionView';
import BlockContent from 'components/BlockContent';
import Slideshow from 'components/Slideshow';
import { Link } from 'react-router-dom';
import Img from 'components/Img';
import { path, createPath } from 'routers/path';
import { convertToSlug } from 'utils/stringFormat';

const useStyle = makeStyles(theme => ({
  item: {
    width: isMobileOnly ? 'auto' : '210px !important',
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: isMobileOnly ? theme.spacing(1.5) : theme.spacing(1) - 1,
    overflow: 'hidden',
    margin: isMobileOnly ? 0 : theme.spacing(0, 4, 0, 0),
    boxShadow: `0px 3px 7px -3px rgba(0,0,0,0.2)`,
    '&:hover span': {
      color: theme.palette.primary.main,
    },
  },
  img: {
    width: isMobileOnly ? '100%' : 80,
    height: isMobileOnly ? 85 : 65,
  },
  title: {
    color: theme.palette.textColor[1],
    margin: theme.spacing(2),
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    overflow: 'hidden',
    height: 42,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function RecentSearch(props) {
  const classes = useStyle();

  const { data = [] } = props;

  const getSalonLink = salon => {
    const province = (salon.address_cache || salon.address).split(',').pop();
    return createPath(path.salonDetail, {
      salonId: `${salon.salon_id}`,
      salonName: convertToSlug(salon.name),
      provinceName: convertToSlug(province),
    });
  };

  const renderItem = React.useCallback(
    item => (
      <div key={shortid.generate()} className={classes.item}>
        <Link
          to={getSalonLink(item)}
          className={isMobileOnly ? classes.column : classes.row}
        >
          <Img src={item.image} className={classes.img} />
          <span className={classes.title}>{item.name}</span>
        </Link>
      </div>
    ),
    [],
  );

  return (
    <BlockContent title="ĐÃ XEM GẦN ĐÂY">
      {isMobileOnly ? (
        <CollectionView
          items={data}
          renderItem={renderItem}
          cellWidth={135}
          cellHeight={150}
          height={160}
        />
      ) : (
        <Slideshow
          items={data}
          variableWidth
          className="slide variable-width"
          slidesToScroll={4}
          renderItem={renderItem}
        />
      )}
    </BlockContent>
  );
}

RecentSearch.propTypes = {
  data: PropTypes.array,
};

export default memo(RecentSearch);
