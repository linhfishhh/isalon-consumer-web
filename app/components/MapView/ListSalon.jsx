/**
 *
 * ListSalon
 *
 */

import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { isMobileOnly } from 'utils/platform';

import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

import Slideshow from 'components/Slideshow';
import HorizontalItem from 'components/SalonItem/HorizontalItem';
import MobileMapItem from 'components/SalonItem/MobileMapItem';

const useStyle = makeStyles(theme => ({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    pointerEvents: 'none',
    transition: 'transform 0.6s ease 0s',
  },
  minimal: {
    transform: isMobileOnly ? 'translate(0%, 120px)' : 'translate(0%, 45%)',
  },
  salon: {
    backgroundColor: theme.palette.background.paper,
    padding: isMobileOnly ? 0 : theme.spacing(1),
    pointerEvents: 'auto',
    position: 'relative',
    borderRadius: isMobileOnly ? 0 : theme.shape.borderRadius,
  },
  button: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(1),
  },
  arrowButton: {
    backgroundColor: `rgba(${theme.hexToRgb(theme.palette.primary.main)}, 0.7)`,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

function ListSalon(props) {
  const { data, active, onChange, onShowServiceDetail } = props;

  const classes = useStyle();
  const [minimal, setMinimal] = useState(true);

  const slideRef = useRef();

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.slickGoTo(active, true);
    }
  }, [active]);

  const handleAfterChange = useCallback(
    index => {
      if (active !== index) {
        onChange(index, true);
      }
    },
    [active, data],
  );

  const renderItem = useCallback(
    item => (
      <div key={item.id}>
        {isMobileOnly ? (
          <MobileMapItem
            data={item}
            onShowServiceDetail={onShowServiceDetail}
          />
        ) : (
          <HorizontalItem
            data={item}
            onShowServiceDetail={indexChange =>
              onShowServiceDetail(indexChange)
            }
          />
        )}
      </div>
    ),
    [],
  );

  return (
    <Grid
      container
      className={[classes.wrapper, minimal && classes.minimal].join(' ')}
    >
      <Grid item xs />
      <Grid item xs={12} sm={10} md={8} lg={6} className={classes.salon}>
        <Slideshow
          items={data}
          ref={slideRef}
          afterChange={handleAfterChange}
          arrowNextClassName={classes.arrowButton}
          arrowPrevClassName={classes.arrowButton}
          renderItem={renderItem}
          arrows={!isMobileOnly}
          swipe={isMobileOnly}
        />
        <IconButton
          className={classes.button}
          color="primary"
          onClick={() => setMinimal(!minimal)}
        >
          {minimal ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Grid>
      <Grid item xs />
    </Grid>
  );
}

ListSalon.propTypes = {
  data: PropTypes.array,
  active: PropTypes.number,
  onChange: PropTypes.func,
  onShowServiceDetail: PropTypes.func,
};

export default memo(ListSalon);
