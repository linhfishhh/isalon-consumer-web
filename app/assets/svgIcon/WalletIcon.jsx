import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: 'none',
    stroke: props => props.color || '#333',
    strokeMiterlimit: 10,
  },
  cls_2: {
    fill: theme.palette.primary.main,
  },
}));

export const WalletIcon = props => {
  const classes = useStyles(props);

  return (
    <SvgIcon viewBox="0 0 23.71 23.13">
      <g>
        <path
          className={classes.cls_1}
          d="M22,16.14v3.65a2.85,2.85,0,0,1-2.85,2.84H3.34A2.84,2.84,0,0,1,.5,19.79V6.43A2.84,2.84,0,0,1,3.34,3.59H19.18A2.85,2.85,0,0,1,22,6.43V11"
        />
        <path
          className={classes.cls_1}
          d="M18.29,11h4.6a.32.32,0,0,1,.32.32v4.48a.32.32,0,0,1-.32.32h-4.6a2.45,2.45,0,0,1-2.45-2.45v-.21A2.45,2.45,0,0,1,18.29,11Z"
        />
        <path
          className={classes.cls_2}
          d="M4.37,6.18,14.88.2A1.52,1.52,0,0,1,17,.8L19.9,6.18Z"
        />
        <line
          className={classes.cls_1}
          x1="2.4"
          y1="6.18"
          x2="22.03"
          y2="6.18"
        />
      </g>
    </SvgIcon>
  );
};
