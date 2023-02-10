import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: 'url(#linear-gradient)',
  },
  cls_2: {
    fill: 'url(#linear-gradient-2)',
  },
  cls_3: {
    fill: 'url(#linear-gradient-3)',
  },
  cls_4: {
    fill: 'url(#linear-gradient-4)',
  },
  cls_5: {
    fill: '#fff',
  },
}));

const ChatIcon = props => {
  const classes = useStyles();
  return (
    <svg
      width="50.11"
      height="36.11"
      xmlns="http://www.w3.org/2000/svg"
      // xlink="http://www.w3.org/1999/xlink"
      viewBox="7 0 36.11 36.11"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="11.99"
          y1="5381.12"
          x2="21.12"
          y2="5361.58"
          gradientTransform="matrix(1, 0, 0, -1, 0, 5386.2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0082ff" />
          <stop offset="1" stopColor="#0078db" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="25.69"
          y1="5364.05"
          x2="-26.77"
          y2="5392.19"
          gradientTransform="matrix(1, 0, 0, -1, 0, 5386.2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0078db" stopOpacity="0" />
          <stop offset="1" stopColor="#006cb5" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-3"
          x1="18.05"
          y1="5354.91"
          x2="18.05"
          y2="5351.22"
          xlinkHref="#linear-gradient-2"
        />
        <linearGradient
          id="linear-gradient-4"
          x1="31.55"
          y1="5353.62"
          x2="21.03"
          y2="5364.13"
          xlinkHref="#linear-gradient-2"
        />
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className={classes.cls_1}
            d="M29.65,35.49a108.3,108.3,0,0,1-23.19,0A6.58,6.58,0,0,1,.62,29.65a108.3,108.3,0,0,1,0-23.19A6.58,6.58,0,0,1,6.46.62a108.3,108.3,0,0,1,23.19,0,6.58,6.58,0,0,1,5.84,5.84,108.3,108.3,0,0,1,0,23.19A6.58,6.58,0,0,1,29.65,35.49Z"
          />
          <path
            className={classes.cls_2}
            d="M33.53,7.76a5.83,5.83,0,0,0-5.19-5.18,97,97,0,0,0-20.58,0A5.83,5.83,0,0,0,2.58,7.76a97,97,0,0,0,0,20.58,5.83,5.83,0,0,0,5.18,5.19,97,97,0,0,0,20.58,0,5.83,5.83,0,0,0,5.19-5.19A97,97,0,0,0,33.53,7.76Z"
          />
          <path
            className={classes.cls_3}
            d="M.54,28.9c0,.25,0,.5.08.75a6.58,6.58,0,0,0,5.84,5.84,108.3,108.3,0,0,0,23.19,0,6.58,6.58,0,0,0,5.84-5.84c0-.25,0-.5.08-.75Z"
          />
          <path
            className={classes.cls_4}
            d="M35.49,29.65c.34-3.2.54-6.39.6-9.6L26.4,10.37a11.46,11.46,0,0,0-8.35-3.51c-6.13,0-11.11,4.61-11.11,10.3a9.86,9.86,0,0,0,3.17,7.19c.12.14.91.93,1,1l.05,3.42a1.18,1.18,0,0,0,.35.83L18,36.11a108.25,108.25,0,0,0,11.65-.62A6.58,6.58,0,0,0,35.49,29.65Z"
          />
          <path
            className={classes.cls_5}
            d="M18.05,6.86c-6.13,0-11.11,4.61-11.11,10.3a10,10,0,0,0,4.14,8l.05,3.63a.25.25,0,0,0,.38.22l3.47-2a12,12,0,0,0,3.07.4c6.14,0,11.11-4.61,11.11-10.3S24.19,6.86,18.05,6.86Zm2.23,10.5a2,2,0,1,1-2-2A2,2,0,0,1,20.28,17.36Zm5,0a2,2,0,1,1-2-2A2,2,0,0,1,25.24,17.36Zm-9.93,0a2,2,0,1,1-2-2A2,2,0,0,1,15.31,17.36Z"
          />
        </g>
      </g>
    </svg>
  );
};

export default ChatIcon;
