import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: 'none',
    stroke: '#969696',
    strokeMiterlimit: 10,
  },
  cls_2: {
    fill: '#929497',
  },
}));

const NoFaqIcon = props => {
  const classes = useStyles();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 77.83 84.25"
      width="77.83"
      height="84.25"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="M73.44,67.37H10.65L.5,82.59V4.39A3.89,3.89,0,0,1,4.39.5H73.44a3.89,3.89,0,0,1,3.89,3.89V63.48A3.89,3.89,0,0,1,73.44,67.37Z"
            className={classes.cls_1}
          />
          <path
            d="M35.17,45.14c-.07-.77-.07-1.4-.07-2.23A11.06,11.06,0,0,1,40.38,33l2.79-1.9a7.46,7.46,0,0,0,3.37-6.23c0-3.74-2.48-7.24-7.56-7.24-5.53,0-7.94,4.13-7.94,8.13a11,11,0,0,0,.44,3.12l-6.16-.77a11.26,11.26,0,0,1-.38-3.05c0-5.84,4.26-13,14-13,8.89,0,13.91,6.29,13.91,12.77,0,5.08-2.8,8.57-6.48,11.05l-2.92,2a7,7,0,0,0-2.8,6.1,9.15,9.15,0,0,0,.07,1.21ZM37.9,50a4.22,4.22,0,0,1,4.19,4.19,4.17,4.17,0,0,1-4.19,4.13,4.12,4.12,0,0,1-4.13-4.13A4.17,4.17,0,0,1,37.9,50Z"
            className={classes.cls_2}
          />
        </g>
      </g>
    </svg>
  );
};

export default NoFaqIcon;
