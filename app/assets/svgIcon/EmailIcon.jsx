import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: '#8e8e93',
  },
}));

const EmailIcon = props => {
  const classes = useStyles();
  return (
    <svg
      width="18.4"
      height="13.08"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18.4 13.08"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className={classes.cls_1}
            d="M14.9,10.1a.26.26,0,0,1-.2-.08l-3.42-3.2a.3.3,0,1,1,.41-.43l3.41,3.2a.3.3,0,0,1,0,.42A.31.31,0,0,1,14.9,10.1Z"
          />
          <path
            className={classes.cls_1}
            d="M3.5,10.1A.27.27,0,0,1,3.29,10a.29.29,0,0,1,0-.42l3.41-3.2a.3.3,0,0,1,.42,0,.29.29,0,0,1,0,.42L3.71,10A.28.28,0,0,1,3.5,10.1Z"
          />
          <path
            className={classes.cls_1}
            d="M16.92,13.08H1.48A1.48,1.48,0,0,1,0,11.6V1.48A1.49,1.49,0,0,1,1.48,0H16.92A1.48,1.48,0,0,1,18.4,1.48V11.6A1.48,1.48,0,0,1,16.92,13.08ZM1.48.59a.89.89,0,0,0-.89.89V11.6a.89.89,0,0,0,.89.89H16.92a.89.89,0,0,0,.89-.89V1.48a.89.89,0,0,0-.89-.89Z"
          />
          <path
            className={classes.cls_1}
            d="M9.2,8a1.68,1.68,0,0,1-1.09-.39L.49,1a.31.31,0,0,1,0-.42.3.3,0,0,1,.42,0L8.5,7.19a1.11,1.11,0,0,0,1.4,0L17.51.56A.29.29,0,1,1,17.9,1L10.29,7.64A1.66,1.66,0,0,1,9.2,8Z"
          />
        </g>
      </g>
    </svg>
  );
};

export default EmailIcon;
