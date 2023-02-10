/**
 *
 * TopCity
 *
 */
import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { useBreakpointValues } from 'utils/hooks';

import BlockContent from 'components/BlockContent';
import CollectionView from 'components/CollectionView';
import Slideshow from 'components/Slideshow';
import Img from 'components/Img';

import { path } from 'routers/path';

const useStyle = makeStyles(theme => ({
  item: {
    width: isMobileOnly ? 'auto' : '204px !important',
    marginRight: isMobileOnly ? 0 : 20,
    '&:hover span': {
      color: theme.palette.primary.main,
    },
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    height: isMobileOnly ? 190 : 270,
    borderRadius: theme.spacing(1.5),
    overflow: 'hidden',
  },
  title: {
    color: theme.palette.textColor[1],
    flexGrow: 1,
  },
  amount: {
    color: theme.palette.textColor[7],
    fontSize: 12,
    paddingLeft: 4,
    flexShrink: 0,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
}));

function TopCity(props) {
  const { data = [] } = props;
  const classes = useStyle();

  const slidesToScroll = useBreakpointValues({ xs: 2, sm: 3, md: 4, lg: 5 });

  const renderItem = React.useCallback(
    item => (
      <Link
        to={`${path.bookingSearch}?location[]=${
          item.city_id
        }&location_lv=1&unit=province`}
        key={item.city_id}
        className={classes.item}
      >
        <Img src={`${item.img_url}`} className={classes.img} />
        <div className={classes.row}>
          <span className={classes.title}>{item.name}</span>
          <span className={classes.amount}>{`(${item.amount})`}</span>
        </div>
      </Link>
    ),
    [],
  );

  return (
    <BlockContent title="TOP THÀNH PHỐ">
      {isMobileOnly ? (
        <CollectionView
          items={data}
          renderItem={renderItem}
          cellWidth={150}
          cellHeight={230}
          height={240}
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
  );
}

TopCity.propTypes = {
  data: PropTypes.array,
};

export default memo(TopCity);
