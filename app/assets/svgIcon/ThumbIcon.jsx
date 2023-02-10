import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: '#969696',
  },
  cls_2: {
    fill: '#e84b7d',
  },
}));

const ThumbIcon = props => {
  const classes = useStyles();
  return (
    <svg
      width="21.53"
      height="19.27"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21.53 19.27"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <rect
            className={classes.cls_1}
            y="7.52"
            width="3.91"
            height="11.75"
            rx="0.81"
          />
          <path
            className={classes.cls_1}
            d="M21.53,8.5a2,2,0,0,0-2-2H14.41a.81.81,0,0,1-.79-1L14.39,2V1.75a1.9,1.9,0,0,0-.34-1A.65.65,0,0,0,13.92.6L13.49.21a.81.81,0,0,0-1.12,0L6.46,6.15a1.65,1.65,0,0,0-.59,1.37v9.79a2,2,0,0,0,2,2h8.81a1.93,1.93,0,0,0,1.76-1.18l2.94-6.95a1.77,1.77,0,0,0,.09-.68v-2Z"
            transform="translate(0 0)"
          />
        </g>
      </g>
    </svg>
  );
};

const ThumbIconLiked = props => {
  const classes = useStyles();
  return (
    <svg
      width="21.53"
      height="19.27"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21.53 19.27"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <rect
            className={classes.cls_2}
            y="7.52"
            width="3.91"
            height="11.75"
            rx="0.81"
          />
          <path
            className={classes.cls_2}
            d="M21.53,8.5a2,2,0,0,0-2-2H14.41a.81.81,0,0,1-.79-1L14.39,2V1.75a1.9,1.9,0,0,0-.34-1A.65.65,0,0,0,13.92.6L13.49.21a.81.81,0,0,0-1.12,0L6.46,6.15a1.65,1.65,0,0,0-.59,1.37v9.79a2,2,0,0,0,2,2h8.81a1.93,1.93,0,0,0,1.76-1.18l2.94-6.95a1.77,1.77,0,0,0,.09-.68v-2Z"
            transform="translate(0 0)"
          />
        </g>
      </g>
    </svg>
  );
};

export { ThumbIcon, ThumbIconLiked };
