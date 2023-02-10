import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: 'none',
    stroke: '#ff5c39',
    strokeMiterlimit: 10,
  },
}));

const AnswerIcon = props => {
  const classes = useStyles();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25.25 28.07"
      width="25.25"
      height="28.06"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="M1.73,6.46H21.55l3.2-4.81V26.34a1.22,1.22,0,0,1-1.22,1.22H1.73A1.22,1.22,0,0,1,.5,26.34V7.68A1.23,1.23,0,0,1,1.73,6.46Z"
            className={classes.cls_1}
          />
          <line
            x1="4.19"
            y1="12.56"
            x2="12.32"
            y2="12.56"
            className={classes.cls_1}
          />
          <line
            x1="4.19"
            y1="17.52"
            x2="17.04"
            y2="17.52"
            className={classes.cls_1}
          />
          <line
            x1="4.19"
            y1="22.47"
            x2="21.34"
            y2="22.47"
            className={classes.cls_1}
          />
        </g>
      </g>
    </svg>
  );
};

export default AnswerIcon;
