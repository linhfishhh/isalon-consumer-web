import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: '#ccc',
  },
  cls_2: {
    fill: '#3f3f3f',
  },
}));

const GridViewIcon = props => {
  const classes = useStyles();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15.31 14.86"
      width="15.31"
      height="15.31"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <rect className={classes.cls_1} width="6.54" height="6.54" />
          <rect className={classes.cls_1} x="8.77" width="6.54" height="6.54" />
          <rect className={classes.cls_1} y="8.32" width="6.54" height="6.54" />
          <rect
            className={classes.cls_1}
            x="8.77"
            y="8.32"
            width="6.54"
            height="6.54"
          />
        </g>
      </g>
    </svg>
  );
};

const GridViewSelectedIcon = props => {
  const classes = useStyles();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15.31 14.86"
      width="15.31"
      height="15.31"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <rect className={classes.cls_2} width="6.54" height="6.54" />
          <rect className={classes.cls_2} x="8.77" width="6.54" height="6.54" />
          <rect className={classes.cls_2} y="8.32" width="6.54" height="6.54" />
          <rect
            className={classes.cls_2}
            x="8.77"
            y="8.32"
            width="6.54"
            height="6.54"
          />
        </g>
      </g>
    </svg>
  );
};

export { GridViewIcon, GridViewSelectedIcon };
