import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: 'none',
  },
  cls_2: {
    fill: '#39b54a',
  },
  cls_3: {
    clipPath: 'url(#clip-path)',
  },
  cls_4: {
    fill: 'url(#linear-gradient)',
  },
  cls_5: {
    fill: 'none',
    stroke: '#fff',
    strokeMiterlimit: 10,
    strokeWidth: 2,
  },
}));

const CheckmarkIcon = props => {
  const classes = useStyles();
  return (
    <svg
      width="16.56"
      height="17.26"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16.56 17.26"
    >
      <defs>
        <clipPath id="clip-path">
          <circle
            className={classes.cls_1}
            cx="8.09"
            cy="8.09"
            r="8.09"
            transform="translate(-3.35 8.09) rotate(-45)"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient"
          x1="9.88"
          y1="9.99"
          x2="14.53"
          y2="13.91"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#009444" />
          <stop offset="1" stopColor="#00a651" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <circle
            className={classes.cls_2}
            cx="8.09"
            cy="8.09"
            r="8.09"
            transform="translate(-3.35 8.09) rotate(-45)"
          />
          <g className={classes.cls_3}>
            <polygon
              className={classes.cls_4}
              points="13.65 6.27 16.56 10.89 12.5 17.26 9.72 16.76 3.69 7.3 5.22 6.11 7.46 9.65 13.65 6.27"
            />
          </g>
          <polyline
            className={classes.cls_5}
            points="4.4 6.59 8.16 10.35 12.95 5.57"
          />
        </g>
      </g>
    </svg>
  );
};

export default CheckmarkIcon;
