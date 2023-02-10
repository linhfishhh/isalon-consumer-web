import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cls_1: {
    fill: '#ffb600',
    fillRule: 'evenodd',
  },
  cls_2: {
    fill: '#e6e6e6',
    fillRule: 'evenodd',
  },
  cls_3: {
    fill: 'none',
  },
  cls_4: {
    clipPath: 'url(#clip-path)',
  },
}));

const StarIcon = props => {
  const classes = useStyles();
  const { className, size } = props;
  const width = (size === 'small' ? 1 : 2) * 14.69;
  const height = (size === 'small' ? 1 : 2) * 14.14;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14.69 14.14"
      className={className}
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <path
            className={classes.cls_1}
            d="M7.14,12,3.29,14.09a.44.44,0,0,1-.64-.47l.73-4.34a.43.43,0,0,0-.12-.39L.13,5.81a.44.44,0,0,1,.25-.75l4.31-.63A.42.42,0,0,0,5,4.19L7,.25a.44.44,0,0,1,.79,0L9.67,4.19a.42.42,0,0,0,.33.24l4.31.63a.44.44,0,0,1,.25.75L11.43,8.89a.43.43,0,0,0-.12.39L12,13.62a.44.44,0,0,1-.64.47L7.55,12A.43.43,0,0,0,7.14,12Z"
          />
        </g>
      </g>
    </svg>
  );
};

const StarBorderIcon = props => {
  const classes = useStyles();
  const { className, size } = props;
  const width = (size === 'small' ? 1 : 2) * 14.69;
  const height = (size === 'small' ? 1 : 2) * 14.14;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14.69 14.14"
      className={className}
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <path
            className={classes.cls_2}
            d="M7.14,12,3.29,14.09a.44.44,0,0,1-.64-.47l.73-4.34a.43.43,0,0,0-.12-.39L.13,5.81a.44.44,0,0,1,.25-.75l4.31-.63A.42.42,0,0,0,5,4.19L7,.25a.44.44,0,0,1,.79,0L9.67,4.19a.42.42,0,0,0,.33.24l4.31.63a.44.44,0,0,1,.25.75L11.43,8.89a.43.43,0,0,0-.12.39L12,13.62a.44.44,0,0,1-.64.47L7.55,12A.43.43,0,0,0,7.14,12Z"
          />
        </g>
      </g>
    </svg>
  );
};

const HaftStarBorderIcon = props => {
  const classes = useStyles();
  const { className, size } = props;
  const width = (size === 'small' ? 1 : 2) * 14.69;
  const height = (size === 'small' ? 1 : 2) * 14.14;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14.69 14.14"
      className={className}
    >
      <clipPath id="clip-path" transform="translate(0 0)">
        <rect className={classes.cls_3} width="7.35" height="14.14" />
      </clipPath>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className={classes.cls_2}
            d="M7.14,12,3.29,14.09a.44.44,0,0,1-.64-.47l.73-4.34a.43.43,0,0,0-.12-.39L.13,5.81a.44.44,0,0,1,.25-.75l4.31-.63A.42.42,0,0,0,5,4.19L7,.25a.44.44,0,0,1,.79,0L9.67,4.19a.42.42,0,0,0,.33.24l4.31.63a.44.44,0,0,1,.25.75L11.43,8.89a.43.43,0,0,0-.12.39L12,13.62a.44.44,0,0,1-.64.47L7.55,12A.43.43,0,0,0,7.14,12Z"
            transform="translate(0 0)"
          />
          <g className={classes.cls_4}>
            <path
              className={classes.cls_1}
              d="M7.14,12,3.29,14.09a.44.44,0,0,1-.64-.47l.73-4.34a.43.43,0,0,0-.12-.39L.13,5.81a.44.44,0,0,1,.25-.75l4.31-.63A.42.42,0,0,0,5,4.19L7,.25a.44.44,0,0,1,.79,0L9.67,4.19a.42.42,0,0,0,.33.24l4.31.63a.44.44,0,0,1,.25.75L11.43,8.89a.43.43,0,0,0-.12.39L12,13.62a.44.44,0,0,1-.64.47L7.55,12A.43.43,0,0,0,7.14,12Z"
              transform="translate(0 0)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

StarIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
};

StarBorderIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
};

HaftStarBorderIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
};

StarIcon.defaultProps = {
  size: 'medium',
};

StarBorderIcon.defaultProps = {
  size: 'medium',
};

HaftStarBorderIcon.defaultProps = {
  size: 'medium',
};

export { StarIcon, StarBorderIcon, HaftStarBorderIcon };
