import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: 'none',
    stroke: props => props.color || '#8e8e93',
    strokeMiterlimit: 10,
  },
  cls_2: {
    fill: theme.palette.primary.main,
  },
}));

const FavoriteIcon = props => {
  const classes = useStyles(props);
  return (
    <SvgIcon viewBox="0 0 19.57 17.22">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className={classes.cls_1}
            d="M14.43.5C11.37.5,9.79,3.55,9.79,3.55S8.21.5,5.15.5C3.29.5-.61,2.25.8,7c1.31,4.42,7.26,9,9,9.68,1.72-.67,7.67-5.26,9-9.68C20.18,2.25,16.28.5,14.43.5Z"
          />
        </g>
      </g>
    </SvgIcon>
  );
};

const FavoredIcon = () => {
  const classes = useStyles();
  return (
    <SvgIcon viewBox="0 0 18.57 16.18">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className={classes.cls_2}
            d="M13.93,0C10.87,0,9.29,3.05,9.29,3.05S7.71,0,4.65,0C2.79,0-1.11,1.75.3,6.5c1.31,4.42,7.26,9,9,9.68,1.72-.67,7.67-5.26,9-9.68C19.68,1.75,15.78,0,13.93,0Z"
          />
        </g>
      </g>
    </SvgIcon>
  );
};

export { FavoriteIcon, FavoredIcon };
