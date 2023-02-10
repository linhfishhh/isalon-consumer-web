/**
 *
 * StyleList
 *
 */

import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';

import BlockContent from 'components/BlockContent';
import ScrollView from 'components/ScrollView';
import Slideshow from 'components/Slideshow';

const useStyles = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: isMobileOnly ? 0 : theme.shape.borderRadius + 2,
    padding: isMobileOnly ? theme.spacing(4, 0) : theme.spacing(6),
    marginTop: isMobileOnly ? theme.spacing(1) : theme.spacing(5),
  },
  gridList: {
    paddingLeft: theme.spacing(2),
    margin: `${theme.spacing(0)}px !important`,
    maxHeight: 280,
  },
  item: {
    padding: isMobileOnly ? 0 : theme.spacing(4),
    display: 'flex !important',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
  },
  name: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    overflow: 'hidden',
    height: 42,
  },
}));

function StyleList(props) {
  const { data = [] } = props;
  const classes = useStyles();

  const renderItem = React.useCallback(
    item => (
      <div key={shortid.generate()} className={classes.item}>
        <Avatar src={item.image} className={classes.image} />
        <Typography className={classes.name}>{item.name}</Typography>
      </div>
    ),
    [],
  );

  return (
    <BlockContent title="Style list" className={classes.wrapper}>
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
          slidesToShow={6}
          slidesToScroll={6}
          renderItem={renderItem}
        />
      )}
    </BlockContent>
  );
}

StyleList.propTypes = {
  data: PropTypes.array,
};

export default memo(StyleList);
