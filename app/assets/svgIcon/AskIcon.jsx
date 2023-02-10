import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: 'none',
    stroke: '#00a69c',
    strokeMiterlimit: 10,
  },
  cls_2: {
    fill: '#00a69c',
  },
}));

const AskIcon = props => {
  const classes = useStyles();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25.25 28.07"
      width="25.25"
      height="28.07"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="M23.53,21.61H3.7L.5,26.41V1.73A1.23,1.23,0,0,1,1.73.5h21.8a1.23,1.23,0,0,1,1.22,1.23V20.38A1.23,1.23,0,0,1,23.53,21.61Z"
            className={classes.cls_1}
          />
          <path
            d="M11.44,14.59c0-.24,0-.44,0-.7a3.47,3.47,0,0,1,1.67-3.13l.88-.6a2.35,2.35,0,0,0,1.06-2,2.21,2.21,0,0,0-2.38-2.28,2.4,2.4,0,0,0-2.51,2.56,3.41,3.41,0,0,0,.14,1L8.34,9.22a3.56,3.56,0,0,1-.13-1,4.15,4.15,0,0,1,4.44-4.11,4.1,4.1,0,0,1,4.39,4,4.11,4.11,0,0,1-2,3.49l-.92.62a2.23,2.23,0,0,0-.88,1.93,3.15,3.15,0,0,0,0,.38Zm.87,1.54a1.34,1.34,0,0,1,1.32,1.33,1.31,1.31,0,0,1-1.32,1.3A1.3,1.3,0,0,1,11,17.46,1.33,1.33,0,0,1,12.31,16.13Z"
            className={classes.cls_2}
          />
        </g>
      </g>
    </svg>
  );
};

export default AskIcon;
