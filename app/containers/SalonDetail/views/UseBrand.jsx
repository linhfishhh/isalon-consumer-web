/**
 *
 * UseBrand
 *
 */

import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';

import BlockContent from 'components/BlockContent';
import ScrollView from 'components/ScrollView';
import Slideshow from 'components/Slideshow';
import Img from 'components/Img';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: isMobileOnly ? 0 : theme.spacing(1.5),
    padding: isMobileOnly ? theme.spacing(4, 0) : theme.spacing(6),
    marginTop: isMobileOnly ? theme.spacing(1) : theme.spacing(5),
  },
  gridList: {
    paddingLeft: theme.spacing(2),
    margin: `${theme.spacing(0)}px !important`,
    maxHeight: 210,
  },
  item: {
    padding: isMobileOnly ? 0 : theme.spacing(4),
    height: 85,
  },
}));

function UseBrand(props) {
  const { data = [] } = props;
  const classes = useStyle();
  const renderItem = React.useCallback(
    item => (
      <div key={shortid.generate()} className={classes.item}>
        <Img src={item.image} className={classes.image} resizeMode="contain" />
      </div>
    ),
    [],
  );
  return (
    <BlockContent title="Thương hiệu được sử dụng" className={classes.wrapper}>
      {isMobileOnly ? (
        <ScrollView
          className={classes.gridList}
          items={data}
          scrollDirection="vertical"
          cols={3}
          spacing={16}
          renderItem={renderItem}
        />
      ) : (
        <Slideshow
          items={data}
          slidesToShow={5}
          slidesToScroll={5}
          renderItem={renderItem}
        />
      )}
    </BlockContent>
  );
}

UseBrand.propTypes = {
  data: PropTypes.array,
};

export default memo(UseBrand);
