import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cls_1: {
    stroke: '#8e8e93',
    strokeMiterlimit: 10,
    fill: 'none',
  },
  cls_2: {
    stroke: '#8e8e93',
    strokeMiterlimit: 10,
    fill: '#fff',
  },
}));

const ShareIcon = props => {
  const classes = useStyles(props);
  return (
    <SvgIcon viewBox="0 0 18.34 20.43">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className={classes.cls_1}
            d="M17.84,3.41A2.92,2.92,0,1,1,14.93.5,2.91,2.91,0,0,1,17.84,3.41Z"
          />
          <path
            className={classes.cls_1}
            d="M17.84,17a2.92,2.92,0,1,1-2.91-2.91A2.91,2.91,0,0,1,17.84,17Z"
          />
          <path
            className={classes.cls_1}
            d="M6.33,10.14A2.92,2.92,0,1,1,3.41,7.23,2.92,2.92,0,0,1,6.33,10.14Z"
          />
          <line
            className={classes.cls_2}
            x1="12.31"
            y1="4.7"
            x2="5.9"
            y2="8.63"
          />
          <line
            className={classes.cls_2}
            x1="5.9"
            y1="11.28"
            x2="12.49"
            y2="15.42"
          />
        </g>
      </g>
    </SvgIcon>
  );
};

export default ShareIcon;
