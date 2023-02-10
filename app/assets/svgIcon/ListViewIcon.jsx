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

const ListViewIcon = props => {
  const classes = useStyles();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19.66 14.86"
      width="19.66"
      height="19.66"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <rect className={classes.cls_1} width="4.37" height="4.37" />
          <rect
            className={classes.cls_1}
            x="5.37"
            width="14.29"
            height="4.37"
          />
          <rect className={classes.cls_1} y="5.24" width="4.37" height="4.37" />
          <rect
            className={classes.cls_1}
            x="5.37"
            y="5.24"
            width="14.29"
            height="4.37"
          />
          <rect
            className={classes.cls_1}
            y="10.49"
            width="4.37"
            height="4.37"
          />
          <rect
            className={classes.cls_1}
            x="5.37"
            y="10.49"
            width="14.29"
            height="4.37"
          />
        </g>
      </g>
    </svg>
  );
};

const ListViewSelectedIcon = props => {
  const classes = useStyles();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19.66 14.86"
      width="19.66"
      height="19.66"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <rect className={classes.cls_2} width="4.37" height="4.37" />
          <rect
            className={classes.cls_2}
            x="5.37"
            width="14.29"
            height="4.37"
          />
          <rect className={classes.cls_2} y="5.24" width="4.37" height="4.37" />
          <rect
            className={classes.cls_2}
            x="5.37"
            y="5.24"
            width="14.29"
            height="4.37"
          />
          <rect
            className={classes.cls_2}
            y="10.49"
            width="4.37"
            height="4.37"
          />
          <rect
            className={classes.cls_2}
            x="5.37"
            y="10.49"
            width="14.29"
            height="4.37"
          />
        </g>
      </g>
    </svg>
  );
};

export { ListViewIcon, ListViewSelectedIcon };
