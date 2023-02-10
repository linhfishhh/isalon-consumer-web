import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: 'none',
    stroke: '#00a99d',
    strokeMiterlimit: 10,
    strokeWidth: 0.75,
  },
  cls_2: {
    fill: '#00a99d',
  },
}));

const InfoIcon = props => {
  const classes = useStyles();
  return (
    <svg
      width="10.5"
      height="10.5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10.5 10.5"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <circle className={classes.cls_1} cx="5.25" cy="5.25" r="4.88" />
          <path
            className={classes.cls_2}
            d="M4,8.31V7.94a1.62,1.62,0,0,0,.59-.07c.05,0,.09-.11.1-.25a11,11,0,0,0,0-1.26c0-.28,0-.54,0-.78l0-.53a.71.71,0,0,0,0-.33.55.55,0,0,0-.31-.07H4V4.29a5.62,5.62,0,0,0,1.8-.38L5.88,4q-.06.86-.06,2.52c0,.64,0,1,0,1.16a.3.3,0,0,0,.09.18,3.17,3.17,0,0,0,.59.08v.37l-1.27,0ZM5.24,1.74a.7.7,0,0,1,.7.71.72.72,0,0,1-.71.7.69.69,0,0,1-.5-.21.7.7,0,0,1-.2-.49.73.73,0,0,1,.2-.51A.73.73,0,0,1,5.24,1.74Z"
          />
        </g>
      </g>
    </svg>
  );
};

export default InfoIcon;
