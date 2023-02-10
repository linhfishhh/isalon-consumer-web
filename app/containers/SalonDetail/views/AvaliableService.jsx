/**
 *
 * AvaliableService
 *
 */
import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { useBreakpointValues } from 'utils/hooks';

import Slideshow from 'components/Slideshow';
import ScrollView from 'components/ScrollView';
import Img from 'components/Img';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderTop: 'none',
    borderBottomLeftRadius: theme.spacing(1.5),
    borderBottomRightRadius: theme.spacing(1.5),
    backgroundColor: theme.palette.backgroundColor[1],
    padding: isMobileOnly ? theme.spacing(4, 0) : theme.spacing(4),
  },
  gridList: {
    paddingLeft: theme.spacing(2),
    margin: `${theme.spacing(0)}px !important`,
  },
  itemWrapper: {
    outline: 'none',
    padding: isMobileOnly ? theme.spacing(1.5) : 0,
  },
  item: {
    backgroundColor: theme.palette.background.paper,
    margin: isMobileOnly ? 0 : theme.spacing(2),
    padding: `${theme.spacing(4)}px ${theme.spacing(1)}px`,
    height: 110,
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: theme.shape.borderRadius + 3,
    boxShadow: `3px 5px 5px -5px rgba(0, 0, 0, 0.2)`,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  selected: {
    color: theme.palette.primary.main,
  },
  img: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 12,
    paddingTop: theme.spacing(1),
  },
}));

const AvaliableService = React.forwardRef((props, ref) => {
  const { data = [], selected, onSelect } = props;
  const classes = useStyle();

  const slidesToShow = useBreakpointValues({ xs: 4, sm: 5, md: 7, lg: 9 });

  const renderItem = React.useCallback(
    (item, index) => (
      <div key={shortid.generate()} className={classes.itemWrapper}>
        <Typography
          component="div"
          className={classes.item}
          onClick={() => onSelect(item, index)}
        >
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <Img
                src={item.image}
                className={classes.img}
                resizeMode="contain"
              />
            </Grid>
          </Grid>
          <Typography
            className={[
              classes.title,
              selected.name === item.name && classes.selected,
            ].join(' ')}
            align="center"
          >
            {item.name}
          </Typography>
        </Typography>
      </div>
    ),
    [selected],
  );

  return (
    <Grid container className={classes.wrapper} ref={ref}>
      <Grid item xs={12}>
        {isMobileOnly ? (
          <ScrollView
            className={classes.gridList}
            items={data}
            cols={3.5}
            renderItem={renderItem}
          />
        ) : (
          <Slideshow
            items={data}
            slidesToShow={slidesToShow}
            slidesToScroll={slidesToShow}
            renderItem={renderItem}
          />
        )}
      </Grid>
    </Grid>
  );
});

AvaliableService.propTypes = {
  data: PropTypes.array,
  selected: PropTypes.object,
  onSelect: PropTypes.func,
};

export default memo(AvaliableService);
