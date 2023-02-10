import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: 'none',
    stroke: '#969696',
    strokeMiterlimit: 10,
  },
  cls_2: {
    fill: '#969696',
  },
}));

const NoCommentIcon = props => {
  const classes = useStyles();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 91.68 56.16"
      width="91.68"
      height="56.16"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="M51,11.42a23.56,23.56,0,1,1,0,33.34"
            className={classes.cls_1}
          />
          <circle cx="28.08" cy="28.08" r="27.58" className={classes.cls_1} />
          <path
            d="M39.57,31.36a11.49,11.49,0,0,1-23,0"
            className={classes.cls_1}
          />
          <circle cx="20.14" cy="22.33" r="2.83" className={classes.cls_2} />
          <circle cx="36.63" cy="22.33" r="2.83" className={classes.cls_2} />
          <path
            d="M57.91,40.69a9.82,9.82,0,0,1,19.63,0"
            className={classes.cls_1}
          />
          <circle cx="60.95" cy="23.17" r="2.41" className={classes.cls_2} />
          <circle cx="75.03" cy="23.17" r="2.41" className={classes.cls_2} />
        </g>
      </g>
    </svg>
  );
};

export default NoCommentIcon;
